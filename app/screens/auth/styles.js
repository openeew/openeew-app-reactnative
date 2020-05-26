import { StyleSheet } from 'react-native';
import { color, vw } from '@styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  buttonStyle: {
    marginTop: 10
  },
  socialLinksContainer: {
    flexDirection: 'row',
    marginTop: 40
  },
  socialLink: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderColor: 'black',
    borderWidth: 1,
    margin: 7
  },
  icon: {
    fontSize: vw * 4,
    color: color.black
  },
  footer: {
    alignItems: 'center',
  },
  enterButtonStyle: {
    backgroundColor: color.greenCyanLight
  },
  enterButtonTextStyle: {
    color: color.black,
    fontWeight: 'bold'
  },
  buttonTextStyle: {
    color: color.black,
    fontSize: vw * 3.5,
    fontWeight: 'normal'
  },
  flex1: {
    flex: 1
  }
});