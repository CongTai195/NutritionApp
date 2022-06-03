import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';
import {DataContext} from '../../../context/Context';

const WeeklyGoalRegister = props => {
  const context = useContext(DataContext);
  const width = Dimensions.get('window').width;
  const [selection, setSelection] = useState(
    context.register_data?.weekly_goal || '',
  );

  const progress = [
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.LIGHT_GREY,
  ];
  const getBorderColor = name => {
    if (selection === name) return colors.GREEN_SELECTED;
    else return '#FFF';
  };
  const onPress = item => {
    context.setRegisterData({name: 'weekly_goal', value: item});
    setSelection(item);
  };

  const array_gain = [
    {
      id: 0,
      name: 'Gain 0,2 kilograms per week',
    },
    {
      id: 1,
      name: 'Gain 0,5 kilograms per week',
    },
  ];

  const array_lost = [
    {
      id: 0,
      name: 'Lose 0,2 kilograms per week',
    },
    {
      id: 1,
      name: 'Lose 0,5 kilograms per week',
    },
    {
      id: 2,
      name: 'Lose 0,8 kilograms per week',
    },
    {
      id: 3,
      name: 'Lose 1 kilogram per week',
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
          <Text style={styles.text}>What is your weekly goal?</Text>
        </View>
        <View style={{flex: 1, width: width}}>
          {context.register_data?.goal === 'Gain Weight' ? (
            <>
              {array_gain?.map(item => (
                <SelectionBox
                  key={item.id}
                  onPress={() => onPress(item.name)}
                  getBorderColor={() => getBorderColor(item.name)}
                  text={item.name}
                />
              ))}
            </>
          ) : (
            <>
              {array_lost?.map(item => (
                <SelectionBox
                  key={item.id}
                  onPress={() => onPress(item.name)}
                  getBorderColor={() => getBorderColor(item.name)}
                  text={item.name}
                />
              ))}
            </>
          )}
        </View>
      </View>
      <View style={styles.button}>
        <Button
          disable={!context.register_data?.weekly_goal}
          onPress={props.onPress}
          text={'NEXT'}
        />
      </View>
    </View>
  );
};

export default WeeklyGoalRegister;
