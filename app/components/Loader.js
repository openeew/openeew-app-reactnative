import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { color, vw } from '@styles';

export class Loader extends React.Component {
  render() {
    const { visible } = this.props;
    if (this.props.fullScreen) {
      
      return (
        <Modal
          onRequestClose={() => { }}
          supportedOrientations={['landscape', 'portrait']}
          transparent
          visible={visible}>
          <View style={styles.overlay}>
            <Text style={styles.message}>{this.props.msg}</Text>
            <ActivityIndicator size="large" color={color.greenCyan} />
          </View>
        </Modal>
      );
    }
    else {
      return (<View style={styles.container}>
        <Text style={styles.message}>{this.props.msg}</Text>
        <ActivityIndicator size="large" color={color.greenCyan} />
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: vw * 5,
    marginBottom: 10,
    color: color.lightGray
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
