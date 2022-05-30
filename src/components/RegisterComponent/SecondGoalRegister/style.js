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
    //textAlign: 'center',
  },
  selection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //height: 50,
    padding: 5,
    borderColor: colors.PURE_WHITE,
    borderWidth: 0.5,
    marginHorizontal: 15,
    marginTop: 10,
  },
  textSelection: {
    fontWeight: '900',
    fontSize: 18,
    color: colors.PURE_WHITE,
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
