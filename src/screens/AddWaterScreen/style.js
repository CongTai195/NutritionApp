import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.PURE_WHITE,
  },
  textHeader: {
    color: colors.BLACK,
    fontSize: 18,
    fontWeight: '900',
    margin: 10,
    fontFamily: font.DEFAULT_FONT,
  },
  imageHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  textInput: {
    alignSelf: 'center',
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //height: 50,
    padding: 1,
    borderColor: colors.BLACK,
    borderWidth: 1,
    marginTop: 10,
  },
  textTextInput: {
    //width: 100,
    color: '#000',
    fontFamily: font.DEFAULT_FONT,
    fontSize: 16,
    textAlign: 'center',
    //fontWeight: '900',
  },
});

export default styles;
