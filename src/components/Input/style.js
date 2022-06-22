import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
  inputPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 50,
    height: 45,
    margin: 12,
    //padding: 15,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    //borderColor: colors.PURE_WHITE,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    color: colors.PURE_WHITE,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    height: 50,
    margin: 10,
  },
  errorPart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: font.DEFAULT_FONT,
    fontSize: 14,
    color: colors.RED,
    fontWeight: '900',
  },
});

export default styles;
