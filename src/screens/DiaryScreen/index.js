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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';

const DiaryScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Diary',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const today = moment();
  const [isLoading, setIsLoading] = useState(true);

  const diary = context.diary;
  const calories = diary?.process?.calories;
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

  let remaining = calories - calories_in + calories_out;

  useFocusEffect(
    React.useCallback(() => {
      context.getDiary(date);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, [date, navigation]),
  );

  useEffect(() => {
    if (remaining < 0) {
      context.updateDiary(diary.id, {is_enough: 1});
    }
    if (remaining > 0) {
      context.updateDiary(diary.id, {is_enough: 0});
    }
  }, [remaining]);

  return (
    <View style={styles.root}>
      <CalendarStrip
        showMonth={true}
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
        //datesWhitelist={[{start: moment('2021-01-01'), end: moment()}]}
        startingDate={moment().subtract(3, 'days')}
        onDateSelected={dateSelected => {
          setIsLoading(true);
          setDate(
            `${dateSelected.toDate().getDate()}/${
              dateSelected.toDate().getMonth() + 1
            }/${dateSelected.toDate().getFullYear()}`,
          );
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
            <CaloriesRemaining
              goal={calories}
              food={calories_in}
              exercise={calories_out}
              onPress={() => {
                navigation.navigate('NutrientScreen');
              }}
            />
            <SafeAreaView style={styles.addingSection}>
              {/* <FlatList
                data={DATA}
                renderItem={({item}) => <DiaryItem item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              /> */}
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <DiaryItem
                    meal={'Breakfast'}
                    listItem={breakfast}
                    diaryId={diary.id}
                    date={date}
                    onPress={() =>
                      navigation.navigate('AddFoodScreen', {
                        meal: 'Breakfast',
                        diaryId: diary.id,
                      })
                    }
                  />
                  <DiaryItem
                    meal={'Lunch'}
                    listItem={lunch}
                    diaryId={diary.id}
                    date={date}
                    onPress={() =>
                      navigation.navigate('AddFoodScreen', {
                        meal: 'Lunch',
                        diaryId: diary.id,
                      })
                    }
                  />
                  <DiaryItem
                    meal={'Dinner'}
                    listItem={dinner}
                    diaryId={diary.id}
                    date={date}
                    onPress={() =>
                      navigation.navigate('AddFoodScreen', {
                        meal: 'Dinner',
                        diaryId: diary.id,
                      })
                    }
                  />
                  <DiaryItem
                    meal={'Exercise'}
                    listItem={exercise}
                    diaryId={diary.id}
                    date={date}
                    onPress={() =>
                      navigation.navigate('AddExerciseScreen', {
                        meal: 'Exercise',
                        diaryId: diary.id,
                      })
                    }
                  />
                </View>
              </ScrollView>
            </SafeAreaView>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default DiaryScreen;
