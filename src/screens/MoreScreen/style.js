import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
    backgroundColor: colors.LIGHT_GREY,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    backgroundColor: colors.PURE_WHITE,
    marginTop: 10,
    borderRadius: 10,
    //height: '100%',
  },
  profile: {
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streak: {
    width: 75,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    width: 75,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightText: {
    fontSize: 14,
    color: 'black',
    fontFamily: font.DEFAULT_FONT,
    fontWeight: '500',
  },
  boldText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  weightLostText: {
    fontSize: 18,
    color: colors.GREEN_SELECTED,
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.TEXT,
    resizeMode: 'cover',
  },
  child: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  labelPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  othersSection: {
    height: 60,
    width: '95%',
    backgroundColor: colors.PURE_WHITE,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logOutSection: {
    width: '35%',
    backgroundColor: colors.PURE_WHITE,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
  },
  textChild: {
    fontWeight: '500',
    width: '100%',
    fontSize: 16,
    color: 'black',
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
