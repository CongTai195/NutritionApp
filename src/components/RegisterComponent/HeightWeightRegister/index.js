import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import Button from '../../Button';
import Progress from '../Progress';
import {DataContext} from '../../../context/Context';

const HeightWeightRegister = props => {
  const context = useContext(DataContext);
  const width = Dimensions.get('window').width;
  const progress = [
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.LIGHT_GREY,
    colors.LIGHT_GREY,
  ];

  const [height, setHeight] = useState(context.register_data?.height || '');
  const [weight, setWeight] = useState(
    context.register_data?.starting_weight || '',
  );
  const [goalWeight, setGoalWeight] = useState(
    context.register_data?.goal_weight || '',
  );

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
              maxLength={3}
              placeholder="Your height"
              placeholderTextColor="#c4c4c4"
              style={[
                styles.textTextInput,
                {fontWeight: height === '' ? '500' : '900'},
              ]}
              keyboardType={'numeric'}
              onChangeText={value => {
                setHeight(value);
                context.setRegisterData({name: 'height', value: value});
              }}
              value={height.toString()}
            />
            {height === '' ? null : (
              <View
                style={{
                  position: 'absolute',
                  left: width / 2,
                }}>
                <Text style={styles.text}>cm</Text>
              </View>
            )}
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
              maxLength={3}
              placeholder="Your weight"
              placeholderTextColor="#c4c4c4"
              style={[
                styles.textTextInput,
                {fontWeight: weight === '' ? '500' : '900'},
              ]}
              keyboardType={'numeric'}
              onChangeText={value => {
                setWeight(value);
                context.setRegisterData({
                  name: 'starting_weight',
                  value: value,
                });
              }}
              value={weight.toString()}
            />
            {weight === '' ? null : (
              <View
                style={{
                  position: 'absolute',
                  left: width / 2,
                }}>
                <Text style={styles.text}>kg</Text>
              </View>
            )}
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
              maxLength={3}
              placeholder="Your weight"
              placeholderTextColor="#c4c4c4"
              style={[
                styles.textTextInput,
                {fontWeight: goalWeight === '' ? '500' : '900'},
              ]}
              keyboardType={'numeric'}
              onChangeText={value => {
                setGoalWeight(value);
                context.setRegisterData({name: 'goal_weight', value: value});
              }}
              value={goalWeight.toString()}
            />
            {goalWeight === '' ? null : (
              <View
                style={{
                  position: 'absolute',
                  left: width / 2,
                }}>
                <Text style={styles.text}>kg</Text>
              </View>
            )}
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
        <Button
          disable={
            !context.register_data?.height ||
            !context.register_data?.starting_weight ||
            !context.register_data?.goal_weight
          }
          onPress={props.onPress}
          text={'NEXT'}
        />
      </View>
    </View>
  );
};

export default HeightWeightRegister;
