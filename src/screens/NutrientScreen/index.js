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
  const calories = diary?.process.calories;
  const total_fat = Math.round((calories * diary?.process?.fat) / 100 / 9);
  const total_carbs = Math.round((calories * diary?.process?.carbs) / 100 / 4);
  const total_protein = Math.round(
    (calories * diary?.process?.protein) / 100 / 4,
  );
  const total_cholesterol = diary?.process?.cholesterol;
  const total_sodium = diary?.process?.sodium;
  const total_potassium = diary?.process?.potassium;
  const total_calcium = diary?.process?.calcium;
  const total_iron = diary?.process?.iron;
  const total_vitaminA = diary?.process?.vitamin_A;
  const total_vitaminC = diary?.process?.vitamin_C;
  const total_vitaminD = diary?.process?.vitamin_D;

  const breakfast = food?.filter(e => e.meal === 'Breakfast');
  const lunch = food?.filter(e => e.meal === 'Lunch');
  const dinner = food?.filter(e => e.meal === 'Dinner');
  const exercise = diary?.exercise;

  const [date, setDate] = useState(today.toDate().toISOString().split('T')[0]);

  console.log(diary);

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

  let array = [
    {
      id: 0,
      name: 'Calories (cal)',
      amount: calories_in,
      goal: calories,
      left: calories - calories_in,
    },
    {
      id: 1,
      name: 'Carbs (g)',
      amount: carbs,
      goal: total_carbs,
      left: total_carbs - carbs,
    },
    {
      id: 2,
      name: 'Fat (g)',
      amount: fat,
      goal: total_fat,
      left: total_fat - fat,
    },
    {
      id: 3,
      name: 'Protein (g)',
      amount: protein,
      goal: total_protein,
      left: total_protein - protein,
    },
    {
      id: 4,
      name: 'Cholesterol (mg)',
      amount: cholesterol,
      goal: total_cholesterol,
      left: total_cholesterol - cholesterol,
    },
    {
      id: 5,
      name: 'Sodium (mg)',
      amount: sodium,
      goal: total_sodium,
      left: total_sodium - sodium,
    },
    {
      id: 6,
      name: 'Calcium (mg)',
      amount: calcium,
      goal: total_calcium,
      left: total_calcium - calcium,
    },
    {
      id: 7,
      name: 'Iron (mg)',
      amount: iron,
      goal: total_iron,
      left: total_iron - iron,
    },
    {
      id: 8,
      name: 'Potassium (mg)',
      amount: potassium,
      goal: total_potassium,
      left: total_potassium - potassium,
    },
    {
      id: 9,
      name: 'Vitamin A',
      amount: vitamin_A,
      goal: total_vitaminA,
      left: total_vitaminA - vitamin_A,
    },
    {
      id: 10,
      name: 'Vitamin C',
      amount: vitamin_C,
      goal: total_vitaminC,
      left: total_vitaminC - vitamin_C,
    },
    {
      id: 11,
      name: 'Vitamin D',
      amount: vitamin_D,
      goal: total_vitaminD,
      left: total_vitaminD - vitamin_D,
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      context.getDiary(date);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, [date, navigation]),
  );

  return (
    <View style={styles.root}>
      <CalendarStrip
        showMonth={true}
        scrollable={false}
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
        minDate={context.user?.created_at}
        useIsoWeekday={false}
        //datesWhitelist={[{start: moment('2021-01-01'), end: moment()}]}
        //startingDate={moment().subtract(3, 'days')}
        onDateSelected={dateSelected => {
          setIsLoading(true);
          setDate(dateSelected.toDate().toISOString().split('T')[0]);
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
                  {array.map((item, index) => (
                    <>
                      <View style={styles.childOthers}>
                        <View
                          style={{
                            flex: 1,
                          }}>
                          <Text style={styles.labelText}>{item.name}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1.3,
                            flexDirection: 'row',
                          }}>
                          <View style={styles.header}>
                            <Text style={styles.amountText}>
                              {Math.round(item.amount * 10) / 10}{' '}
                            </Text>
                          </View>
                          <View style={styles.header}>
                            <Text style={styles.labelText}>{item.goal}</Text>
                          </View>
                          <View style={styles.header}>
                            {item.left > 0 ? (
                              <>
                                <Text style={styles.labelText}>
                                  {item.left}
                                </Text>
                              </>
                            ) : (
                              <>
                                {(item.left / item.goal) * 100 < -10 ? (
                                  <>
                                    <Text style={styles.tooMuchText}>
                                      redundant
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <Text style={styles.enoughText}>
                                      Enough
                                    </Text>
                                  </>
                                )}
                              </>
                            )}
                          </View>
                        </View>
                      </View>
                      <View style={styles.progressBar}>
                        <Progress.Bar
                          borderColor={colors.GREY}
                          color={
                            item.id === 0
                              ? colors.GREEN
                              : item.id === 3
                              ? colors.RED_MEET
                              : item.id === 1
                              ? colors.ORANGE
                              : item.id === 2
                              ? '#644678'
                              : colors.BACK_GROUND_COLOR
                          }
                          progress={
                            Math.round(item.amount * 10) / 10 / item.goal
                          }
                          height={3}
                          width={null}
                        />
                      </View>
                    </>
                  ))}
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
