import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  information: {
    flex: 1,
    margin: 10,
  },
  add: {
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: 50,
    margin: 15,
    padding: 8,
  },
  textHeader: {
    fontSize: 15,
    color: 'black',
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  textInfo: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
