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
import colors from '../../assets/colors/colors';
const Input = props => {
  const getBorderColor = () => {
    if (props.error) {
      return colors.RED;
    } else return colors.PURE_WHITE;
  };
  return (
    <View>
      <View style={[styles.inputPart, {borderColor: getBorderColor()}]}>
        <Icon name={props.icon} color={colors.PURE_WHITE} size={20} />
        <TextInput
          style={styles.input}
          placeholder={props.initialPlaceholder}
          placeholderTextColor={colors.LIGHT_GREY}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureText}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        {props.pressable}
      </View>
      {props.error && (
        <View style={styles.errorPart}>
          <Text style={styles.errorText}>{props.error}.</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
