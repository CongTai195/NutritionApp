import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  buttonPart: {
    marginHorizontal: 15,
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: colors.RED,
    padding: 10,
    height: 50,
    borderRadius: 20,
    margin: 12,
  },
  textButton: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styles;
