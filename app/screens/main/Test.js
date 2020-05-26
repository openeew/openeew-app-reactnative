import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Button, Label } from '@components';
import { displayNotification } from '../../NotificationHandler';
import { color } from '@styles';

export default class Test extends React.Component {
  static navigationOptions = {
    title: 'PRUEBA LA ALERTA',
  };

  _displayNotification() { 
    const notification = {
      notificationId: 'notificationId',
      title: 'Intensidad esperada en tu ubicación',
      body: '¡Muy Fuerte!',
      sound: 'notification.wav',
      data: {
        "predicted_intensity_tag": "Fuerte",
        "report_time_utc": "2018-09-04 17:39:43",
        "latitude": "16.8531",
        "longitude": "-99.8237",
        "region": "Acapulco",
        "predicted_intensity_rgb": "#EF8702"
      },
      largeIcon: 'test_tag',
    }
    displayNotification(notification);
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Label fontSize={10} style={styles.label}>Probar la alarma</Label>
          <Label fontSize={4} style={styles.label}>
            En caso de sismo aparecerá una notificación y el sonido de la alarma se activará.
          </Label>
          <Button onPress={() => this._displayNotification()} circle style={styles.button}>
            <Icon name="ios-notifications" style={styles.icon} />
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  label: {
    textAlign: 'center',
    marginVertical: 10
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    elevation: 15,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    marginVertical: 10,
    marginTop: 50
  },
  icon: {
    fontSize: 25,
    color: color.white
  }
});

