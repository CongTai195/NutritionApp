import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  counter: {
    backgroundColor: colors.BACK_GROUND_COLOR,
    //height: "20%",
    padding: 15,
    width: '95%',
    borderRadius: 20,
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
    margin: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChild: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.PURE_WHITE,
    marginVertical: 10,
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
