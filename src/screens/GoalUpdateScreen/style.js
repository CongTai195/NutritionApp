import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
    marginBottom: 10,
  },
  header: {
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontFamily: font.DEFAULT_FONT,
    color: 'black',
    fontWeight: '900',
  },
  information: {
    fontSize: 14,
    fontFamily: font.DEFAULT_FONT,
    color: 'black',
    fontWeight: '500',
  },
  nutrition: {
    flexDirection: 'row',
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: colors.BLUE,
    // borderWidth: 4,
    // height: 70,
    // width: 70,
    // borderRadius: 35
  },
  nutritionDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNutritionDetail: {
    fontWeight: '500',
    fontFamily: font.DEFAULT_FONT,
  },
  others: {
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childOthers: {
    flexDirection: 'row',
    //borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginBottom: 0.5,
    width: '100%',
  },
  childBenefit: {
    flexDirection: 'row',
    //borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    //height: 40,
    marginBottom: 0.5,
    width: '100%',
  },
  labelText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '900',
    marginHorizontal: 10,
  },
  amountText: {
    color: 'black',
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
    //marginRight: 15,
  },
  textPicker: {
    color: 'black',
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
  },
  servingSizeText: {
    color: 'black',
    fontSize: 16,
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
    marginRight: 15,
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
    flex: 1,
    margin: 10,
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
  image: {
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    //marginHorizontal: 10,
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
