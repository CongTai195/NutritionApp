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

const CreateExerciseScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  const route = useRoute();
  const diary_id = route.params.diaryId;
  const [isAdded, setIsAdded] = useState(false);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const formatDate = input => {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];
    return day + '/' + month + '/' + year;
  };

  const createExercise = async () => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/myExercise`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          diary_id: diary_id,
          name: name,
          duration: duration,
          calories: calories,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        context.getMyExercise();
        //setIsAdded(!isAdded);
        toast.show('Create exercise successfully', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        const time = setTimeout(() => {
          navigation.pop(2);
        }, 500);
        return () => clearTimeout(time);
      } else {
        console.log(result);
        alert('Error adding exercise');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Exercise',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            disabled={!(name !== '' && duration !== '' && calories !== '')}
            onPress={() => {
              createExercise();
            }}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, name, calories, duration]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.others}>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Description</Text>

          <View style={[styles.textInput]}>
            <TextInput
              placeholder={'Required'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              //value={weight.toString()}
              onChangeText={value => {
                setName(value);
              }}
            />
          </View>
        </View>

        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Duration (in minute)</Text>
          <View style={[styles.textInput]}>
            <TextInput
              placeholder={'Required'}
              keyboardType={'numeric'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              //value={weight.toString()}
              onChangeText={value => {
                setDuration(value);
              }}
            />
          </View>
        </View>

        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Calories Burned</Text>
          <View style={[styles.textInput]}>
            <TextInput
              placeholder={'Required'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                setCalories(value);
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateExerciseScreen;
