import React from 'react';
import { Animated, Text, View } from 'react-native';
import { vh, vw } from '@styles';

export class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toastVisible: false };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.toastVisible) {
      this.showToast();
    } else {
      this.closeToast();
    }
  }

  showToast() {
    if (this.state.toastVisible) return;
    // Animated.timing(
    //   this.animatedValue,
    //   { 
    //     toValue: 40,
    //     duration: 200
    //   }
    // ).start(() => 
    this.setState({ toastVisible: true });
  }

  closeToast() {
    if (!this.state.toastVisible) return;
    // Animated.timing(
    //   this.animatedValue,
    //   {
    //     toValue: 0,
    //     duration: 200
    //   }
    // ).start(() => 
    this.setState({ toastVisible: false });
  }

  render() {
    if(!this.state.toastVisible) {
      return (
        <View />
      );
    } else {
      return (
        <View 
          style={styles.container}
        >
          <Text style={styles.textStyle}>{this.props.text}</Text>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent:  'center',
    alignItems: 'center',
    height: 40,
    zIndex: 1000
  },
  textStyle: {
    color: 'red', 
    fontSize: vw * 4,
    textAlign: 'center'
  }
};
