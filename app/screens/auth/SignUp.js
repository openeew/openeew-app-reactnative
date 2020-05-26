import React from 'react';
import { View, Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { valueChanged, validator, initAuth } from '@actions';
import { Container, Input, Button, Label, Toast, Loader } from '@components';
import * as api from '../../endpoint/api';
import styles from './styles';

class SignUp extends React.Component {
  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      errorOccured: false,
      loading: false,
      toastVisible: false,
      errorMsg: ''
    };
    this.willFocusSubscription = props.navigation.addListener('willFocus', () =>
      this.props.initAuth()
    );
  }

  componentWillUnount() {
    this.willFocusSubscription.remove();
  }

  nexButton = id => {
    if (this[id].focus()) this[id].focus();
  }

  onValueChanged(value) {
    this.props.valueChanged(value);
    this.validate(value);
  }

  register() {
    const { name, email, password } = this.props;
    let _name = name.trim();
    this.props.valueChanged({ name: _name });
    this.props.validator({ name: _name, email, password }).then(error => {
      if (!error) {
        Keyboard.dismiss();
        this.setState({ loading: true });
        api.createUserWithEmailAndPassword(
          email,
          password,
          this.loginSucces.bind(this),
          this.loginFail.bind(this)
        );
      } else {
        this.showError(error);
      }
    });
  }

  loginSucces() {
    this.setState({ loading: false });
    this.props.navigation.navigate('AppIntroStack');
  }

  loginFail(errorMsg) {
    this.setState({ loading: false });
    if (errorMsg) {
      setTimeout(() => {
        Alert.alert(
          '',
          errorMsg,
          [
            { text: 'Rever' },
          ],
        );
      }, 200);
    }
  }

  validate(values) {
    if (!this.state.errorOccured) return;
    this.props.validator(values);
    this.setState({ toastVisible: false });
  }

  showError(errorMsg) {
    this.setState({ errorOccured: true, toastVisible: true, errorMsg });
  }

  render() {
    const { name, email, password, formError } = this.props;
    return (
      <Container keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView style={styles.flex1} behavior="padding" enabled>
          <View style={styles.container}>
            <Toast
              toastVisible={this.state.toastVisible}
              text={this.state.errorMsg}
            />
            <Input
              placeholder="Nombre"
              leftIconName='md-person'
              onChangeText={(name) => this.onValueChanged({ name })}
              error={formError.name}
              value={name}
              returnKeyType={"next"}
              onSubmitEditing={() => this.nexButton("input2")}
              blurOnSubmit={false}
            />
            <Input
              placeholder="Correo electrónico"
              keyboardType="email-address"
              leftIconName='md-mail'
              onChangeText={(email) => this.onValueChanged({ email })}
              error={formError.email}
              value={email}
              Ref={input => this.input2 = input}
              returnKeyType={"next"}
              onSubmitEditing={() => this.nexButton("input3")}
              blurOnSubmit={false}
            />
            <Input
              placeholder="Contraseña"
              leftIconName='md-lock'
              secureTextEntry
              value={password}
              error={formError.password}
              onChangeText={(password) => this.onValueChanged({ password })}
              Ref={input => this.input3 = input}
              returnKeyType={"done"}
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
            />
            <Button
              style={styles.buttonStyle}
              onPress={() => this.register()}
            >CONTINUAR</Button>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Label>¿Ya tienes una cuenta?</Label>
          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            textStyle={styles.enterButtonTextStyle}
            style={[styles.buttonStyle, styles.enterButtonStyle]}
          >
            INGRESAR
            </Button>
        </View>
        <Loader fullScreen visible={this.state.loading} />
      </Container>

    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { name, email, password, formError } = auth;
}

export default connect(mapStateToProps, { valueChanged, validator, initAuth })(SignUp);
