import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectionBox = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <View style={[styles.selection, {borderColor: props.getBorderColor()}]}>
        <Text style={[styles.textSelection, {color: props.getBorderColor()}]}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectionBox;
