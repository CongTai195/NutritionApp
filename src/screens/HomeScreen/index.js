import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
  FlatList,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import axios from 'axios';
import {ENV} from '../../constants/ENV';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CaloriesRemaining from '../../components/CaloriesRemaining';
import font from '../../assets/fonts/font';
import * as Progress from 'react-native-progress';
import {useFocusEffect} from '@react-navigation/native';
import Token from '../../data/Token';
import Month from '../../data/Months';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headerImage = require('../../assets/images/defaultAvatar.png');
const notification = require('../../assets/images/Notification.png');
const next = require('../../assets/images/next.png');
const carbs_image = require('../../assets/images/carbs.png');
const meat = require('../../assets/images/meat.png');
const fat_image = require('../../assets/images/fat.png');

const HomeScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const [isLoading, setLoading] = useState(false);
  //const [food, setFood] = useState({});
  const food = context.food_diary_today;
  const exercise = context.exercise_diary_today;
  //const [data, setData] = useState([]);
  const navigation = useNavigation();
  const date = `${moment().toDate().getDate()}/${
    moment().toDate().getMonth() + 1
  }/${moment().toDate().getFullYear()}`;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Nutritious',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={styles.iconNotification}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Ionicons
              name="notifications"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const calories_in =
    food.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.calories);
        }, 0)
      : 0;
  const calories_out =
    exercise.length > 0
      ? exercise.reduce((total, exercise) => {
          return total + parseFloat(exercise.calories);
        }, 0)
      : 0;
  const carbs =
    food.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.carbs);
        }, 0)
      : 0;
  const fat =
    food.length > 0
      ? food?.reduce((total, food) => {
          return total + parseFloat(food.fat);
        }, 0)
      : 0;
  const protein =
    food.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.protein);
        }, 0)
      : 0;

  const creatDiary = async () => {
    try {
      const response = await fetch(`${BASE_URL}diary`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          date: date,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        setFood({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDiary = async () => {
    try {
      const response = await fetch(`${BASE_URL}diary/detail?date=${date}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
      });
      const result = await response.json();
      if (result.status === 'OK') {
        setFood(result.results.food);
      }
      if (result.status === 'NG') {
        creatDiary();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('call');
  //     context.getDiary(date);
  //   }, []),
  // );
  useEffect(() => {
    console.log('call');
    context.getDiary(date);
  }, [user]);
  const goal = 3000;
  //const food = 0;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.screen}>
            <Header
              onPress={() => {
                navigation.navigate('More');
              }}
              onBellPress={() => {
                navigation.navigate('NotificationScreen');
              }}
              name={user.name}
            />
            {/* <Banner /> */}
            <CaloriesRemaining
              goal={goal}
              food={calories_in}
              exercise={calories_out}
              onPress={() => {
                navigation.navigate('Diary');
              }}
            />
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Label>Your Nutrients</Label>
            <View style={{flexDirection: 'row'}}>
              <Card
                name={'Carbs'}
                mass={100}
                status={carbs}
                image={carbs_image}
                lightColor="#f8e4d9"
                color="#fcf1ea"
                darkColor="#fac5a4"
              />
              <Card
                name={'Fat'}
                mass={100}
                status={fat}
                image={fat_image}
                lightColor="#dad5fe"
                color="#e7e3ff"
                darkColor="#8860a2"
              />
              <Card
                name={'Protein'}
                mass={100}
                status={protein}
                image={meat}
                lightColor="#d7f0f7"
                color="#e8f7fc"
                darkColor="#aceafc"
              />
            </View>
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Label>Your Water</Label>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const Card = ({name, status, image, mass, lightColor, color, darkColor}) => {
  return (
    <View
      style={{
        flex: 1,
        height: 150,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: color,
        justifyContent: 'space-between',
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image source={image} style={{height: 25, width: 25}} />
        <Text
          style={{
            color: colors.BLACK,
            fontFamily: font.DEFAULT_FONT,
            fontWeight: '500',
          }}>
          {mass} g
        </Text>
      </View>
      <View style={{alignSelf: 'center', margin: 5}}>
        <Progress.Circle
          size={50}
          progress={status / 100}
          showsText
          unfilledColor="#ededed"
          borderColor="#ededed"
          color={darkColor}
          direction="counter-clockwise"
          fill="white"
          strokeCap="round"
          thickness={5}
          style={{
            shadowColor: 'grey',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 1,
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            fontWeight: 'bold',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: font.DEFAULT_FONT,
            fontSize: 16,
            color: 'black',
            fontWeight: '100',
          }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const Label = ({children}) => <Text style={styles.label}>{children}</Text>;

const Header = ({onPress, onBellPress, name}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onPress}>
      <ImageContainer image={headerImage} />
    </TouchableOpacity>
    <HeaderTitle name={name} />
    <View style={styles.iconNotification}>
      <TouchableOpacity onPress={onBellPress}>
        <Ionicons name="notifications-outline" size={25} color={colors.BLACK} />
      </TouchableOpacity>
    </View>
  </View>
);

const ImageContainer = ({image, height = '100%', width = '100%'}) => (
  <View style={styles.imageContainer}>
    <Image source={image} style={[{height, width}]} />
  </View>
);

const HeaderTitle = ({name}) => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hi, {name}</Text>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.smallTitle}>{`${
        Month[moment().toDate().getMonth()]
      }`}</Text>
      <Text style={styles.smallTitle}>{` ${moment().toDate().getDate()}`}</Text>
      <Text style={styles.smallerTitle}>
        {moment().toDate().getDate() === 1
          ? 'st'
          : moment().toDate().getDate() === 2
          ? 'nd'
          : moment().toDate().getDate() === 3
          ? 'rd'
          : 'th'}
      </Text>
    </View>
  </View>
);

// const data = [
//   {
//     name: 'Carbs',
//     status: 85,
//     image: cycle,
//     lightColor: '#f8e4d9',
//     color: '#fcf1ea',
//     darkColor: '#fac5a4',
//   },
//   {
//     name: 'Protein',
//     status: 36,
//     image: walk,
//     lightColor: '#d7f0f7',
//     color: '#e8f7fc',
//     darkColor: '#aceafc',
//   },
//   {
//     name: 'Fat',
//     status: 86,
//     image: yoga,
//     lightColor: '#dad5fe',
//     color: '#e7e3ff',
//     darkColor: '#8860a2',
//   },
// ];

// const Banner = () => (
//   <>
//     <ImageBackground style={styles.banner} source={banner}>
//       <View style={styles.bannerContainer}>
//         <View style={styles.rowLabel}>
//           <View style={styles.fireContainer}>
//             <Image
//               source={fire}
//               resizeMode="contain"
//               style={styles.fireImage}
//             />
//           </View>
//           <Text style={styles.offer}>limited offer</Text>
//         </View>
//         <OfferText>30% Discount</OfferText>
//         <OfferText>Flash Sales</OfferText>
//       </View>
//     </ImageBackground>
//     <Image source={model} style={styles.model} resizeMode="contain" />
//   </>
// );
