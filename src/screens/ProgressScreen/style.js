import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

import {StyleSheet, StatusBar, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PURE_WHITE,
    marginBottom: 70,
    // width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
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
  header: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: '3%',
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {paddingHorizontal: 10, flex: 1, justifyContent: 'center'},
  bigTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  smallTitle: {
    fontSize: 14,
    fontFamily: font.DEFAULT_FONT,
    color: colors.BLACK,
  },
  image: {height: '100%', width: '100%'},
  label: {
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '700',
    color: colors.BLACK,
    fontSize: 20,
    flex: 1,
  },
  smallerTitle: {
    fontSize: 12,
    fontFamily: font.DEFAULT_FONT,
    color: colors.BLACK,
  },
  scrollView: {
    width: width,
    marginHorizontal: 10,
    //flex: 1,
  },
  card: {
    //flex: 1,
    //height: 150,
    //padding: 10,
    //alignSelf: 'center',
    //backgroundColor: color,
    //justifyContent: 'space-between',
    marginHorizontal: 10,
    width: width - 20,
    marginHorizontal: 8,
    borderRadius: 10,
    shadowColor: 'lightgrey',
    shadowOffset: {width: -5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  waterCard: {
    //flex: 1,
    //height: 150,
    //padding: 10,
    //alignSelf: 'center',
    //backgroundColor: color,
    //justifyContent: 'space-between',
    marginHorizontal: 10,
    width: width / 8,
    marginHorizontal: 8,
    borderRadius: 10,
    shadowColor: 'lightgrey',
    shadowOffset: {width: -5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  dot: {
    width: 50,
    height: 4,
    borderRadius: 25,
    borderColor: '#c9c9c9',
    backgroundColor: '#ededed',
    borderWidth: 1,
    margin: 5,
    marginTop: 10,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //screen: {margin: '3%'},
  header: {
    flexDirection: 'row',
    backgroundColor: colors.PURE_WHITE,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    width: '95%',
  },
  childHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChildHeader: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
