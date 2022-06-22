import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import colors from '../../assets/colors/colors';
import styles from './style';
const Button = props => {
  const getDisable = () => {
    if (props.disable) {
      return colors.LIGHT_THEME;
    } else return colors.THEME;
  };
  return (
    <View style={[styles.buttonPart]}>
      {!props.isLoading ? (
        <TouchableOpacity
          disabled={props.disable}
          style={[styles.button, {backgroundColor: getDisable()}]}
          onPress={() => props.onPress()}>
          <Text style={styles.textButton}>{props.text}</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={colors.TEXT}
          style={[styles.button, {backgroundColor: colors.THEME}]}
        />
      )}
    </View>
  );
};

export default Button;
