import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
  },
  headerSection: {
    flexDirection: 'row',
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    marginTop: 10,
    borderRadius: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.TEXT,
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    margin: 10,
    marginLeft: 20,
  },
  nameSection: {
    flex: 1,
    margin: 10,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  lightText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    fontFamily: font.DEFAULT_FONT,
  },
  progressSection: {
    flexDirection: 'row',
    backgroundColor: colors.PURE_WHITE,
    width: '95%',
    marginTop: 10,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  child: {
    flexDirection: 'row',
    //borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 0.5,
    width: '100%',
  },
  textChild: {
    margin: 10,
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    fontFamily: font.DEFAULT_FONT,
  },
  infoSection: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.PURE_WHITE,
    marginBottom: 20,
  },
});

export default styles;
