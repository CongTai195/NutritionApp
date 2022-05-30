import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import font from '../../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSplash: {
    fontFamily: font.DEFAULT_FONT,
    fontSize: 24,
    color: colors.PURE_WHITE,
    fontWeight: '700',
  },
  button: {
    marginTop: 50,
  },
});

export default styles;
