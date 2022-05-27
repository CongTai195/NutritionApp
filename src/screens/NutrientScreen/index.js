import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import font from '../../assets/fonts/font';
import {useFocusEffect} from '@react-navigation/native';
import {DataContext} from '../../context/Context';
import * as Progress from 'react-native-progress';
import {color} from 'react-native-reanimated';

const NutrientScreen = () => {
  const windowWidth = Dimensions.get('window').width;
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

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getNutrient = nutrient => {
    return food?.length > 0
      ? food?.reduce((total, food) => {
          return total + parseFloat(food[nutrient]);
        }, 0)
      : 0;
  };

  const calories_in = getNutrient('calories');
  const carbs = getNutrient('carbs');
  const fat = getNutrient('fat');
  const protein = getNutrient('protein');
  const cholesterol = getNutrient('cholesterol');
  const sodium = getNutrient('sodium');
  const calcium = getNutrient('calcium');
  const iron = getNutrient('iron');
  const potassium = getNutrient('potassium');
  const vitamin_D = getNutrient('vitamin_D');
  const vitamin_A = getNutrient('vitamin_A');
  const vitamin_C = getNutrient('vitamin_C');

  let nutrientArray = {
    calories: calories_in,
    carbs: carbs,
    fat: fat,
    protein: protein,
    cholesterol: cholesterol,
    sodium: sodium,
    calcium: calcium,
    iron: iron,
    potassium: potassium,
    vitamin_A: vitamin_A,
    vitamin_C: vitamin_C,
    vitamin_D: vitamin_D,
  };

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
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View
                  style={{
                    flex: 1,
                  }}></View>
                <View
                  style={{
                    flex: 1.3,
                    flexDirection: 'row',
                  }}>
                  <View style={styles.header}>
                    <Text style={styles.labelText}>Total</Text>
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.labelText}>Goal</Text>
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.labelText}>Left</Text>
                  </View>
                </View>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.others}>
                  {Object.keys(nutrientArray)?.map((item, index) =>
                    item === 'id' ? null : item === 'serving_size' ? null : (
                      <>
                        <View key={index} style={styles.childOthers}>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <Text style={styles.labelText}>
                              {capitalizeFirstLetter(item)}{' '}
                              {item === 'calories'
                                ? ' (cal)'
                                : item === 'carbs' ||
                                  item === 'protein' ||
                                  item === 'fat'
                                ? ' (g)'
                                : ' (mg)'}{' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1.3,
                              flexDirection: 'row',
                            }}>
                            <View style={styles.header}>
                              <Text style={styles.amountText}>
                                {Math.round(nutrientArray[item] * 10) / 10}{' '}
                              </Text>
                            </View>
                            <View style={styles.header}>
                              <Text style={styles.labelText}>134</Text>
                            </View>
                            <View style={styles.header}>
                              {134 >
                              Math.round(nutrientArray[item] * 10) / 10 ? (
                                <>
                                  <Text style={styles.labelText}>
                                    {134 -
                                      Math.round(nutrientArray[item] * 10) /
                                        10}{' '}
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <Text style={styles.enoughText}>ENOUGH</Text>
                                </>
                              )}
                            </View>
                          </View>
                        </View>
                        <View style={styles.progressBar}>
                          <Progress.Bar
                            borderColor={colors.GREY}
                            color={
                              item === 'calories'
                                ? colors.GREEN
                                : item === 'protein'
                                ? colors.RED_MEET
                                : item === 'carbs'
                                ? colors.ORANGE
                                : item === 'fat'
                                ? '#644678'
                                : colors.BACK_GROUND_COLOR
                            }
                            progress={
                              Math.round(nutrientArray[item] * 10) / 10 / 134
                            }
                            height={3}
                            width={null}
                          />
                        </View>
                      </>
                    ),
                  )}
                </View>
              </ScrollView>
            </SafeAreaView>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default NutrientScreen;
