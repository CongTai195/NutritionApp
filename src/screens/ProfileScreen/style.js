import { StyleSheet } from 'react-native'
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
    },
    headerSection: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        backgroundColor: colors.PURE_WHITE
    },
    avatar:{
        height: 100,
        width: 100,
        borderRadius: 50,
        resizeMode: "cover",
        margin: 10,
        marginLeft: 20
    },
    nameSection:{
        flex: 1,
        margin: 10,
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    lightText:{
        fontSize: 16,
        color: "black",
        fontWeight: "400"
    },
    progressSection:{
        flexDirection:"row",
        borderBottomWidth: 0.5,
        backgroundColor: colors.PURE_WHITE
    },
    child :{
        flexDirection: "row",
        borderBottomWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: colors.PURE_WHITE
    },
    textChild:{
        margin: 10,
        fontSize: 15,
        fontWeight: "400",
        color: "black"
    }
})

export default styles;