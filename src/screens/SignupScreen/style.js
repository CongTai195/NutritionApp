import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
  inner:{
    justifyContent:"center",
    flex: 1
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoImage: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  hidePassword: {
    backgroundColor: colors.BACK_GROUND_COLOR,
    marginHorizontal: 5,
  },
  textHidePassword: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  toLogin:{
    flexDirection: 'row',
    margin: 20,
    justifyContent: "center"
  },
  textToLogin:{
    fontSize: 16,
    color: colors.WHITE,
    marginHorizontal: 10,
    fontWeight: "600"
  },
  textLogin:{
    fontSize: 16,
    color: colors.RED,
    marginHorizontal: 10,
    fontWeight: "600"
  }
});

export default styles;
