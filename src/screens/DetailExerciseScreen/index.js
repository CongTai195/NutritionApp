import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
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

const DetailExerciseScreen = () => {
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const diary_id = route.params.diaryId;
  const exercise = route.params.exercise;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const daily_calories = 2800;
  const daily_carbs = 335;
  const daily_fat = 89;
  const daily_protein = 134;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Add Exercise`,
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
  }, [navigation, quantity, isAdded]);

  const addFood = async () => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/diary/exercise`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          diary_id: diary_id,
          duration: quantity,
          exercise_id: exercise.id,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        setIsAdded(!isAdded);
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
  };
  return (
    <>
      {isAdded === false ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.imageSection}>
              <Image
                style={styles.image}
                source={{
                  uri: `${exercise.imageURL}`,
                }}
              />
            </View>
            <View style={styles.header}>
              <Text style={styles.name}>{exercise.name.split(' ')[0]}</Text>
              <Text style={styles.information}>{exercise.name}</Text>
            </View>
            <View style={styles.others}>
              {/* <TouchableOpacity activeOpacity={0.5}> */}
              <View style={styles.childOthers}>
                <Text style={styles.labelText}>Duration</Text>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={value => setQuantity(value)}
                />
              </View>
              <View style={styles.childOthers}>
                <Text style={styles.labelText}>Calories Burn</Text>
                <Text style={styles.servingSizeText}>
                  {Math.round(exercise.calories * quantity)}
                </Text>
              </View>
              {/* </TouchableOpacity> */}
            </View>
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

export default DetailExerciseScreen;
