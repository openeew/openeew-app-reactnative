import React from 'react';
import { View, Image, Linking, StyleSheet,  Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { ShareDialog } from 'react-native-fbsdk';
import * as config from '../../endpoint/config';
import { Container, Button, Label } from '@components';
import { color, vw } from '@styles';

const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://grillo.io/",
  quote: '¡Estoy bien! @GrilloAlerta',
};
const logo = '@assets/logo.png';

export default class Eqinfo extends React.Component {

  whatsappShareHandle() {
    Linking.openURL(`whatsapp://send?text=${shareLinkContent.quote}`)
    .catch(() => {
      Alert.alert(
        '',
        'Necesitas instalar whatsapp para compartir en WhatsApp.',
        [
          { text: 'De acuerdo' },
        ],
      );
    })
  }

  render() {
    let notification = this.props.navigation.getParam('notification', {});

    return (
      <Container>
        <View style={{ flex: 1 }}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View
                style={[styles.intensityStyle, { backgroundColor: notification.data.predicted_intensity_rgb }]}
              >
                <Image
                  style={styles.logoImageStyle}
                  source={require(logo)}
                />
              </View>
              <View>
                <Label style={styles.cardHeaderLabel}>Sismo detectado en</Label>
                <Label style={[styles.cardHeaderLabel, { color: color.gray }]}>{notification.data.region}</Label>
              </View>
            </View>

            <Image
              style={styles.mapImagesStyle}
              source={{ uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${notification.data.longitude},${notification.data.latitude},10.67/1000x600@2x?access_token=${config.mapBoxKey}` }}
            />
          </View>

          <View style={[styles.cardContainer, { width: '90%' }]}>
            <Label fontSize={3.5}>¡Estoy bien!</Label>
            <View style={styles.shareLinkContainer}>
              <Button
                circle
                transparent
                style={styles.socialLink}
                onPress={() => ShareDialog.show(shareLinkContent)}
              >
                <FontAwesome name="facebook" style={styles.icon} />
              </Button>

              <Button
                circle
                transparent
                style={styles.socialLink}
                onPress={() => Linking.openURL(`https://twitter.com/intent/tweet?text=${shareLinkContent.quote}`)}
              >
                <FontAwesome name="twitter" style={styles.icon} />
              </Button>

              <Button
                circle
                transparent
                style={styles.socialLink}
                onPress={() => this.whatsappShareHandle()}
              >
                <FontAwesome name="whatsapp" style={[styles.icon, { fontSize: vw * 5 }]} />
              </Button>
            </View>
          </View>
        </View>
        <Label
          onPress={() => this.props.navigation.navigate('Main')}
          style={styles.terminateLabelStyle}
        >TERMINAR</Label>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: color.white,
    width: '100%',
    elevation: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    padding: 10,
    marginTop: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardHeader: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardHeaderLabel: {
    fontWeight: '600',
    color: 'rgba(0,0,0,.87)',
    fontSize: vw * 3.5
  },
  intensityStyle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoImageStyle: {
    width: 35,
    height: 30,
    resizeMode: 'stretch'
  },
  mapImagesStyle: {
    marginTop: 10,
    width: '98%',
    height: 250,
    alignSelf: 'center'
  },
  shareLinkContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 5
  },
  socialLink: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderColor: color.black,
    borderWidth: 2,
    marginHorizontal: 7
  },
  icon: {
    color: color.black,
    fontSize: vw * 4
  },
  terminateLabelStyle: {
    fontSize: vw * 3.5,
    textAlign: 'right',
    margin: 20,
    fontWeight: 'bold'
  }
});
