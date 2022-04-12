import { StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
    container: {
        marginBottom: 70,
        backgroundColor: colors.LIGHT_GREY,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        backgroundColor: colors.PURE_WHITE,
        marginTop: 10,
        borderRadius: 20
    },
    profile:{
        margin: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    streak: {
        width: 75,
        margin: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    progress:{
        width: 75,
        margin: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    lightText: {
        fontSize: 14,
        color: "black",
        fontFamily: font.DEFAULT_FONT,
        fontWeight: "500"
    },
    boldText: {
        fontSize: 18,
        color: "black",
        fontWeight: "900",
        fontFamily: font.DEFAULT_FONT,
    },
    avatar:{
        height: 100,
        width: 100,
        borderRadius: 50,
        resizeMode: "cover"
    },
    child:{
        margin: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        borderBottomWidth: 0.2,
        borderBottomColor: "black",
    }, 
    othersSection:{
        width: "95%",
        backgroundColor: colors.PURE_WHITE,
        marginTop: 10,
        borderRadius: 20
    },
    textChild: {
        fontSize: 16,
        color: "black",
        fontFamily: font.DEFAULT_FONT
    }
});

export default styles;