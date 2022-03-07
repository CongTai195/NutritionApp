import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent:"center"
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
});

export default styles;
