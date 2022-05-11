import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
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
//import Diaries from '../../data/Diaries';

const DiaryScreen = () => {
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

  const [food, setFood] = useState([]);
  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});

  const [date, setDate] = useState(
    `${today.toDate().getDate()}/${today.toDate().getMonth() + 1}/${today
      .toDate()
      .getFullYear()}`,
  );

  const [diary, setDiary] = useState({});

  const calories =
    food.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.calories);
        }, 0)
      : 0;

  const creatDiary = async () => {
    try {
      const response = await fetch(`${BASE_URL}diary`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer` + Token,
        },
        method: 'POST',
        body: JSON.stringify({
          date: date,
          user_id: 1,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        setDiary(result.results);
        setFood({});
        setBreakfast({});
        setLunch({});
        setDinner({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDiary = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}diary/detail?date=${date}&user_id=1`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer` + Token,
          },
        },
      );
      const result = await response.json();
      if (result.status === 'OK') {
        setDiary(result.results);
        setFood(result.results.food);
        setBreakfast(result.results.food.filter(e => e.meal === 'Breakfast'));
        setLunch(result.results.food.filter(e => e.meal === 'Lunch'));
        setDinner(result.results.food.filter(e => e.meal === 'Dinner'));
      }
      if (result.status === 'NG') {
        creatDiary();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //console.log(diary.length);

  useFocusEffect(
    React.useCallback(() => {
      getDiary();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [date, navigation]),
  );

  return (
    <View style={styles.root}>
      <CalendarStrip
        showMonth={false}
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
            <CaloriesRemaining goal={3000} food={calories} exercise={0} />
            <SafeAreaView style={styles.addingSection}>
              {/* <FlatList
                data={DATA}
                renderItem={({item}) => <DiaryItem item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              /> */}
              <ScrollView showsVerticalScrollIndicator={false}>
                <DiaryItem
                  meal={'Breakfast'}
                  listFood={breakfast}
                  diaryId={diary.id}
                />
                <DiaryItem meal={'Lunch'} listFood={lunch} diaryId={diary.id} />
                <DiaryItem
                  meal={'Dinner'}
                  listFood={dinner}
                  diaryId={diary.id}
                />
                {/* <DiaryItem meal={'Snacks'} diaryId={diary[0].id} />
                <DiaryItem meal={'Exercise'} diaryId={diary[0].id} />
                <DiaryItem meal={'Water'} diaryId={diary[0].id} /> */}
              </ScrollView>
            </SafeAreaView>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default DiaryScreen;
