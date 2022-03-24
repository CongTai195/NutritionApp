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
  return (
    <View>
      <View style={styles.inputPart}>
        <Icon name={props.icon} color={colors.WHITE} size={20} />
        <TextInput
          style={styles.input}
          placeholder={props.initialPlaceholder}
          placeholderTextColor={colors.GREY}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureText}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        {props.pressable}
      </View>
      {props.error && <View style={styles.errorPart}>
        <Text style={styles.errorText}>{props.error}.</Text>
      </View>}
    </View>
  );
};

export default Input;
