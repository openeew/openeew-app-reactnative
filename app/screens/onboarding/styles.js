import { StyleSheet } from 'react-native';
import { color, vw } from '@styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  labelStyle: {
    marginTop: 25,
    color: color.white,
    textAlign: 'center',
    lineHeight: 30
  },
  imageStyle: {
    marginVertical: 20,
    height: vw * 70,
    width: vw * 80,
    resizeMode: 'stretch'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
  },
  switchLabel: {
    fontSize: vw * 4,
    color: color.white,
    marginRight: 10
  }
});

export const switchStyle = {
  circleSize: 25,
  circleBorderWidth: 1.5,
  circleBorderWidth: 0,
  backgroundInactive: 'rgba(34, 31, 31, 0.26)',
  backgroundActive: 'rgba(0, 150, 136, 0.5)',
  circleActiveColor: color.greenCyan,
  circleInActiveColor: '#1C57FF',
  switchWidthMultiplier: 1.7
};
