import React from 'react';
import { View, Keyboard, Alert, NativeModules, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { valueChanged, validator, initAuth } from '@actions';
import { Container, Input, Button, Toast, Loader } from '@components';
import * as api from '../../endpoint/api';
import * as config from '../../endpoint/config';
import styles from './styles';

const { RNTwitterSignIn } = NativeModules;

class Login extends React.Component {
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

  async socialLogin(provider) {
    const isCancelled = await provider(this.loginSucces.bind(this), this.loginFail.bind(this), RNTwitterSignIn);
    this.setState({ loading: true });
    if (isCancelled) {
      this.setState({ loading: false });
    }
  }

  login() {
    const { email, password } = this.props;
    this.props.validator({ email, password }).then(error => {
      if (!error) {
        Keyboard.dismiss();
        this.setState({ loading: true });
        api.emailAndPasswordLogin(
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
      }, 200); //here delay for 200ms because in ios alert and modal conflict each other.
    }
  }

  nexButton = id => {
    if (this[id].focus()) this[id].focus();
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
    const { email, password, formError } = this.props;
    return (
      <KeyboardAvoidingView style={styles.flex1} behavior="padding" enabled>
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
            <Input
              placeholder="Contraseña"
              leftIconName='md-lock'
              secureTextEntry
              value={password}
              error={formError.password}
              onChangeText={(password) => this.onValueChanged({ password })}
              Ref={input => this.input2 = input}
              returnKeyType={"done"}
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
            />
            <Button
              style={styles.buttonStyle}
              onPress={() => this.login()}
            >CONTINUAR</Button>

            <Button
              transparent
              textStyle={styles.buttonTextStyle}
              onPress={() => this.props.navigation.navigate('Forgot')}
            >¿Olvidaste tu contraseña?</Button>

            <View style={styles.socialLinksContainer}>
              <Button
                rippleColor="transparent"
                onPress={() => this.socialLogin(api.facebookLogin)}
                circle
                transparent
                style={styles.socialLink}
              >
                <FontAwesome name="facebook" style={styles.icon} />
              </Button>
              <Button
                rippleColor="transparent"
                circle
                onPress={() => this.socialLogin(api.twitterLogin)}
                transparent
                style={styles.socialLink}
              >
                <FontAwesome name="twitter" style={styles.icon} />
              </Button>

              <Button
                rippleColor="transparent"
                circle
                onPress={() => this.socialLogin(api.googleLogin)}
                transparent
                style={styles.socialLink}
              >
                <FontAwesome name="google-plus" style={styles.icon} />
              </Button>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              transparent
              textStyle={styles.buttonTextStyle}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >Registra tu cuenta</Button>
          </View>
          <Loader fullScreen visible={this.state.loading} />

        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { email, password, formError } = auth;
}

export default connect(mapStateToProps, { valueChanged, validator, initAuth })(Login);
