import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import QuantitySelector from '../../components/QuantitySelector';
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';

const NutritionUpdateScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  const route = useRoute();
  const [isAdded, setIsAdded] = useState(false);

  const [carbs, setCarbs] = useState(parseInt(user?.process.carbs));

  const [fat, setFat] = useState(parseInt(user?.process.fat));

  const [protein, setProtein] = useState(parseInt(user?.process.protein));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Carbs, Protein & Fat',
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
  }, [navigation, carbs, fat, protein]);

  const addFood = async () => {
    if (carbs + fat + protein < 100) {
      toast.show('Macronutrients must equal 100%', {
        type: 'warning',
        placement: 'bottom',
        duration: 1700,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        const response = await fetch(`${context.BASE_URL}/api/updateProcess`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
          },
          method: 'PUT',
          body: JSON.stringify({
            carbs: carbs,
            protein: protein,
            fat: fat,
          }),
        });
        const result = await response.json();
        if (result.status === 'OK') {
          toast.show('Change macronutrients successfully.', {
            type: 'success',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
          context.getUser();
          context.getDiary(moment().toDate().toISOString().split('T')[0]);
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.others}>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Calories</Text>
          <Text style={styles.servingSizeText}>{user?.process.calories}</Text>
        </View>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Carbohydrates</Text>
          <View style={[styles.textInput]}>
            <TextInput
              maxLength={2}
              placeholder={'%'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                if (value === '') {
                  setCarbs(0);
                } else setCarbs(parseInt(value));
              }}
              value={carbs.toString()}
            />
          </View>
          <Text style={styles.servingSizeText}>%</Text>
        </View>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Protein</Text>
          <View style={[styles.textInput]}>
            <TextInput
              maxLength={2}
              placeholder={'%'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                if (value === '') {
                  setProtein(0);
                } else setProtein(parseInt(value));
              }}
              value={protein.toString()}
            />
          </View>
          <Text style={styles.servingSizeText}>%</Text>
        </View>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Fat</Text>
          <View style={[styles.textInput]}>
            <TextInput
              maxLength={2}
              placeholder={'%'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                if (value === '') {
                  setFat(0);
                } else setFat(parseInt(value));
              }}
              value={fat.toString()}
            />
          </View>
          <Text style={styles.servingSizeText}>%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NutritionUpdateScreen;
