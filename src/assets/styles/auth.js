import {StyleSheet} from 'react-native';
import colors from '../colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
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
  inputPart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    height: 40,
    margin: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderColor: colors.RED,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    color: colors.WHITE,
    fontSize: 16,
    height: 40,
    margin: 10,
  },
  buttonPart: {
    marginHorizontal: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.RED,
    padding: 10,
    height: 40,
    borderRadius: 20,
    margin: 12,
  },
  textButton: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
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
    justifyContent: 'center',
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
});

export default styles;
