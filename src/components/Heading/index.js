import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Heading = ({name}) => {
    return (
        <View style={styles.heading}>
          <Text style={styles.textHeading}>{name}</Text>
        </View>
      );
}
 
export default Heading;