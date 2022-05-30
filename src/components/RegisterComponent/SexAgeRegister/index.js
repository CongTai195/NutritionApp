import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';

const SexAgeRegister = props => {
  const width = Dimensions.get('window').width;
  const progress = [
    '#57ff60',
    '#57ff60',
    '#57ff60',
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: width,
        }}>
        <Progress progress={progress} />
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <Text style={styles.text}>
            Please select which sex we should use to calculate your calorie
            needs:
          </Text>
        </View>
        <View style={{width: width, flexDirection: 'row'}}>
          <View style={[styles.selection, {marginLeft: 15}]}>
            <Text style={styles.textSelection}>Male</Text>
          </View>
          <View style={[styles.selection, {marginRight: 15}]}>
            <Text style={styles.textSelection}>Female</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>How old are you?</Text>
        </View>
        <View style={{width: width, flexDirection: 'row'}}>
          <View style={[styles.textInput, {marginHorizontal: 15}]}>
            <TextInput
              placeholder="Your age"
              placeholderTextColor="#fff"
              style={styles.textTextInput}
              keyboardType={'numeric'}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <Text style={styles.textDescription}>
            We use biological sex at birth and age to calculate an accurate goal
            for you.
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={props.onPress} text={'NEXT'} />
      </View>
    </View>
  );
};

export default SexAgeRegister;
