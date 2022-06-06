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
  const [BMI, setBMI] = useState(0);
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
              placeholder="cm"
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
              placeholder="kg"
              placeholderTextColor="#c4c4c4"
              style={[
                styles.textTextInput,
                {fontWeight: weight === '' ? '500' : '900'},
              ]}
              keyboardType={'numeric'}
              onChangeText={value => {
                if (context.register_data?.goal === 'Maintain Weight') {
                  context.setRegisterData(
                    {
                      name: 'starting_weight',
                      value: value,
                    },
                    () => {
                      context.setRegisterData({
                        name: 'goal_weight',
                        value: value,
                      });
                    },
                  );
                  setWeight(value);
                  setGoalWeight(value);
                } else {
                  context.setRegisterData({
                    name: 'starting_weight',
                    value: value,
                  });
                  setWeight(value);
                }
              }}
              value={weight.toString()}
              onBlur={() =>
                setBMI(
                  Math.round(
                    (weight / (((height / 100) * height) / 100)) * 10,
                  ) / 10,
                )
              }
              onSubmitEditing={() =>
                setBMI(
                  Math.round(
                    (weight / (((height / 100) * height) / 100)) * 10,
                  ) / 10,
                )
              }
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
          {BMI !== 0 ? null : (
            <>
              <Text style={styles.textDescription}>
                It's ok to estimate, you can update this later.
              </Text>
            </>
          )}
          {BMI === 0 ? null : BMI > 15 && BMI < 50 ? (
            <View>
              <Text style={styles.textDescriptionBMI}>Your BMI score is:</Text>
              <Text style={styles.textBMI}>{BMI}</Text>
              <Text style={styles.textDescriptionBMI}>
                {BMI < 18.5
                  ? 'You are classified as underweight.'
                  : BMI < 25
                  ? 'You are classified as normal weight.'
                  : BMI < 30
                  ? 'You are classified as Overweight.'
                  : 'You are classified as obese.'}
              </Text>
              <Text style={styles.textDescriptionBMI}>
                {BMI < 18.5
                  ? '18.5 > BMI'
                  : BMI < 25
                  ? '25 > BMI > 18.5'
                  : BMI < 30
                  ? '30 > BMI > 25'
                  : 'BMI > 30'}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.textWarning}>Is your weight correct?</Text>
            </View>
          )}
        </View>
        {context.register_data?.goal === 'Maintain Weight' ? null : (
          <>
            <View
              style={{
                marginTop: BMI !== 0 ? 0 : 20,
                marginBottom: 10,
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
                  placeholder="kg"
                  placeholderTextColor="#c4c4c4"
                  style={[
                    styles.textTextInput,
                    {fontWeight: goalWeight === '' ? '500' : '900'},
                  ]}
                  keyboardType={'numeric'}
                  onChangeText={value => {
                    setGoalWeight(value);
                    context.setRegisterData({
                      name: 'goal_weight',
                      value: value,
                    });
                  }}
                  value={goalWeight.toString()}
                />
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
                Don't worry, this doesn't affect your daily calorie goal and you
                can always change it later.
              </Text>
            </View>
          </>
        )}
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
