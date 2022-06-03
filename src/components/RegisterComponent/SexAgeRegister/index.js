import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Dimensions, Pressable} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import SelectionBox from '../../SelectionBox';
import Progress from '../Progress';
import {DataContext} from '../../../context/Context';

const SexAgeRegister = props => {
  const context = useContext(DataContext);
  const width = Dimensions.get('window').width;
  const [selection, setSelection] = useState(
    context.register_data?.gender || '',
  );
  const [age, setAge] = useState(context.register_data?.age || '');
  const getBorderColor = name => {
    if (selection === name) return colors.GREEN_SELECTED;
    else return '#FFF';
  };
  const onPress = item => {
    setSelection(item);
    context.setRegisterData({name: 'gender', value: item});
  };
  const progress = [
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
  ];

  const array = [
    {
      id: 0,
      name: 'Male',
    },
    {
      id: 1,
      name: 'Female',
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
            marginHorizontal: 30,
          }}>
          <Text style={styles.text}>
            Please select which sex we should use to calculate your calorie
            needs:
          </Text>
        </View>
        <View style={{width: width, flexDirection: 'row'}}>
          {array?.map(item => (
            <Pressable
              key={item.id}
              style={[
                styles.selection,
                {
                  borderColor: getBorderColor(item.name),
                  marginRight: item.name === 'Male' ? 1 : 15,
                  marginLeft: item.name === 'Male' ? 15 : 1,
                },
              ]}
              onPress={() => onPress(item.name)}>
              <Text
                style={[
                  styles.textSelection,
                  {color: getBorderColor(item.name)},
                ]}>
                {item.name}
              </Text>
            </Pressable>
          ))}
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
              maxLength={2}
              placeholder="Your age"
              placeholderTextColor="#c4c4c4"
              style={[
                styles.textTextInput,
                {fontWeight: age === '' ? '500' : '900'},
              ]}
              keyboardType={'numeric'}
              value={age.toString()}
              onChangeText={value => {
                setAge(value);
                context.setRegisterData({name: 'age', value: value});
              }}
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
        <Button
          disable={
            !context.register_data?.gender || !context.register_data?.age
          }
          onPress={props.onPress}
          text={'NEXT'}
        />
      </View>
    </View>
  );
};

export default SexAgeRegister;
