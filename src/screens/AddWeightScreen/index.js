import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import SearchInput from '../../components/SearchInput';
import AddFoodItem from '../../components/AddFoodItem';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {color} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useToast} from 'react-native-toast-notifications';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const AddWeightScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const context = useContext(DataContext);
  const user = context?.user;
  const route = useRoute();
  const [date, setDate] = useState(new Date(route.params.date));
  const [weight, setWeight] = useState(0);

  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Weight Log`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            onPress={() => getDiary(date.toISOString().split('T')[0])}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, weight, date]);

  const createDiary = async date => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/diary`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          date: date,
          is_enough: 0,
          weight_log: weight,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        context.getWeight();
        toast.show('Weight logged successfully', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        const time = setTimeout(() => {
          navigation.navigate('HomeScreen');
        }, 1700);
        return () => clearTimeout(time);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDiary = async date => {
    try {
      const response = await fetch(
        `${context.BASE_URL}/api/diary/detail?date=${date}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
          },
        },
      );
      const result = await response.json();
      if (result.status === 'OK') {
        const diary_id = result.results.id;
        const action = await context.updateDiary(diary_id, {
          weight_log: weight,
        });
        if (action) {
          toast.show('Weight logged successfully', {
            type: 'success',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
          const time = setTimeout(() => {
            navigation.navigate('HomeScreen');
            context.getWeight();
            context.getUser();
          }, 1700);
          return () => clearTimeout(time);
        }
      }
      if (result.status === 'NG') {
        createDiary(date);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.others}>
        {/* <TouchableOpacity activeOpacity={0.5}> */}
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Weight Log</Text>
          <View style={[styles.textInput, {marginHorizontal: 15}]}>
            <TextInput
              maxLength={4}
              placeholder={`${user?.process?.current_weight} kg`}
              placeholderTextColor="#c4c4c4"
              style={styles.servingSizeText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                setWeight(value);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          activeOpacity={0.5}>
          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Date</Text>
            <Text style={styles.servingSizeText}>
              {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <DatePicker
          androidVariant="iosClone"
          maximumDate={moment().toDate()}
          minimumDate={new Date(user?.created_at)}
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default AddWeightScreen;
