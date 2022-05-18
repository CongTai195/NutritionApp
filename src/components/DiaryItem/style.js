import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
  childAdding: {
    borderRadius: 10,
    backgroundColor: colors.PURE_WHITE,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.BLACK,
    margin: 10,
    fontFamily: font.DEFAULT_FONT,
  },
  separator: {
    borderBottomWidth: 0.2,
    borderBottomColor: colors.BACK_GROUND_COLOR,
  },
  addFood: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  container: {
    //backgroundColor: '#f4f4f4',
    backgroundColor: colors.LIGHT_GREY,
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    //margin: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingLeft: 15,
    margin: 5,
    height: 60,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  textHeader: {
    fontSize: 15,
    color: 'black',
    fontWeight: '900',
    fontFamily: font.DEFAULT_FONT,
  },
  textInfo: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
    fontFamily: font.DEFAULT_FONT,
  },
});

export default styles;
