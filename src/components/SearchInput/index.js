import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/colors/colors';
const SearchInput = props => {
  return (
    <View style={styles.container}>
      <View style={styles.inputPart}>
        <View
          style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name={props.icon} color={colors.GREY} size={20} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={props.initialPlaceholder}
          placeholderTextColor={colors.GREY}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureText}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onSubmitEditing={props.onSubmitEditing}
        />
      </View>
    </View>
  );
};

export default SearchInput;
