import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectionBox = props => {
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.selection}>
      <Text style={styles.textSelection}>{props.text}</Text>
    </View>
  );
};

export default SelectionBox;
