import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';

const Progress = props => {
  const width = Dimensions.get('window').width;
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        width: width - 20,
        height: 5,
        flexDirection: 'row',
      }}>
      {props.progress.map((item, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            borderRadius: 5,
            marginHorizontal: 3,
            backgroundColor: item,
          }}></View>
      ))}
    </View>
  );
};

export default Progress;
