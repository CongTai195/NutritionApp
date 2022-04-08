import { StyleSheet} from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors';


const styles = StyleSheet.create({
    root:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        marginHorizontal: 15
    },
    button: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1',
    },
    buttonText:{
        fontSize: 18
    },
    quantity:{
        marginHorizontal: 15,
        color: "blue"
    }
});

export default styles;