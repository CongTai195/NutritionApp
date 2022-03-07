import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './style';
const Button = props => {
  return (
    <View style={styles.buttonPart}>
      <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
        <Text style={styles.textButton}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
