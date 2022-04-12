import {StyleSheet, StatusBar} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PURE_WHITE,
    marginBottom: 70
    // width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
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
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  smallTitle: {
    fontSize: 10,
    fontFamily: font.DEFAULT_FONT,
    color: colors.BLACK,
  },
  image: {height: '100%', width: '100%'},
  label: {
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '700',
    color: colors.BLACK,
    fontSize: 20,
    marginVertical: 10,
  },
  //screen: {margin: '3%'},
});

export default styles;
