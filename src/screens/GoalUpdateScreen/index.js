import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import QuantitySelector from '../../components/QuantitySelector';
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {useToast} from 'react-native-toast-notifications';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

const GoalUpdateScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  const route = useRoute();
  const [isAdded, setIsAdded] = useState(false);

  const [startingWeight, setStartingWeight] = useState(
    parseInt(user?.process.starting_weight),
  );

  const [currentWeight, setCurrentWeight] = useState(
    user?.process.current_weight,
  );

  const [goalWeight, setGoalWeight] = useState(user?.process.goal_weight);

  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    user?.process.activity_level,
  );

  const [selectedWeeklyGoal, setSelectedWeeklyGoal] = useState(
    user?.process.weekly_goal,
  );

  const formatDate = input => {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];
    return day + '/' + month + '/' + year;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Goals',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity onPress={() => updateProcess()}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [
    navigation,
    goalWeight,
    startingWeight,
    currentWeight,
    selectedActivityLevel,
    selectedWeeklyGoal,
  ]);

  const updateProcess = async () => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/updateProcess`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'PUT',
        body: JSON.stringify({
          starting_weight: startingWeight,
          current_weight: currentWeight,
          goal_weight: goalWeight,
          weekly_goal: selectedWeeklyGoal,
          activity_level: selectedActivityLevel,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        toast.show('Change goals successfully.', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        context.getUser();
        context.getDiary(moment().toDate().toISOString().split('T')[0]);
      } else {
        console.log(result);
        alert('Error adding food');
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(
    //   JSON.stringify({
    //     starting_weight: startingWeight,
    //     current_weight: currentWeight,
    //     goal_weight: goalWeight,
    //     weekly_goal: selectedWeeklyGoal,
    //     activity_level: selectedActivityLevel,
    //   }),
    // );
  };
  const array = [
    [
      {
        id: 0,
        value: 'Lose 0,2 kilograms per week',
        label: 'Lose 0,2 kilograms per week',
      },
      {
        id: 1,
        value: 'Lose 0,5 kilograms per week',
        label: 'Lose 0,5 kilograms per week',
      },
      {
        id: 2,
        value: 'Lose 0,8 kilograms per week',
        label: 'Lose 0,8 kilograms per week',
      },
      {
        id: 3,
        value: 'Lose 1 kilogram per week',
        label: 'Lose 1 kilogram per week',
      },
    ],
    [
      {
        id: 0,
        value: 'Maintain Weight',
        label: 'Maintain Weight',
      },
    ],
    [
      {
        id: 0,
        value: 'Gain 0,2 kilograms per week',
        label: 'Gain 0,2 kilograms per week',
      },
      {
        id: 1,
        value: 'Gain 0,5 kilograms per week',
        label: 'Gain 0,5 kilograms per week',
      },
    ],
  ];

  let picker =
    goalWeight < startingWeight
      ? array[0]
      : goalWeight > startingWeight
      ? array[2]
      : array[1];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.others}>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Starting Weight</Text>
          <View style={[styles.textInput]}>
            <TextInput
              maxLength={4}
              placeholder={'%'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                if (value === '') {
                  setStartingWeight(0);
                } else setStartingWeight(parseFloat(value));
              }}
              defaultValue={startingWeight.toString()}
            />
          </View>
          <Text style={styles.servingSizeText}>
            kg on {formatDate(user?.process.created_at)}
          </Text>
        </View>

        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Current Weight</Text>
          <View style={[styles.textInput]}>
            <TextInput
              maxLength={4}
              placeholder={'%'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                if (value === '') {
                  setCurrentWeight(0);
                } else setCurrentWeight(parseFloat(value));
              }}
              defaultValue={currentWeight.toString()}
            />
          </View>
          <Text style={styles.servingSizeText}>kg</Text>
        </View>

        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Goal Weight</Text>
          <View style={[styles.textInput]}>
            <TextInput
              maxLength={4}
              placeholder={'%'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                if (value === '') {
                  setGoalWeight(0);
                } else setGoalWeight(parseInt(value));
              }}
              defaultValue={goalWeight.toString()}
            />
          </View>
          <Text style={styles.servingSizeText}>kg</Text>
        </View>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Weekly Goal</Text>
          <Text style={styles.textPicker}>{selectedWeeklyGoal}</Text>
          <Picker
            style={{height: 50, width: 35}}
            useNativeAndroidPickerStyle={false}
            selectedValue={selectedWeeklyGoal}
            onValueChange={itemValue => setSelectedWeeklyGoal(itemValue)}>
            {picker?.map(item => (
              <Picker.Item
                key={item.id}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Activity Level</Text>
          <Text style={styles.textPicker}>{selectedActivityLevel}</Text>
          <Picker
            style={{height: 50, width: 35}}
            useNativeAndroidPickerStyle={false}
            selectedValue={selectedActivityLevel}
            onValueChange={itemValue => setSelectedActivityLevel(itemValue)}>
            <Picker.Item label={'Not Very Active'} value={'Not Very Active'} />
            <Picker.Item label={'Lightly Active'} value={'Lightly Active'} />
            <Picker.Item label={'Active'} value={'Active'} />
            <Picker.Item label={'Very Active'} value={'Very Active'} />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoalUpdateScreen;
