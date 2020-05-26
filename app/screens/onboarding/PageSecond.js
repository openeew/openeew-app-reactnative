import React from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Label } from '@components';
import { color } from '@styles';
import styles from './styles';

export default class PageSecond extends React.Component {

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <LinearGradient
            colors={[color.gradientBackground1, color.gradientBackground2]}
            style={styles.gradient}
          />
          <View>
            <Label
              style={styles.labelStyle}
              fontSize={8}
            >
              ¿Cómo sentirás los sismos?</Label>
            <Label
              style={styles.labelStyle}
              fontSize={4}
            >
              Grillo calcula la intensidad esperada en tu ubicación.
            </Label>
          </View>

          <Image
            style={styles.imageStyle}
            source={require('@assets/app_intro_image_2.png')}
          />
          <View style={{height: 50}}></View>
        </View>
      </Container>
    );
  }
}

