import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  counter: {
    backgroundColor: colors.THEME,
    //height: "20%",
    padding: 10,
    width: '95%',
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  calculator: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childCalculator: {
    marginVertical: 5,
    margin: 3,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChild: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.TEXT,
    marginVertical: 10,
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
