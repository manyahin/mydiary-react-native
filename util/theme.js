import { scale } from 'react-native-size-matters';
import Constants from 'expo-constants';

export const backgroundColor = 'white';
export const spacing = {
  tiny: scale(5),
  mini: scale(10),
  small: scale(15),
  normal: scale(20),
  big: scale(36),
};

export const fullScreen = {
  flexGrow: 1,
  backgroundColor,
  paddingTop: Constants.statusBarHeight
}

export const baseContainer = {
  flexGrow: 1,
  paddingHorizontal: spacing.small,
  backgroundColor
};
