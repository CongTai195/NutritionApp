import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container:{
    
  },
  inputPart: {
    alignSelf: "center",
    flexDirection: 'row',
    alignItems: "center",
    width: "95%",
    height: 50,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderColor: colors.PURE_WHITE,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: colors.PURE_WHITE
  },
  input: {
    flex: 1,
    color: colors.BLACK,
    fontSize: 16,
    height: 50,
    margin: 10,
  }
});

export default styles;
