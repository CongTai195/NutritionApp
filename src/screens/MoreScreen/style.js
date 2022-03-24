import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 70
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
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
        color: "black"
    },
    boldText: {
        fontSize: 18,
        color: "black",
        fontWeight: "900"
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
        borderBottomColor: "black"
    }, 
    textChild: {
        fontSize: 16,
        color: "black"
    }
});

export default styles;