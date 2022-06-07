import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/colors/colors';
import font from '../../../assets/fonts/font';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
  inner: {
    //justifyContent: 'center',
    flex: 1,
  },
  iconNotification: {
    marginLeft: 10,
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
  toLogin: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
  textToLogin: {
    fontSize: 16,
    color: colors.WHITE,
    marginHorizontal: 10,
    fontWeight: '600',
  },
  text: {
    fontWeight: '900',
    fontSize: 20,
    color: colors.PURE_WHITE,
    fontFamily: font.DEFAULT_FONT,
  },
  textDescription: {
    fontWeight: '500',
    fontSize: 16,
    color: '#e5e5e5',
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
  textCalories: {
    fontWeight: '900',
    fontSize: 30,
    color: colors.GREEN_SELECTED,
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
  note: {
    backgroundColor: colors.PURE_WHITE,
    position: 'absolute',
    //left: -100,
    padding: 5,
    //zIndex: 99,
    top: 30,
    left: 25,
    right: 0,
    //bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: (width * 7) / 8,
    borderRadius: 5,
  },
  textNote: {
    textAlign: 'justify',
    fontWeight: '900',
    fontSize: 16,
    color: 'black',
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
