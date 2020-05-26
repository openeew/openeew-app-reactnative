import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { color } from '@styles';

//Components.
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';
import Forgot from './screens/auth/Forgot';
import AppIntro from './screens/onboarding';
import Main from './screens/main';
import EarthquakeInfo from './screens/main/EarthquakeInfo';

const commonConfig = {
  cardStyle: {
    backgroundColor: color.background
  },
  navigationOptions: {
    header: null
  }
};

const AuthStack = createStackNavigator(
  {
    Login,
    SignUp,
    Forgot
  },
  {
    ...commonConfig,
    navigationOptions: {
      headerStyle: {
        backgroundColor: color.background,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: color.black
    },
  }
);

const AppIntroStack = createStackNavigator(
  {
    AppIntro
  },
  {
    ...commonConfig
  }
);

const MainStack = createStackNavigator(
  {
    Main,
    EarthquakeInfo
  },
  {
    ...commonConfig
  }
);

const Route = createSwitchNavigator(
  {
    AuthStack,
    AppIntroStack,
    MainStack
  },
  {
    initialRouteName: 'AuthStack'
  }
);

export default class Router extends React.Component {
  render() {
    if (this.props.initialRouteName == 'MainStack') {
      return <MainStack />;
    } else if (this.props.initialRouteName == 'AuthStack') {
      return <Route />;
    }
  }
}