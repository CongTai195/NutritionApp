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
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
const Input = props => {
  return (
    <View>
      <View style={styles.inputPart}>
        <Icon name={props.icon} color="#FFF" size={20} />
        <TextInput
          style={styles.input}
          placeholder={props.initialPlaceholder}
          placeholderTextColor="#FFF"
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureText}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        {props.pressable}
      </View>
      {props.error !== "" ? <View style={styles.errorPart}>
        <Text style={styles.errorText}>{`Please input your ${props.error}`}.</Text>
      </View> : null}
    </View>
  );
};

export default Input;
