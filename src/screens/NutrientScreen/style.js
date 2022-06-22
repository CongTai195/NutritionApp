import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNotification: {
    marginLeft: 10,
  },
  counter: {
    backgroundColor: colors.PURE_WHITE,
    height: '20%',
    padding: 15,
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
    color: 'black',
    marginVertical: 10,
  },
  addingSection: {
    flex: 1,
    marginTop: 10,
    width: '95%',
    borderRadius: 10,
    backgroundColor: colors.LIGHT_GREY,
  },
  others: {
    backgroundColor: colors.PURE_WHITE,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  childOthers: {
    flexDirection: 'row',
    //borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 0.5,
    width: '100%',
  },
  labelText: {
    //flex: 1,
    color: colors.TEXT,
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  enoughText: {
    //flex: 1,
    color: '#10de00',
    fontSize: 13,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
  },
  tooMuchText: {
    //flex: 1,
    color: '#f2bd11',
    fontSize: 13,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
  },
  amountText: {
    color: colors.TEXT,
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
    marginRight: 10,
  },
  servingSizeText: {
    color: 'black',
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
  },
  percent: {
    flexDirection: 'column',
    //borderBottomWidth: 0.5,
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 0.5,
    width: '100%',
    marginTop: 10,
  },
  progressBar: {
    margin: 10,
    width: '90%',
  },
  nutritionFacts: {
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
