import React from 'react';
import { View, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { valueChanged, validator, initAuth } from '@actions';
import { Container, Input, Button, Toast, Loader } from '@components';
import * as api from '../../endpoint/api';
import styles from './styles';

class Forgot extends React.Component {
  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      errorOccured: false,
      loading: false,
      toastVisible: false,
      errorMsg: ''
    };
    this.willFocusSubscription = props.navigation.addListener('willFocus', () => {
      this.props.initAuth();
      this.setState({ errorMsg: '' });
    });
  }

  componentWillUnount() {
    this.willFocusSubscription.remove();
  }

  onValueChanged(value) {
    this.props.valueChanged(value);
    this.validate(value);
  }

  sendPasswordResetEmail() {
    const { email } = this.props;
    this.props.validator({ email }).then(error => {
      if (!error) {
        Keyboard.dismiss();
        this.setState({ loading: true });
        api.sendPasswordResetEmail(
          email,
          this.sendPasswordResetEmailSuccess.bind(this),
          this.sendPasswordResetEmailFail.bind(this)
        );
      } else {
        this.showError(error);
      }
    });
  }

  sendPasswordResetEmailSuccess() {
    this.setState({ loading: false });
    setTimeout( () => {
    Alert.alert(
      'Email enviado',
      `Enviamos un correo electrónico a ${this.props.email} con un enlace para restablecer su contraseña.`,
      [
        {
          text: 'De acuerdo', onPress: () => this.props.navigation.navigate('Login') },
      ]
    );
  }, 200);
  }

  sendPasswordResetEmailFail(errorMsg) {
    this.setState({ loading: false });
    if (errorMsg) {
      setTimeout( () => {
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
    const { email, formError } = this.props;
    return (
      <Container keyboardShouldPersistTaps='handled'>

        <View style={styles.container}>
          <Toast
            toastVisible={this.state.toastVisible}
            text={this.state.errorMsg}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            leftIconName='md-mail'
            onChangeText={(email) => this.onValueChanged({ email })}
            error={formError.email}
            value={email}
            returnKeyType={"next"}
            onSubmitEditing={() => this.nexButton("input2")}
            blurOnSubmit={false}
          />
         
          <Button
            style={styles.buttonStyle}
            onPress={() => this.sendPasswordResetEmail()}
          >CONTINUAR</Button>

        </View>
        <View style={styles.footer}>
          <Button
            transparent
            textStyle={styles.buttonTextStyle}
            onPress={() => this.props.navigation.navigate('Login')}
          >iniciar sesión</Button>
        </View>
        <Loader fullScreen visible={this.state.loading} />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { email } = auth;
}

export default connect(mapStateToProps, { valueChanged, validator, initAuth })(Forgot);
