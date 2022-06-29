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
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import image from '../../constants/image';

const CreateServingScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  const route = useRoute();
  const name = route?.params?.name;
  const detail = route?.params?.detail;
  const serving = route?.params?.serving;
  const diary_id = route?.params?.diary_id;
  const meal = route?.params?.meal;
  const [isAdded, setIsAdded] = useState(false);

  const [data, setData] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    cholesterol: 0,
    sodium: 0,
    calcium: 0,
    potassium: 0,
    iron: 0,
    vitamin_A: 0,
    vitamin_C: 0,
    vitamin_D: 0,
  });

  const formatDate = input => {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];
    return day + '/' + month + '/' + year;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Nutrition Fact',
      headerTintColor: colors.TEXT,
      headerStyle: {backgroundColor: colors.THEME},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            disabled={!(data.calories !== 0)}
            onPress={() => {
              createFood();
            }}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={data.calories === 0 ? colors.LIGHT_TEXT : colors.GREEN}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, data]);

  const createFood = async () => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/myFood`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          name: name,
          imageURL: image.DEFAULT_FOOD,
          detail: detail,
          serving_size_name: serving,
          calories: data.calories,
          carbs: data.carbs,
          fat: data.fat,
          protein: data.protein,
          cholesterol: data.cholesterol,
          calcium: data.calcium,
          potassium: data.potassium,
          sodium: data.sodium,
          iron: data.iron,
          vitamin_A: data.vitamin_A,
          vitamin_C: data.vitamin_C,
          vitamin_D: data.vitamin_D,
          diary_id: diary_id,
          quantity: 1,
          meal: meal,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        context.getMyFood();
        //setIsAdded(!isAdded);
        toast.show('Create food successfully', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        const time = setTimeout(() => {
          navigation.pop(3);
        }, 1700);
        return () => clearTimeout(time);
      } else {
        console.log(result);
        alert('Error adding food');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const array = [
    {
      id: 0,
      name: 'Calories',
      label: 'calories',
    },
    {
      id: 1,
      name: 'Total Fat (g)',
      label: 'fat',
    },
    {
      id: 2,
      name: 'Total Carbohydrates (g)',
      label: 'carbs',
    },
    {
      id: 3,
      name: 'Total Protein (g)',
      label: 'protein',
    },
    {
      id: 4,
      name: 'Cholesterol (mg)',
      label: 'cholesterol',
    },
    {
      id: 5,
      name: 'Potassium (mg)',
      label: 'potassium',
    },
    {
      id: 6,
      name: 'Sodium (mg)',
      label: 'sodium',
    },
    {
      id: 7,
      name: 'Calcium (mg)',
      label: 'calcium',
    },
    {
      id: 8,
      name: 'Iron (mg)',
      label: 'iron',
    },
    {
      id: 9,
      name: 'Vitamin A (mg)',
      label: 'vitamin_A',
    },
    {
      id: 10,
      name: 'Vitamin C (mg)',
      label: 'vitamin_C',
    },
    {
      id: 11,
      name: 'Vitamin D (mg)',
      label: 'vitamin_D',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {array?.map(item => (
        <View key={item.id} style={styles.othersSub}>
          <View style={styles.childOthersSub}>
            <Text style={styles.labelText}>{item.name}</Text>
            <View style={[styles.textInput]}>
              <TextInput
                maxLength={4}
                placeholder={item.id === 0 ? 'Required' : 'Optional'}
                keyboardType={'number-pad'}
                placeholderTextColor="#c4c4c4"
                style={styles.amountText}
                //value={weight.toString()}
                onChangeText={value => {
                  if (value === '') {
                    setData({...data, [item.label]: parseInt(0)});
                  } else setData({...data, [item.label]: parseInt(value)});
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CreateServingScreen;
