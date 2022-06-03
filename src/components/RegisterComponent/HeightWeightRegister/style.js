import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import font from '../../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
    //justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.PURE_WHITE,
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
  textDescription: {
    fontWeight: '500',
    fontSize: 15,
    color: '#e5e5e5',
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
  textWarning: {
    fontWeight: '900',
    fontSize: 15,
    color: colors.RED,
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
  textDescriptionBMI: {
    fontWeight: '900',
    fontSize: 15,
    color: '#FFF',
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
  selection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //height: 50,
    padding: 15,
    borderColor: colors.PURE_WHITE,
    borderWidth: 0.5,
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //height: 50,
    borderRadius: 5,
    padding: 1,
    borderColor: colors.PURE_WHITE,
    borderWidth: 1,
    marginTop: 10,
  },
  textTextInput: {
    width: 100,
    color: '#fff',
    fontFamily: font.DEFAULT_FONT,
    fontSize: 18,
    textAlign: 'center',
    //fontWeight: '900',
  },
  textSelection: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
    color: colors.PURE_WHITE,
    fontFamily: font.DEFAULT_FONT,
  },
  textBMI: {
    fontWeight: '900',
    fontSize: 30,
    color: colors.GREEN_SELECTED,
    fontFamily: font.DEFAULT_FONT,
    textAlign: 'center',
  },
});

export default styles;
