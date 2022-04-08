import { StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';

const styles = StyleSheet.create({
    childAdding:{
        borderBottomWidth: 2,
        borderBottomColor: colors.LIGHT_GREY
    },
    headerText:{
        fontSize: 16,
        fontWeight: "900",
        color: "black",
        margin: 10,
        fontFamily: font.DEFAULT_FONT
    },
    separator: {
        borderBottomWidth: 0.2,
        borderBottomColor: colors.LIGHT_GREY
    },
    addFood:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems:"center",
        margin: 10
    }
})

export default styles;