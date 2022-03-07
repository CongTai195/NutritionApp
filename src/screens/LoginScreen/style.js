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
  heading: {
    marginLeft: 30,
    marginTop: 10,
  },
  textHeading: {
    color: colors.WHITE,
    fontSize: 30,
    fontWeight: 'bold',
  },
  errorPart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.RED,
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
  textAppName: {
    fontSize: 30,
    color: colors.WHITE,
    fontWeight: 'bold',
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
  toSignup:{
    flexDirection: 'row',
    margin: 20,
    justifyContent: "center"
  },
  textToSignup:{
    fontSize: 16,
    color: colors.WHITE,
    marginHorizontal: 10
  },
  textSignup:{
    fontSize: 16,
    color: colors.RED,
    marginHorizontal: 10
  }
});

export default styles;
