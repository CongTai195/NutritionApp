import {StyleSheet, StatusBar, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    marginHorizontal: 10,
    //flex: 1,
  },
  dot: {
    width: 50,
    height: 4,
    borderRadius: 25,
    borderColor: '#c9c9c9',
    backgroundColor: '#ededed',
    borderWidth: 1,
    margin: 5,
    marginTop: 10,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
