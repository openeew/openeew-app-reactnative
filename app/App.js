import React from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getSubscribeTopics } from '@actions';
import firebase from 'react-native-firebase';
import * as NotificationHandler from './NotificationHandler';
import Router from './Router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initialRouteName: '' };
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navigate('MainStack');
      } else {
        this.navigate('AuthStack');
      }
      if (this.unsubscribe)
        this.unsubscribe();
    });

    NotificationHandler.checkNotificationPermission();
    NotificationHandler.createChannel();
    this.props.getSubscribeTopics();
  }

  navigate(initialRouteName) {
    setTimeout(() => {
      SplashScreen.hide();   // show splash screen for atleast 1 sec.
      this.setState({ initialRouteName });
    }, 1000);
  }

  render() {
    if (!this.state.initialRouteName) {
      return (
        <View />
      );
    }
    return (
      <Router initialRouteName={this.state.initialRouteName} />
    );
  }
}
export default connect(null, { getSubscribeTopics })(App);