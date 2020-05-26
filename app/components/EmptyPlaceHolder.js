import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label } from '@components';
import { color } from '@styles';

export class EmptyPlaceholder extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name={this.props.iconName} style={styles.icon} />
        <Label style={styles.label} fontSize={4}>{this.props.msg}</Label>
        {
          this.props.link ?
            <Label
              fontSize={4}
              style={styles.link}
              onPress={this.props.link.onPress}
            >
              {this.props.link.linkText}
            </Label> :
            <View />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.background,
  },
  label: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: color.gray
  },
  link: {
    color: '#039be5',
    marginTop: 20,
    opacity: 0.5
  },
  icon: {
    fontSize: 100,
    color: color.lightGray
  }
});