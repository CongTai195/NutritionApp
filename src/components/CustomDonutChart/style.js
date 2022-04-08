import { StyleSheet } from 'react-native'
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
    },
    graphWrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      //position: "absolute",
      textAlign: "center",
      fontSize: 20,
      fontWeight: '700',
      fontFamily: font.DEFAULT_FONT,
      color: 'black',
    },
    label1: {
        //position: "absolute",
        textAlign: "center",
        fontSize: 14,
        fontWeight: '500',
        fontFamily: font.DEFAULT_FONT,
      },
  });

export default styles;