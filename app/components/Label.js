import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { color as _color, vw } from '@styles';

export class Label extends React.Component {
  render() {
    const {
      children,
      fontSize,
      onPress,
      color,
      style,
      numberOfLines
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.5 : 1}
        onPress={onPress}
      >
        <Text
          numberOfLines={numberOfLines}
          style={[{
            fontSize: fontSize * vw,
            color: color || _color.black,
          },
            style]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}
