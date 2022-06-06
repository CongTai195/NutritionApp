import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';
import {DataContext} from '../../../context/Context';

const FirstGoalRegister = props => {
  const context = useContext(DataContext);
  const width = Dimensions.get('window').width;
  const [selection, setSelection] = useState(context.register_data?.goal || '');

  const progress = [
    colors.GREEN_SELECTED,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
  ];
  const getBorderColor = name => {
    if (selection === name) return colors.GREEN_SELECTED;
    else return '#FFF';
  };
  const onPress = item => {
    if (item === 'Maintain Weight') {
      context.setRegisterData(
        {
          name: 'weekly_goal',
          value: 'Maintain Weight',
        },
        () => {
          context.setRegisterData({name: 'goal', value: item});
        },
      );
      setSelection(item);
    } else {
      context.setRegisterData({name: 'goal', value: item});
      setSelection(item);
    }
  };

  const array = [
    {
      id: 0,
      name: 'Lose Weight',
    },
    {
      id: 1,
      name: 'Maintain Weight',
    },
    {
      id: 2,
      name: 'Gain Weight',
    },
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
          {array?.map(item => (
            <SelectionBox
              key={item.id}
              onPress={() => onPress(item.name)}
              getBorderColor={() => getBorderColor(item.name)}
              text={item.name}
            />
          ))}
        </View>
      </View>
      <View style={styles.button}>
        <Button
          disable={!context.register_data?.goal}
          onPress={props.onPress}
          text={'NEXT'}
        />
      </View>
    </View>
  );
};

export default FirstGoalRegister;
