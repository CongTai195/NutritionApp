import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import CustomDonutChart from '../../components/CustomDonutChart';
import QuantitySelector from '../../components/QuantitySelector';
import * as Progress from 'react-native-progress';
import {Picker} from '@react-native-picker/picker';
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {useToast} from 'react-native-toast-notifications';

const DetailFoodScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const food = route.params.food;
  const diaryId = context.diary.id;
  const meal = route.params.meal;
  const action = route.params.action;
  const [quantity, setQuantity] = useState(
    action === 'Update' ? route.params.quantity : 1,
  );
  const [isAdded, setIsAdded] = useState(false);
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const nutrition_facts_array = food.nutrition_facts;
  const daily_calories = 2800;
  const daily_carbs = 335;
  const daily_fat = 89;
  const daily_protein = 134;

  const [selectedServingSize, setSelectedServingSize] = useState(
    action === 'Update'
      ? route.params.serving_size
      : nutrition_facts_array[0].serving_size,
  );

  const nutrition_facts = nutrition_facts_array.find(e => {
    return e.serving_size == selectedServingSize;
  });

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: action === 'Update' ? `Update Food` : `Add Food`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity onPress={() => addFood()}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, quantity, nutrition_facts, isAdded]);

  const addFood = async () => {
    if (action === 'Update') {
      try {
        const response = await fetch(
          `${context.BASE_URL}/api/diary/food/${route.params.food_detail_id}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:
                'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
            },
            method: 'PUT',
            body: JSON.stringify({
              serving_size_food_id: nutrition_facts.id,
              quantity: quantity,
            }),
          },
        );
        const result = await response.json();
        if (result.status === 'OK') {
          //setIsAdded(!isAdded);
          toast.show('Food updated successfully to your diary', {
            type: 'success',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
          const time = setTimeout(() => {
            navigation.navigate('DiaryScreen');
          }, 1700);
          return () => clearTimeout(time);
        } else {
          console.log(result);
          alert('Error updating food');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(`${context.BASE_URL}/api/diary/food`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
          },
          method: 'POST',
          body: JSON.stringify({
            diary_id: diaryId,
            serving_size_food_id: nutrition_facts.id,
            quantity: quantity,
            meal: meal,
          }),
        });
        const result = await response.json();
        if (result.status === 'OK') {
          //setIsAdded(!isAdded);
          toast.show('Food logged successfully to your diary', {
            type: 'success',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
          const time = setTimeout(() => {
            navigation.navigate('DiaryScreen');
          }, 1700);
          return () => clearTimeout(time);
        } else {
          console.log(result);
          alert('Error adding food');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {isAdded === false ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.imageSection}>
              <Image style={styles.image} source={{uri: `${food.imageURL}`}} />
            </View>
            <View style={styles.header}>
              <Text style={styles.name}>{food.name}</Text>
              <Text style={styles.information}>
                {food.detail}, {selectedServingSize}
              </Text>
            </View>
            <View style={styles.nutrition}>
              <View style={styles.chart}>
                <CustomDonutChart
                  calories={nutrition_facts.calories * quantity}
                  carbs={food.fromCarbs}
                  fat={food.fromFat}
                  protein={food.fromProtein}
                />
              </View>
              {Object.keys(food)?.map((item, index) =>
                item === 'fromCarbs' ||
                item === 'fromFat' ||
                item === 'fromProtein' ? (
                  <View key={index} style={styles.nutritionDetail}>
                    <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                      {food[item]}%
                    </Text>
                    <Text
                      style={[
                        {fontSize: 16, color: 'black'},
                        styles.textNutritionDetail,
                      ]}>
                      {item === 'fromCarbs'
                        ? Math.round(nutrition_facts.carbs * quantity * 10) / 10
                        : item === 'fromFat'
                        ? Math.round(nutrition_facts.fat * quantity * 10) / 10
                        : Math.round(nutrition_facts.protein * quantity * 10) /
                          10}
                      g
                    </Text>
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          color:
                            item === 'fromCarbs'
                              ? colors.YELLOW
                              : item === 'fromFat'
                              ? colors.PURPLE
                              : colors.RED_MEET,
                        },
                        styles.textNutritionDetail,
                      ]}>
                      {item === 'fromCarbs'
                        ? 'Carbs'
                        : item === 'fromFat'
                        ? 'Fat'
                        : 'Protein'}
                    </Text>
                  </View>
                ) : null,
              )}
            </View>

            <View style={styles.others}>
              {/* <TouchableOpacity activeOpacity={0.5}> */}
              <View style={styles.childOthers}>
                <Text style={styles.labelText}>Serving Size</Text>
                <Text style={styles.servingSizeText}>
                  {selectedServingSize}
                </Text>
                <Picker
                  style={{height: 50, width: 50}}
                  useNativeAndroidPickerStyle={false}
                  selectedValue={selectedServingSize}
                  onValueChange={itemValue =>
                    setSelectedServingSize(itemValue)
                  }>
                  {nutrition_facts_array.map((element, index) => (
                    <Picker.Item
                      key={index}
                      label={element.serving_size.toString()}
                      value={element.serving_size.toString()}
                    />
                  ))}
                </Picker>
              </View>
              {/* </TouchableOpacity> */}
              <View style={styles.childOthers}>
                <Text style={styles.labelText}>Number of Servings</Text>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={value => setQuantity(value)}
                />
              </View>
              <View style={styles.percent}>
                <Text style={styles.labelText}>Percent of Daily Goals</Text>
                <View style={{flexDirection: 'row'}}>
                  {Object.keys(nutrition_facts)?.map((item, index) =>
                    item === 'calories' ||
                    item === 'carbs' ||
                    item === 'protein' ||
                    item === 'fat' ? (
                      <View key={index} style={styles.progressBar}>
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
                            (nutrition_facts[item] * quantity) /
                            (item === 'calories'
                              ? daily_calories
                              : item === 'protein'
                              ? daily_protein
                              : item === 'carbs'
                              ? daily_carbs
                              : daily_fat)
                          }
                          width={null}
                        />
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Text
                            style={[
                              {fontSize: 14},
                              styles.textNutritionDetail,
                            ]}>
                            {Math.round(
                              ((nutrition_facts[item] * quantity) /
                                (item === 'calories'
                                  ? daily_calories
                                  : item === 'protein'
                                  ? daily_protein
                                  : item === 'carbs'
                                  ? daily_carbs
                                  : daily_fat)) *
                                100,
                            )}
                            %
                          </Text>
                          <Text
                            style={[
                              {fontSize: 14},
                              styles.textNutritionDetail,
                            ]}>
                            {item === 'calories'
                              ? 'Calories'
                              : item === 'protein'
                              ? 'Protein'
                              : item === 'carbs'
                              ? 'Carbs'
                              : 'Fat'}
                          </Text>
                        </View>
                      </View>
                    ) : null,
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setShowNutritionFacts(!showNutritionFacts)}
              activeOpacity={0.5}>
              {showNutritionFacts ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', marginHorizontal: 5}}>
                    Hide Nutrition Facts
                  </Text>
                  <Ionicons name="chevron-up-outline" size={20} color="black" />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', marginHorizontal: 5}}>
                    Show Nutrition Facts
                  </Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color="black"
                  />
                </View>
              )}
            </TouchableOpacity>
            {showNutritionFacts ? (
              <View style={styles.others}>
                {Object.keys(nutrition_facts)?.map((item, index) =>
                  item === 'id' ? null : item === 'serving_size' ? null : (
                    <View key={index} style={styles.childOthers}>
                      <Text style={styles.labelText}>
                        {capitalizeFirstLetter(item)}
                      </Text>
                      <Text style={styles.amountText}>
                        {Math.round(nutrition_facts[item] * quantity * 10) / 10}{' '}
                        {item === 'calories'
                          ? 'cal'
                          : item === 'carbs' ||
                            item === 'protein' ||
                            item === 'fat'
                          ? 'g'
                          : 'mg'}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            ) : null}
          </ScrollView>
        </>
      ) : (
        <>
          <View style={{flex: 1}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <AnimatedLottieView
                style={{height: 100, alignSelf: 'center'}}
                autoPlay
                source={require('../../assets/lottie/91001-success.json')}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default DetailFoodScreen;
