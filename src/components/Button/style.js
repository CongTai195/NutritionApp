import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonPart: {
    marginHorizontal: 15,
    width: width - 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
    padding: 10,
    height: 50,
    borderRadius: 20,
    margin: 12,
  },
  textButton: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
