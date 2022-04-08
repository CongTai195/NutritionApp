import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import CustomDonutChart from '../../components/CustomDonutChart';
import QuantitySelector from '../../components/QuantitySelector';

const DetailFoodScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const route = useRoute();
  const food = route.params.food;
  const [quantity, setQuantity] = useState(1);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.information}>{food.detail}, {food.servingSize} g</Text>
      </View>
      <View style={styles.nutrition}>
        <View style={styles.chart}>
          <CustomDonutChart calories={food.calories.calories*quantity} carbs={food.calories.fromCarbs.percentage} fat={food.calories.fromFat.percentage} protein={food.calories.fromProtein.percentage} />
        </View>
        <View style={styles.nutritionDetail}>
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>{food.calories.fromCarbs.percentage}%</Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {food.calories.fromCarbs.mass*quantity} g
          </Text>
          <Text
            style={[
              {fontSize: 14, color: colors.GREEN},
              styles.textNutritionDetail,
            ]}>
            Carbs
          </Text>
        </View>
        <View style={styles.nutritionDetail}>
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>{food.calories.fromFat.percentage}%</Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {food.calories.fromFat.mass*quantity} g
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
          <Text style={[{fontSize: 14}, styles.textNutritionDetail]}>{food.calories.fromProtein.percentage}%</Text>
          <Text
            style={[
              {fontSize: 16, color: 'black'},
              styles.textNutritionDetail,
            ]}>
            {food.calories.fromProtein.mass*quantity} g
          </Text>
          <Text
            style={[
              {fontSize: 14, color: colors.YELLOW},
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
      </View>
    </View>
  );
};

export default DetailFoodScreen;
