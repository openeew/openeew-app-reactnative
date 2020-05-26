import React from 'react';
import { ScrollView } from 'react-native';

export class Container extends React.Component {

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
