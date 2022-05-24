import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import DiaryItem from '../../components/DiaryItem';
import CaloriesRemaining from '../../components/CaloriesRemaining';
import font from '../../assets/fonts/font';
import {useFocusEffect} from '@react-navigation/native';
import Token from '../../data/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';

const NutrientScreen = () => {
  const context = useContext(DataContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Nutrient',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const today = moment();
  const [isLoading, setIsLoading] = useState(true);

  const diary = context.diary;
  //const food = context.food_diary;
  const food = diary?.food;
  const breakfast = food?.filter(e => e.meal === 'Breakfast');
  const lunch = food?.filter(e => e.meal === 'Lunch');
  const dinner = food?.filter(e => e.meal === 'Dinner');
  const exercise = diary?.exercise;

  const [date, setDate] = useState(
    `${today.toDate().getDate()}/${today.toDate().getMonth() + 1}/${today
      .toDate()
      .getFullYear()}`,
  );

  const calories_in =
    food?.length > 0
      ? food?.reduce((total, food) => {
          return total + parseFloat(food.calories);
        }, 0)
      : 0;

  const calories_out =
    exercise?.length > 0
      ? exercise?.reduce((total, exercise) => {
          return total + parseFloat(exercise.calories);
        }, 0)
      : 0;

  useFocusEffect(
    React.useCallback(() => {
      context.getDiary(date);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [date, navigation]),
  );

  return (
    <View style={styles.root}>
      <CalendarStrip
        showMonth
        scrollable
        style={{height: 70}}
        calendarColor={colors.PURE_WHITE}
        calendarHeaderStyle={{color: colors.PURE_WHITE}}
        dateNumberStyle={{
          color: colors.GREY,
          fontSize: 18,
          fontFamily: font.DEFAULT_FONT,
        }}
        dateNameStyle={{
          color: colors.GREY,
          fontSize: 12,
          fontFamily: font.DEFAULT_FONT,
        }}
        highlightDateNameStyle={{
          color: colors.BACK_GROUND_COLOR,
          fontSize: 14,
          fontFamily: font.DEFAULT_FONT,
          fontWeight: '900',
        }}
        highlightDateNumberStyle={{
          color: colors.BACK_GROUND_COLOR,
          fontSize: 20,
          fontFamily: font.DEFAULT_FONT,
          fontWeight: '900',
        }}
        iconContainer={{flex: 0.1}}
        iconStyle={{tintColor: 'black'}}
        selectedDate={today}
        useIsoWeekday={false}
        startingDate={moment().subtract(3, 'days')}
        onDateSelected={dateSelected => {
          setIsLoading(true);
          setDate(
            `${dateSelected.toDate().getDate()}/${
              dateSelected.toDate().getMonth() + 1
            }/${dateSelected.toDate().getFullYear()}`,
          );
          // setCalories({
          //   goal: calories_data[0].calories.goal,
          //   food: calories_data[0].calories.food,
          //   exercise: calories_data[0].calories.exercise,
          // });
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.BACK_GROUND_COLOR}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          />
        ) : Object.values(diary).length > 0 ? (
          <>
            <SafeAreaView style={styles.addingSection}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View></View>
              </ScrollView>
            </SafeAreaView>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default NutrientScreen;
