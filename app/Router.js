//=============================================================================
// Copyright Grillo Holdings Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

import React from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { color } from "@styles";

//Components.
import Login from "./screens/auth/Login";
import SignUp from "./screens/auth/SignUp";
import Forgot from "./screens/auth/Forgot";
import AppIntro from "./screens/onboarding";
import Main from "./screens/main";
import EarthquakeInfo from "./screens/main/EarthquakeInfo";

const commonConfig = {
  cardStyle: {
    backgroundColor: color.background,
  },
  navigationOptions: {
    header: null,
  },
};

const AuthStack = createStackNavigator(
  {
    Login,
    SignUp,
    Forgot,
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
      headerTintColor: color.black,
    },
  }
);

const AppIntroStack = createStackNavigator(
  {
    AppIntro,
  },
  {
    ...commonConfig,
  }
);

const MainStack = createStackNavigator(
  {
    Main,
    EarthquakeInfo,
  },
  {
    ...commonConfig,
  }
);

const Route = createSwitchNavigator(
  {
    AuthStack,
    AppIntroStack,
    MainStack,
  },
  {
    initialRouteName: "AuthStack",
  }
);

export default class Router extends React.Component {
  render() {
    if (this.props.initialRouteName == "MainStack") {
      return <MainStack />;
    } else if (this.props.initialRouteName == "AuthStack") {
      return <Route />;
    }
  }
}
