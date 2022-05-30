import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';

const SecondGoalRegister = props => {
  const width = Dimensions.get('window').width;
  const progress = [
    '#57ff60',
    '#57ff60',
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
  ];

  const array = [
    {
      id: 1,
      name: 'Not Very Active',
      description: 'Spend most of the day sitting (e.g. bankteller, desk job)',
    },
    {
      id: 2,
      name: 'Lightly Active',
      description:
        'Spend a good part of the day on your feet (e.g. teacher, salesperson)',
    },
    {
      id: 3,
      name: 'Active',
      description:
        'Spend a good part of the day doing some physical activity (e.g. food server, postal carrier)',
    },
    {
      id: 4,
      name: 'Very Active',
      description:
        'Spend most of the day doing heavy physical activity (e.g. bike messenger, carpenter)',
    },
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
          }}>
          <Text style={styles.text}>What is your baseline activity level?</Text>
          <Text style={styles.textDescription}>
            Not including workouts - we count that separately.
          </Text>
        </View>
        <View style={{flex: 1, width: width}}>
          {array.map(item => (
            <>
              <View key={item.id} style={styles.selection}>
                <Text style={styles.textSelection}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.textDescription}>
                  {item.description}
                </Text>
              </View>
            </>
          ))}
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={props.onPress} text={'NEXT'} />
      </View>
    </View>
  );
};

export default SecondGoalRegister;
