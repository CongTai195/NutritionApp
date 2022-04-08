import { StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    header:{
        flexDirection: "row",
        backgroundColor: colors.PURE_WHITE,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        width: "95%"
    },
    childHeader:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textChildHeader: {
        color: "black",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: font.DEFAULT_FONT
    }
})
export default styles;