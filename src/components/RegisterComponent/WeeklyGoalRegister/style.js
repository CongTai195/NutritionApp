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
    fontWeight: '900',
    fontSize: 16,
    color: colors.PURE_WHITE,
    fontFamily: font.DEFAULT_FONT,
  },
  selection: {
    alignItems: 'center',
    justifyContent: 'center',
    //height: 50,
    padding: 15,
    borderColor: colors.WHITE,
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
