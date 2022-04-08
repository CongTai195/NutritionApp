import { StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
    counter:{
        backgroundColor: colors.PURE_WHITE,
        height: "20%",
        padding: 15,
        width: "95%",
        borderRadius: 20,
        marginTop: 10
    },
    calculator:{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent:"center",
        alignItems: "center",
    },
    childCalculator:{
        margin: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    textChild:{
        fontSize: 16,
        fontWeight: "400",
        color: "black",
        marginVertical: 10,
        fontFamily: font.DEFAULT_FONT
    },
})

export default styles;