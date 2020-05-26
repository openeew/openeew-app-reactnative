import React from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Label, Button } from '@components';
import { color } from '@styles';
import styles from './styles';

export default class PageFirst extends React.Component {

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
              Alertas sísmicas</Label>
            <Label
              style={styles.labelStyle}
              fontSize={4}
            >
              Recibirás notificaciones antes que el sismo llegue.
            </Label>
          </View>

          <Image
            style={styles.imageStyle}
            source={require('@assets/app_intro_image_1.png')}
          />

          <Button onPress={() => this.props.swipe()}>COMENZAR</Button>
        </View>
      </Container>
    );
  }
}
