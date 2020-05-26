import React from 'react';
import {
  TextInput,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, vw } from '@styles';

export class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = { secureText: false };
  }

  eyeIcon() {
    const { value, secureTextVisibilityToggle } = this.props;
    if (secureTextVisibilityToggle && value) {
      let iconName = this.state.secureText ? 'ios-eye' : 'ios-eye-off';
      return (
        <Icon
          name={iconName}
          style={styles.eyeIconStyle}
          onPress={() => this.setState({ secureText: !this.state.secureText })}
        />
      );
    }
  }

  leftIcon() {
    if (this.props.leftIconName) {
      return <Icon name={this.props.leftIconName} style={styles.leftIconStyle} />;
    }
  }

  render() {
    const {
      placeholder,
      secureTextEntry,
      autoCorrect,
      keyboardType,
      value,
      onChangeText,
      onBlur,
      onFocus,
      autoCapitalize,
      autoFocus,
      maxLength,
      error,
      returnKeyType,
      style,
      inputStyle,
      multiline,
      onSubmitEditing,
      editable,
      selectTextOnFocus,
      blurOnSubmit,
      Ref,
    } = this.props;

    return (
      <View style={[
        styles.inputContainer,
        error && styles.errorStyle,
        style
      ]}>
        {this.leftIcon()}
        <TextInput
          ref={Ref}
          placeholder={placeholder}
          value={value}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          autoCorrect={autoCorrect || false}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          autoCapitalize={autoCapitalize || 'none'}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !this.state.secureText}
          autoFocus={autoFocus}
          maxLength={maxLength}
          underlineColorAndroid="transparent"
          returnKeyType={returnKeyType}
          multiline={multiline}
          blurOnSubmit={blurOnSubmit}
          onSubmitEditing={onSubmitEditing}
          style={[
            styles.inputStyle,
            inputStyle
          ]}
        />
        {this.eyeIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vw * 6,
    borderBottomWidth: 1,
    borderColor: color.gray,
    maxWidth: 700
  },
  inputStyle: {
    flex: 1,
    fontSize: vw * 4.5,
    paddingHorizontal: vw * 4,
    paddingVertical: vw * 2,
  },
  leftIconStyle: {
    fontSize: vw * 6,
    color: color.black
  },
  eyeIconStyle: {
    fontSize: vw * 9,
    marginBottom: vw * 1,
    alignSelf: 'flex-end',
    color: color.black
  },
  errorStyle: {
    borderBottomWidth: 2,
    borderColor: 'red'
  }
});
