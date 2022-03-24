import {StyleSheet, StatusBar } from 'react-native';
import colors from '../../assets/colors/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.LIGHT_GREY,
        width: "100%"
    },
    iconNotification: {
        marginLeft: 10
    },
    counter:{
        backgroundColor: colors.PURE_WHITE,
        height: "20%",
        padding: 15
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
        marginVertical: 10
    }
});

export default styles;