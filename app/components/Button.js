import React from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { color, vw } from '@styles';
import Ripple from './ButtonRipple'

export class Button extends React.PureComponent {

  renderContent() {
    const {
      children,
      loading,
      textStyle,
      loadingSpinnerColor
    } = this.props;
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={loadingSpinnerColor || color.white}
        />
      );
    }
    return (
      <Text
        style={[styles.textStyle, textStyle]}
        numberOfLines={1}
      >
        {children}
      </Text>
    );
  }

  render() {
    const {
      onPress,
      style,
      loading,
      rippleColor,
      disabled,
      transparent,
      circle
    } = this.props;

    return (
      <Ripple
        rippleColor={rippleColor || color.white}
        onPress={loading || disabled ? () => {} : onPress}
        style={[
          styles.buttonStyle,
          transparent && styles.transparentButton,
          circle && styles.circleButton,
          style]}
      >
        {this.renderContent()}
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.greenCyan,
    borderRadius: vw * 1,
    height: vw * 12,
    maxWidth: 500,
    paddingHorizontal: 10
  },
  transparentButton: {
    backgroundColor: 'transparent'
  },
  circleButton: {
    borderRadius: vw * 7,
    height: vw * 15,
    width: vw * 15
  },
  textStyle: {
    color: color.white,
    fontSize: vw * 3,
    fontWeight: 'bold'
  }
});
