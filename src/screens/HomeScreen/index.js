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
import * as Progress from 'react-native-progress';
import ExerciseCard from '../../components/ExerciseCard';

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
  const food = diary.food;
  const exercise = diary.exercise;
  const navigation = useNavigation();
  const date = `${moment().toDate().getDate()}/${
    moment().toDate().getMonth() + 1
  }/${moment().toDate().getFullYear()}`;
  const windowWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onFlatListUpdate = React.useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);

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
          goal={goal}
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
        <View
          style={{
            margin: 5,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView
            snapToInterval={windowWidth - 6}
            snapToAlignment="center"
            horizontal
            decelerationRate={'fast'}
            view
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Card
                name={'Carbs'}
                mass={100}
                status={carbs}
                image={carbs_image}
                lightColor="#f8e4d9"
                color="#fcf1ea"
                darkColor={colors.ORANGE}
              />
            </View>
            <View>
              <Card
                name={'Fat'}
                mass={100}
                status={fat}
                image={fat_image}
                lightColor="#dad5fe"
                color="#e7e3ff"
                darkColor="#644678"
              />
            </View>
            <View>
              <Card
                name={'Protein'}
                mass={100}
                status={protein}
                image={meat}
                lightColor="#d7f0f7"
                color="#e8f7fc"
                darkColor={colors.RED_MEET}
              />
            </View>
          </ScrollView>
        </View>

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
        <View
          style={{
            margin: 5,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {exercise?.length === 0 ? (
            <>
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('Diary');
                  }}>
                  <Banner />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <FlatList
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
                snapToInterval={windowWidth - 6}
                snapToAlignment="center"
                horizontal
                decelerationRate={'fast'}
                view
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                viewabilityConfig={{
                  viewAreaCoveragePercentThreshold: 6,
                }}
                onViewableItemsChanged={onFlatListUpdate}
              />
              <View style={styles.dots}>
                {exercise?.map((exercise, index) => (
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          index == activeIndex ? '#000a7d' : colors.LIGHT_GREY,
                      },
                    ]}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const Card = ({name, status, image, mass, lightColor, color, darkColor}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: 20,
          marginBottom: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: darkColor,
            fontFamily: font.DEFAULT_FONT,
            fontWeight: '900',
          }}>
          {status} / {mass} g
        </Text>
      </View>
      <ImageBackground
        imageStyle={{opacity: 0.6, borderRadius: 10}}
        style={{
          height: 200,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={image}>
        <View style={{alignSelf: 'center', margin: 5}}>
          <Progress.Circle
            size={150}
            progress={status / 100}
            showsText
            text
            //textStyle={{fontSize: 20}}
            unfilledColor={'#fff'}
            borderColor="#fff"
            color={darkColor}
            direction="counter-clockwise"
            //fill={color}
            strokeCap="round"
            thickness={10}
            style={{
              shadowColor: 'grey',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 1,
            }}
            textStyle={{
              fontSize: 36,
              fontFamily: font.DEFAULT_FONT,
              fontWeight: 'bold',
              color: darkColor,
              //textDecorationLine: 'underline',
              // textShadowColor: '#000',
              // textShadowOffset: {width: 3, height: 3},
              // textShadowRadius: 10,
            }}
          />
        </View>
      </ImageBackground>
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
            color: darkColor,
            fontWeight: '900',
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
