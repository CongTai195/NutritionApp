import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {color} from 'react-native-reanimated';
import {useToast} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddWaterScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const diaryId = route.params.diaryId;
  const [amount, setAmount] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Water`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            disabled={!(amount !== 0)}
            onPress={() => addWater()}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={amount === 0 ? colors.GREY : colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, amount]);

  const addWater = async () => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/water`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          diary_id: diaryId,
          amount: amount,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        context.updateWaterAmount(amount);
        //setIsAdded(true);
        toast.show('Add water successfully to your diary', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        setTimeout(() => {
          navigation.pop(1);
        }, 1700);
        return () => clearTimeout(time);
      } else {
        alert('Error adding water');
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image
          style={styles.image}
          source={require('../../assets//images/bottle.jpg')}
        />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={[styles.textInput, {marginHorizontal: 15}]}>
            <TextInput
              maxLength={4}
              style={[styles.textTextInput]}
              keyboardType={'numeric'}
              value={amount.toString()}
              onChangeText={value => {
                if (value === '') {
                  setAmount(parseInt(0));
                } else setAmount(parseInt(value));
              }}
            />
          </View>
          <Text
            style={[
              styles.textTextInput,
              {
                position: 'absolute',
                left: Dimensions.get('window').width / 2 + 75,
                top: 25,
              },
            ]}>
            ml
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setAmount(amount + 250);
            }}
            activeOpacity={0.7}>
            <View style={[styles.textInput, {marginHorizontal: 15}]}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                value={'+250 ml'}
                style={[styles.textTextInput]}
                keyboardType={'numeric'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(amount + 500);
            }}
            activeOpacity={0.7}>
            <View style={[styles.textInput, {marginHorizontal: 15}]}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                value={'+500 ml'}
                style={[styles.textTextInput]}
                keyboardType={'numeric'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(amount + 1000);
            }}
            activeOpacity={0.7}>
            <View style={[styles.textInput, {marginHorizontal: 15}]}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                value={'+1000 ml'}
                style={[styles.textTextInput]}
                keyboardType={'numeric'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddWaterScreen;
