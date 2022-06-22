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
import {useToast} from 'react-native-toast-notifications';

const DetailExerciseScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const diary_id = context.diary.id;
  const exercise = route.params.exercise;
  const action = route.params.action;
  const [quantity, setQuantity] = useState(
    action === 'View' ? 1 : exercise.duration,
  );
  const [isAdded, setIsAdded] = useState(false);
  const daily_calories = 2800;
  const daily_carbs = 335;
  const daily_fat = 89;
  const daily_protein = 134;
  const benefits =
    'Running Improves Cardiovascular Health; Running Builds Muscular Strength; Running Increases Bone Density; Running Improves Markers of Health; Running Reduces Stress; Running Boosts Confidence; Running Burns Calories; Running Is Accessible; Running Improves Your Mood; Running Can Connect You to Nature; Running Can Be Social';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: action === 'Update' ? `Update Exercise` : `Add Exercise`,
      headerTintColor: colors.TEXT,
      headerStyle: {backgroundColor: colors.THEME},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity onPress={() => addFood()}>
            <Ionicons name="checkmark-outline" size={25} color={colors.TEXT} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, quantity, isAdded]);

  const addFood = async () => {
    if (action === 'View') {
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
          //setIsAdded(!isAdded);
          toast.show('Exercise logged successfully to your diary', {
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
    } else {
      try {
        const response = await fetch(
          `${context.BASE_URL}/api/diary/exercise/${exercise.id}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:
                'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
            },
            method: 'PUT',
            body: JSON.stringify({
              duration: quantity,
            }),
          },
        );
        const result = await response.json();
        if (result.status === 'OK') {
          //setIsAdded(!isAdded);
          toast.show('Exercise updated successfully to your diary', {
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
          alert('Error updating exercise');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.imageSection}>
        <Image
          style={styles.image}
          source={{
            uri:
              exercise.imageURL !== null
                ? `${exercise.imageURL}`
                : 'https://res.cloudinary.com/dxtozrwr9/image/upload/v1655346153/exercise_r0ajjo.jpg',
          }}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.name}>{exercise.name.split(', ')[0]}</Text>
        <Text style={styles.information}>
          {'  '}
          {exercise.name}
        </Text>
      </View>
      <View style={styles.others}>
        {/* <TouchableOpacity activeOpacity={0.5}> */}
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Duration (in minute)</Text>
          <QuantitySelector
            quantity={quantity}
            setQuantity={value => setQuantity(value)}
          />
        </View>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Calories burn</Text>
          <Text style={styles.servingSizeText}>
            {action === 'View'
              ? Math.round(exercise.calories * quantity)
              : Math.round((exercise.calories / exercise.duration) * quantity)}
          </Text>
        </View>
        {/* </TouchableOpacity> */}
      </View>
      {/* <View style={styles.others}>
        <View style={styles.childOthers}>
          <Text style={[styles.labelText, {fontWeight: '900'}]}>
            Benefit of Running
          </Text>
        </View>
        {benefits?.split('; ').map((benefit, index) => (
          <View key={index} style={styles.childBenefit}>
            <Text style={[styles.labelText, {marginBottom: 10}]}>
              {'  '}- {benefit}.
            </Text>
          </View>
        ))}
      </View> */}
    </ScrollView>
  );
};

export default DetailExerciseScreen;
