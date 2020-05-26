import { Dimensions } from 'react-native';

const device = Dimensions.get('window');
const width = device.width < device.height ? device.width : device.height;
const height = device.width < device.height ? device.height : device.width;

export const vw = width / 100;
export const vh = height / 100;

export const color = {
  black: '#000',
  white: '#fff',
  gray: '#808080',
  lightGray: '#EAEAEA',
  greenCyan: '#38cb89',
  greenCyanLight: 'rgba(56, 203, 137, 0.25)',
  background: '#fafafa',
  gradientBackground1: '#122acc',
  gradientBackground2: '#0b85ed'
};