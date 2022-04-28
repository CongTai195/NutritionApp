import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import CustomDonutChart from '../../components/CustomDonutChart';
import QuantitySelector from '../../components/QuantitySelector';
import * as Progress from 'react-native-progress';
import {Picker} from '@react-native-picker/picker';

const DetailFoodScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const route = useRoute();
  const food = route.params.food;
  const diaryId = route.params.diaryId;
  const meal = route.params.meal;
  const [quantity, setQuantity] = useState(1);
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const nutrition_facts_array = food.nutrition_facts;
  const daily_calories = 2800;
  const daily_carbs = 335;
  const daily_fat = 89;
  const daily_protein = 134;

  const [selectedServingSize, setSelectedServingSize] = useState(
    nutrition_facts_array[0].serving_size,
  );

  const nutrition_facts = nutrition_facts_array.find(e => {
    return e.serving_size == selectedServingSize;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Add Food`,
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
  }, [navigation, quantity, nutrition_facts]);

  const addFood = async () => {
    try {
      const response = await fetch(`${BASE_URL}diary/food`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
        navigation.navigate('DiaryScreen');
      } else {
        alert('Error adding food');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
        <View style={styles.nutritionDetail}>
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
            {food.fromCarbs}%
          </Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {Math.round(nutrition_facts.carbs * quantity * 10) / 10} g
          </Text>
          <Text
            style={[
              {fontSize: 14, color: colors.YELLOW},
              styles.textNutritionDetail,
            ]}>
            Carbs
          </Text>
        </View>

        <View style={styles.nutritionDetail}>
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
            {food.fromFat}%
          </Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {Math.round(nutrition_facts.fat * quantity * 10) / 10} g
          </Text>
          <Text
            style={[
              {fontSize: 14, color: colors.PURPLE},
              styles.textNutritionDetail,
            ]}>
            Fat
          </Text>
        </View>

        <View style={styles.nutritionDetail}>
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
            {food.fromProtein}%
          </Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {Math.round(nutrition_facts.protein * quantity * 10) / 10} g
          </Text>
          <Text
            style={[
              {fontSize: 14, color: colors.BLUE},
              styles.textNutritionDetail,
            ]}>
            Protein
          </Text>
        </View>
      </View>

      <View style={styles.others}>
        {/* <TouchableOpacity activeOpacity={0.5}> */}
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Serving Size</Text>
          <Text style={styles.servingSizeText}>{selectedServingSize}</Text>
          <Picker
            style={{height: 50, width: 50}}
            useNativeAndroidPickerStyle={false}
            selectedValue={selectedServingSize}
            onValueChange={itemValue => setSelectedServingSize(itemValue)}>
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
            <View style={styles.progressBar}>
              <Progress.Bar
                borderColor={colors.GREY}
                color={colors.GREEN}
                progress={
                  (nutrition_facts.calories * quantity) / daily_calories
                }
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  {Math.round(
                    ((nutrition_facts.calories * quantity) / daily_calories) *
                      100,
                  )}
                  %
                </Text>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  Calories
                </Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <Progress.Bar
                borderColor={colors.GREY}
                color={colors.YELLOW}
                progress={(nutrition_facts.carbs * quantity) / daily_carbs}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  {Math.round(
                    ((nutrition_facts.carbs * quantity) / daily_carbs) * 100,
                  )}
                  %
                </Text>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  Carbs
                </Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <Progress.Bar
                borderColor={colors.GREY}
                color={colors.PURPLE}
                progress={(nutrition_facts.fat * quantity) / daily_fat}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  {Math.round(
                    ((nutrition_facts.fat * quantity) / daily_fat) * 100,
                  )}
                  %
                </Text>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  Fat
                </Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <Progress.Bar
                borderColor={colors.GREY}
                color={colors.BLUE}
                progress={(nutrition_facts.protein * quantity) / daily_protein}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  {Math.round(
                    ((nutrition_facts.protein * quantity) / daily_protein) *
                      100,
                  )}
                  %
                </Text>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  Protein
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setShowNutritionFacts(!showNutritionFacts)}
        activeOpacity={0.5}>
        {showNutritionFacts ? (
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: 'black', marginHorizontal: 5}}>
              Hide Nutrition Facts
            </Text>
            <Ionicons name="chevron-up-outline" size={20} color="black" />
          </View>
        ) : (
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: 'black', marginHorizontal: 5}}>
              Show Nutrition Facts
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color="black" />
          </View>
        )}
      </TouchableOpacity>
      {showNutritionFacts ? (
        <View style={styles.others}>
          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Calories</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.calories * quantity * 10) / 10} cal
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Total Fat</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.fat * quantity * 10) / 10} g
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Cholesterol</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.cholesterol * quantity * 10) / 10} mg
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Sodium</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.sodium * quantity * 10) / 10} mg
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Total Carbohydrates</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.carbs * quantity * 10) / 10} g
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Protein</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.protein * quantity * 10) / 10} g
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Vitamin D</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.vitamin_D * quantity * 10) / 10}
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Calcium</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.calcium * quantity * 10) / 10} %
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Iron</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.iron * quantity * 10) / 10} %
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Potassium</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.potassium * quantity * 10) / 10} mg
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Vitamin A</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.vitamin_A * quantity * 10) / 10} %
            </Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Vitamin C</Text>
            <Text style={styles.amountText}>
              {Math.round(nutrition_facts.vitamin_C * quantity * 10) / 10} %
            </Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default DetailFoodScreen;
