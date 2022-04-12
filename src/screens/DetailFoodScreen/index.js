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

const DetailFoodScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const route = useRoute();
  const food = route.params.food;
  const [quantity, setQuantity] = useState(1);
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Add Food`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.information}>
          {food.detail}, {food.servingSize} g
        </Text>
      </View>
      <View style={styles.nutrition}>
        <View style={styles.chart}>
          <CustomDonutChart
            calories={food.calories.calories * quantity}
            carbs={food.calories.fromCarbs.percentage}
            fat={food.calories.fromFat.percentage}
            protein={food.calories.fromProtein.percentage}
          />
        </View>
        <View style={styles.nutritionDetail}>
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
            {food.calories.fromCarbs.percentage}%
          </Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {food.calories.fromCarbs.mass * quantity} g
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
            {food.calories.fromFat.percentage}%
          </Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {food.calories.fromFat.mass * quantity} g
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
            {food.calories.fromProtein.percentage}%
          </Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {food.calories.fromProtein.mass * quantity} g
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
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Serving Size</Text>
            <Text style={styles.amountText}>{food.servingSize} g</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Number of Servings</Text>
            {/* <TextInput value={quantity.toString()} onChangeText={quantity => setQuantity(quantity)} /> */}
            {/* <Text style={styles.amountText}>{quantity}</Text> */}
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </View>
        </TouchableOpacity>
        <View style={styles.percent}>
          <Text style={styles.labelText}>Percent of Daily Goals</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.progressBar}>
              <Progress.Bar
                borderColor={colors.GREY}
                color={colors.GREEN}
                progress={0.13}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  13%
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
                progress={0.0}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  0%
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
                progress={0.09}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  9%
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
                progress={0.17}
                width={null}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>
                  17%
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
            <Text style={{color: 'black', marginHorizontal: 5}}>Hide Nutrition Facts</Text>
            <Ionicons name="chevron-up-outline" size={20} color="black" />
          </View>
        ) : (
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: 'black', marginHorizontal: 5}}>Show Nutrition Facts</Text>
            <Ionicons name="chevron-down-outline" size={20} color="black" />
          </View>
        )}
      </TouchableOpacity>
      {showNutritionFacts ? (
        <View style={styles.others}>
          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Calories</Text>
            <Text style={styles.amountText}>170</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Total Fat</Text>
            <Text style={styles.amountText}>8 g</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Cholesterol</Text>
            <Text style={styles.amountText}>70 mg</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Sodium</Text>
            <Text style={styles.amountText}>75 mg</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Total Carbohydrates</Text>
            <Text style={styles.amountText}>0 g</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Protein</Text>
            <Text style={styles.amountText}>23 g</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Vitamin D</Text>
            <Text style={styles.amountText}>-</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Calcium</Text>
            <Text style={styles.amountText}>0 %</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Iron</Text>
            <Text style={styles.amountText}>15 %</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Potassium</Text>
            <Text style={styles.amountText}>0 mg</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Vitamin A</Text>
            <Text style={styles.amountText}>0 %</Text>
          </View>

          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Vitamin C</Text>
            <Text style={styles.amountText}>0 %</Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default DetailFoodScreen;
