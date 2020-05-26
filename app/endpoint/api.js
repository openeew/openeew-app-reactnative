import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import * as config from './config';

export const toggleSubscription = (topicName, active) => {
  if (!active) {
    return firebase.messaging().unsubscribeFromTopic(topicName)
  } else {
    return firebase.messaging().subscribeToTopic(topicName);
  }
}

export function emailAndPasswordLogin(email, password, successCallBack, failCallBack) {errorMsg
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      successCallBack(data);
    })
    .catch((error) => {
      failCallBack(errorMsg(error.code));
    })
}

export function createUserWithEmailAndPassword(email, password, successCallBack, failCallBack) {
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      successCallBack(data);
    })
    .catch((error) => {
      failCallBack(errorMsg(error.code));
    })
}

export function sendPasswordResetEmail(email, successCallBack, failCallBack) {errorMsg
  firebase.auth()
    .sendPasswordResetEmail(email)
    .then((data) => {
      successCallBack(data);
    })
    .catch((error) => {
      failCallBack(errorMsg(error.code));
    })
}

export function facebookLogin(successCallBack, failCallBack) {
  LoginManager.logOut();
  LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((permission) => {
      if (!permission.isCancelled) {
        AccessToken.getCurrentAccessToken()
          .then((data) => {
            const credential = firebase.auth.FacebookAuthProvider
              .credential(data.accessToken);
            firebase.auth().signInWithCredential(credential)
              .then((data) => {
                successCallBack(data);
              })
              .catch((error) => {
                failCallBack(errorMsg(error.code));
              })
          })
          .catch(() => {
            failCallBack(errorMsg());
          })
      } else {
        failCallBack();
      }
    })
    .catch((error) => {
      failCallBack(errorMsg());
    });
}

export async function googleLogin(successCallBack, failCallBack) {
  await GoogleSignin.configure()
    GoogleSignin.signIn()
    .then((data) => {
      const credential = firebase.auth.GoogleAuthProvider
        .credential(data.idToken, data.accessToken);
      firebase.auth().signInWithCredential(credential)
        .then((data) => {
          successCallBack(data);
        })
        .catch((error) => {
          failCallBack(errorMsg(error.code));
        })
    })
    .catch(() => {
      failCallBack();
    });
}

export function twitterLogin(successCallBack, failCallBack, RNTwitterSignIn) {
  RNTwitterSignIn.init(config.consumerApiKey, config.consumerApiSecretKey);
  setTimeout(() => {
    RNTwitterSignIn.logIn()
    .then((data) => {
      if (!data.isCancelled) {
        const credential = firebase.auth.TwitterAuthProvider
          .credential(data.authToken, data.authTokenSecret);
        firebase.auth().signInWithCredential(credential)
          .then((data) => {
            successCallBack(data);
          })
          .catch((error) => {
            failCallBack(errorMsg(error.code));
          })
      } else { failCallBack() }
    })
    .catch((error) => {
      failCallBack();
    })
  }, 1000);
}

export function getHistoricalEarthquakes() {
  return firebase.firestore().collection('intensity_notifications')
  .orderBy('report_time', 'desc');
}

export function getSubscribeTopics() {
  return new Promise((resolve) => {
    firebase.iid().getToken().then((token) => {
      fetch(`https://iid.googleapis.com/iid/info/${token}?details=true`, {
        method: 'GET',
        headers: {
          Authorization: `key=${config.firebaseWebKey}`,
        }
      })
        .then((response) => response.json())
        .then((result) => {
          let tempObj = {};
          if (result.rel)
            for (props in result.rel.topics) {
              tempObj[props] = true;
            }
          resolve(tempObj);
        });
    });
  });
}

function errorMsg(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Por favor, introduce una dirección de correo electrónico válida.';
    case 'auth/user-not-found':
      return 'La dirección de correo electrónico que ingresaste no coincide con una cuenta.';
    case 'auth/wrong-password':
      return 'La contraseña que ha ingresado es incorrecta. Inténtalo de nuevo.';
    case 'auth/email-already-in-use':
      return 'Hay una cuenta existente asociada con el correo electrónico introducido.';
    case 'auth/account-exists-with-different-credential':
      return 'Ya existe una cuenta con la dirección de correo electrónico ingresada pero con un proveedor de inicio de sesión diferente. Por favor intente con el proveedor de inicio de sesión asociado con su dirección de correo electrónico.';
    default:
      return 'Oops! Algo salió mal.';
  }
}