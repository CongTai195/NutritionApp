import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import colors from '../../assets/colors/colors';
import styles from './style';
const Button = props => {
  const getDisable = () => {
    if (props.disable) {
      return '#6080f1';
    } else return colors.BLUE;
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
          color={colors.PURE_WHITE}
          style={[styles.button, {backgroundColor: colors.BLUE}]}
        />
      )}
    </View>
  );
};

export default Button;
