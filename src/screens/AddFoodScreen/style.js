import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    color: '#C6A079',
    fontSize: 18,
    fontWeight: '900',
    margin: 10,
    fontFamily: font.DEFAULT_FONT,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

export default styles;
