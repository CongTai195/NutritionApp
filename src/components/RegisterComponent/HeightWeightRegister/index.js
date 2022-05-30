import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';

const HeightWeightRegister = props => {
  const width = Dimensions.get('window').width;
  const progress = [
    '#57ff60',
    '#57ff60',
    '#57ff60',
    '#57ff60',
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
          <Text style={styles.text}>How tall are you?</Text>
        </View>
        <View style={{width: width, flexDirection: 'row'}}>
          <View
            style={[
              styles.textInput,
              {marginHorizontal: 15, flexDirection: 'row'},
            ]}>
            <TextInput
              placeholder="Your height"
              placeholderTextColor="#fff"
              style={styles.textTextInput}
              keyboardType={'numeric'}
            />
            <View
              style={{
                position: 'absolute',
                left: width / 2,
              }}>
              <Text style={styles.text}>cm</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>How much do you weigh?</Text>
        </View>
        <View style={{width: width, flexDirection: 'row'}}>
          <View
            style={[
              styles.textInput,
              {marginHorizontal: 15, flexDirection: 'row'},
            ]}>
            <TextInput
              placeholder="Your weight"
              placeholderTextColor="#fff"
              style={styles.textTextInput}
              keyboardType={'numeric'}
            />
            <View
              style={{
                position: 'absolute',
                left: width / 2,
              }}>
              <Text style={styles.text}>kg</Text>
            </View>
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
            It's ok to estimate, you can update this later.
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>What's your goal weight?</Text>
        </View>
        <View style={{width: width, flexDirection: 'row'}}>
          <View
            style={[
              styles.textInput,
              {marginHorizontal: 15, flexDirection: 'row'},
            ]}>
            <TextInput
              placeholder="Your weight"
              placeholderTextColor="#fff"
              style={styles.textTextInput}
              keyboardType={'numeric'}
            />
            <View
              style={{
                position: 'absolute',
                left: width / 2,
              }}>
              <Text style={styles.text}>kg</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Text style={styles.textDescription}>
            Don't worry, this doesn't affect your daily calorie goal and you can
            always change it later.
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={props.onPress} text={'NEXT'} />
      </View>
    </View>
  );
};

export default HeightWeightRegister;
