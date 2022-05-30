import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
const SplashRegister = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textSplash}>
        Welcome! Let's customize Nutritious for your goals.
      </Text>
      <View style={styles.button}>
        <Button onPress={props.onPress} text={'CONTINUE'} />
      </View>
    </View>
  );
};

export default SplashRegister;
