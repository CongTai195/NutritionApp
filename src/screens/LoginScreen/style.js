import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
  inner: {
    justifyContent: 'center',
    //alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoImage: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  hidePassword: {
    backgroundColor: colors.BACK_GROUND_COLOR,
    marginHorizontal: 5,
  },
  textHidePassword: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  toSignup: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
  textToSignup: {
    fontSize: 16,
    color: colors.WHITE,
    marginHorizontal: 10,
    fontWeight: '600',
    fontFamily: font.DEFAULT_FONT,
  },
  textSignup: {
    fontSize: 16,
    color: colors.PURE_WHITE,
    marginHorizontal: 10,
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    //flex: 1,
  },
});

export default styles;
