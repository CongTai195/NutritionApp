import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import styles from '../../assets/styles/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
const Input = props => {
  return (
    <View style={styles.inputPart}>
      <Icon name={props.icon} color="#FFF" size={20} />
      <TextInput
        style={styles.input}
        placeholder={props.initialPlaceholder}
        placeholderTextColor="#FFF"
        onChangeText={text => props.onChangeText(text)}
        secureTextEntry={props.secureText}
        value={props.value}
        onFocus={() => props.setPlaceholder('')}
        onBlur={() => props.setPlaceholder(`${props.name}`)}
      />
      {props.pressable}
    </View>
  );
};

export default Input;
