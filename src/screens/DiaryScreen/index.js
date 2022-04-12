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
import Diaries from '../../data/Diaries';

const DiaryScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Diary',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle:{fontWeight: "700", fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const today = moment();
  const [isLoading, setIsLoading] = useState(true);
  
  const [date, setDate] = useState(
    `${today.toDate().getDate()}/${today.toDate().getMonth() + 1}/${today
      .toDate()
      .getFullYear()}`,
  );

  let calories_data = Diaries.filter(e => {
    return e.date === date;
  });
  const [calories, setCalories] = useState({
    goal: calories_data[0].calories.goal,
    food:  calories_data[0].calories.food,
    exercise: calories_data[0].calories.exercise,
  });

  useEffect(() => {
    setTimeout(() => {
      setCalories({
        goal:  calories_data[0].calories.goal ,
        food:  calories_data[0].calories.food ,
        exercise:  calories_data[0].calories.exercise ,
      });
      setIsLoading(false);
    }, 2000);
  }, [date]);

  return (
    <View style={styles.root}>
      <CalendarStrip
        showMonth={false}
        scrollable
        style={{height: 70}}
        calendarColor={colors.PURE_WHITE}
        calendarHeaderStyle={{color: colors.PURE_WHITE}}
        dateNumberStyle={{color: colors.GREY, fontSize: 18, fontFamily: font.DEFAULT_FONT}}
        dateNameStyle={{color: colors.GREY, fontSize: 12, fontFamily: font.DEFAULT_FONT}}
        highlightDateNameStyle={{color: colors.BACK_GROUND_COLOR, fontSize: 14, fontFamily: font.DEFAULT_FONT, fontWeight: "900"}}
        highlightDateNumberStyle={{color: colors.BACK_GROUND_COLOR, fontSize: 20, fontFamily: font.DEFAULT_FONT, fontWeight: "900"}}
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
        ) : (
          <>
            <CaloriesRemaining
              goal={calories.goal}
              food={calories.food}
              exercise={calories.exercise}
            />
            <SafeAreaView style={styles.addingSection}>
              {/* <FlatList
                data={DATA}
                renderItem={({item}) => <DiaryItem item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              /> */}
              <ScrollView showsVerticalScrollIndicator={false} >
                <DiaryItem meal={"Breakfast"} />
                <DiaryItem meal={"Lunch"} />
                <DiaryItem meal={"Dinner"} />
                <DiaryItem meal={"Snacks"} />
                <DiaryItem meal={"Exercise"} />
                <DiaryItem meal={"Water"} />
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </View>
    </View>
  );
};

export default DiaryScreen;
