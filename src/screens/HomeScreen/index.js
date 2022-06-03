import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CaloriesRemaining from '../../components/CaloriesRemaining';
import font from '../../assets/fonts/font';
import Month from '../../data/Months';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseCard from '../../components/ExerciseCard';
import Carousel from '../../components/Carousel';
import Card from '../../components/Card';

const headerImage = require('../../assets/images/defaultAvatar.png');
const notification = require('../../assets/images/Notification.png');
const carbs_image = require('../../assets/images/Carbon.jpg');
const meat = require('../../assets/images/Beef.jpg');
const fat_image = require('../../assets/images/fat.jpg');
const banner = require('../../assets/images/BG.png');
const fire = require('../../assets/images/fire.png');

const HomeScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const diary = context.diary_today;
  const calories = user.calories;
  const food = diary.food;
  const exercise = diary.exercise;
  const navigation = useNavigation();
  const date = `${moment().toDate().getDate()}/${
    moment().toDate().getMonth() + 1
  }/${moment().toDate().getFullYear()}`;
  const windowWidth = Dimensions.get('window').width;
  const [activeNutrientIndex, setActiveNutrientIndex] = React.useState(0);
  const [activeExercisesIndex, setActiveExercisesIndex] = React.useState(0);

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 6});

  const onNutrientUpdate = React.useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveNutrientIndex(viewableItems[0].index || 0);
    }
  }, []);

  const onExercisesUpdate = React.useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveExercisesIndex(viewableItems[0].index || 0);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Nutritious',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const calories_in =
    food?.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.calories);
        }, 0)
      : 0;
  const calories_out =
    exercise?.length > 0
      ? exercise.reduce((total, exercise) => {
          return total + parseFloat(exercise.calories);
        }, 0)
      : 0;
  const carbs =
    food?.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.carbs);
        }, 0)
      : 0;
  const fat =
    food?.length > 0
      ? food?.reduce((total, food) => {
          return total + parseFloat(food.fat);
        }, 0)
      : 0;
  const protein =
    food?.length > 0
      ? food.reduce((total, food) => {
          return total + parseFloat(food.protein);
        }, 0)
      : 0;

  let nutrientArray = [
    {
      id: 1,
      name: 'Carbs',
      mass: 100,
      status: carbs,
      image: carbs_image,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: colors.ORANGE,
    },
    {
      id: 2,
      name: 'Fat',
      mass: 100,
      status: fat,
      image: fat_image,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: '#644678',
    },
    {
      id: 3,
      name: 'Protein',
      mass: 100,
      status: protein,
      image: meat,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: colors.RED_MEET,
    },
  ];

  useEffect(() => {
    context.getDiary(date);
  }, [user]);
  const goal = 3000;

  return (
    <View style={styles.container}>
      {/* <View style={styles.screen}> */}
      <Header
        onPress={() => {
          navigation.navigate('More');
        }}
        onBellPress={() => {
          navigation.navigate('NotificationScreen');
        }}
        name={user.name}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Banner /> */}
        <CaloriesRemaining
          goal={calories}
          food={calories_in}
          exercise={calories_out}
          onPress={() => {
            navigation.navigate('Diary');
          }}
        />
        {/* </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 10,
            marginRight: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Label>Your Nutrients</Label>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NutrientScreen');
            }}>
            <Ionicons name="arrow-forward-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <Carousel
          data={nutrientArray}
          renderItem={({item, index}) => (
            // <View key={index}>
            <Card
              key={item.id}
              name={item.name}
              mass={item.mass}
              status={item.status}
              image={item.image}
              lightColor={item.lightColor}
              color={item.color}
              darkColor={item.darkColor}
            />
            // </View>
          )}
          snapToInterval={windowWidth - 5}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onNutrientUpdate.current}
          activeIndex={activeNutrientIndex}
          dotColor={colors.BACK_GROUND_COLOR}
        />

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 10,
            marginRight: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Label>Your Exercises</Label>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Diary');
            }}>
            <Ionicons name="arrow-forward-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
        {exercise?.length === 0 ? (
          <>
            <View
              style={{
                margin: 5,
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('Diary');
                  }}>
                  <Banner />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <Carousel
              data={exercise}
              renderItem={({item, index}) => (
                <ExerciseCard
                  onPress={() => {
                    navigation.navigate('DetailExerciseScreen', {
                      exercise: item,
                      action: 'Update',
                    });
                  }}
                  exercise={item}
                  key={index}
                />
              )}
              snapToInterval={windowWidth - 5}
              viewabilityConfig={viewConfigRef.current}
              onViewableItemsChanged={onExercisesUpdate.current}
              activeIndex={activeExercisesIndex}
              dotColor={colors.BACK_GROUND_COLOR}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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

const Banner = () => (
  <View style={[styles.card, {marginVertical: 5}]}>
    <ImageBackground
      imageStyle={{opacity: 1, borderRadius: 10}}
      style={{
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={require('../../assets/images/Banner.jpg')}>
      <View style={{alignSelf: 'center', margin: 5}}>
        <Text
          style={{
            fontFamily: font.DEFAULT_FONT,
            fontSize: 46,
            color: '#8193C6',
            fontWeight: '900',
          }}>
          Let's
        </Text>
      </View>
    </ImageBackground>
  </View>
);
