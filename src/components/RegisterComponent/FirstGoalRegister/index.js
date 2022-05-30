import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';

const FirstGoalRegister = props => {
  const width = Dimensions.get('window').width;

  const progress = [
    '#57ff60',
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
        }}>
        <Progress progress={progress} />
        <View style={{marginVertical: 10}}>
          <Text style={styles.text}>What is your goal?</Text>
        </View>
        <View style={{flex: 1, width: width}}>
          <SelectionBox text={'Lose Weight'} />
          <SelectionBox text={'Maintain Weight'} />
          <SelectionBox text={'Gain Weight'} />
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={props.onPress} text={'NEXT'} />
      </View>
    </View>
  );
};

export default FirstGoalRegister;
