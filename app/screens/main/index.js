import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '@styles';
import Earthquakes from './Earthquakes';
import Test from './Test';
import Settings from './Settings';
import * as NotificationHandler from '../../NotificationHandler';

const commonConfig = {
  cardStyle: {
    backgroundColor: color.background
  },
  navigationOptions: {
    headerStyle: {
      backgroundColor: color.background,
      height: 100,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: color.black,
    headerTitleStyle: { flex: 1, fontSize: 17, textAlign: 'center' }
  }
};

const tabConfig = {
  tabBarOptions: {
    inactiveTintColor: color.gray,
    activeTintColor: color.black,
    style: {
      height: 60,
      paddingVertical: 5,
      elevation: 15,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: -0.5 },
    },
    labelStyle: {
      fontSize: 14
    }
  }
};


const Tabs =  createBottomTabNavigator(
  {
    Sismos: createStackNavigator({ Earthquakes }, { ...commonConfig }),
    Prueba: createStackNavigator({ Test }, { ...commonConfig }),
    Configuración: createStackNavigator({ Settings }, { ...commonConfig })
  },
  {
    ...tabConfig,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Sismos') {
          iconName = 'md-pulse';
        } else if (routeName === 'Prueba') {
          iconName = 'md-megaphone';
        } else if (routeName === 'Configuración') {
          iconName = 'md-cog';
        }
        return <Icon name={iconName} size={27} color={tintColor} />;
      },
    }),
  }
);

export default class Main extends React.Component {
  componentDidMount() {
    this.onNotificationListener = NotificationHandler.notification.onNotification((notification) => {
      this.displayEarthquakeInfo(notification);
      NotificationHandler.displayNotification(notification);
    });
    this.onNotificationDisplayedListener = NotificationHandler.notification.onNotificationDisplayed((notification) => {
      this.displayEarthquakeInfo(notification);
    });
    this.onNotificationOpenedListener = NotificationHandler.notification.onNotificationOpened((notificationOpen) => {
      this.displayEarthquakeInfo(notificationOpen.notification);
      NotificationHandler.notification.removeDeliveredNotification(notificationOpen.notification.notificationId); 
    });
	NotificationHandler.notification.getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          setTimeout(() => {
            this.displayEarthquakeInfo(notificationOpen.notification);
            this.removeNotificationFromTray(notificationOpen.notification.notificationId);
          }, 1000);
        }
      });
  }

  displayEarthquakeInfo(notification) {
    this.props.navigation.navigate('EarthquakeInfo', { notification });
  }

  componentWillUnmount() {
    this.onNotificationListener();
    this.onNotificationOpenedListener();
    this.onNotificationDisplayedListener();
  }

  render() {
    return <Tabs />;
  }
}