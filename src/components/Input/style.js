import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
  inputPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 50,
    height: 45,
    margin: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderColor: colors.BLUE,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    color: colors.PURE_WHITE,
    fontSize: 16,
    height: 50,
    margin: 10,
  },
  errorPart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.RED,
  },
});

export default styles;
