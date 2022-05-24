import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  iconNotification: {
    marginLeft: 10,
  },
  counter: {
    backgroundColor: colors.PURE_WHITE,
    height: '20%',
    padding: 15,
  },
  calculator: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childCalculator: {
    margin: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChild: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginVertical: 10,
  },
  addingSection: {
    flex: 1,
    marginTop: 10,
    marginBottom: 70,
    width: '95%',
    borderRadius: 10,
    backgroundColor: colors.LIGHT_GREY,
  },
});

export default styles;
