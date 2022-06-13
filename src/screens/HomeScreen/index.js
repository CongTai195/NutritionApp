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
import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Progress from '../../components/Progress';

const headerImage = require('../../assets/images/defaultAvatar.png');
const notification = require('../../assets/images/Notification.png');
const carbs_image = require('../../assets/images/Carbon.jpg');
const meat = require('../../assets/images/Beef.jpg');
const fat_image = require('../../assets/images/fat.jpg');
const banner = require('../../assets/images/Banner.jpg');
const fire = require('../../assets/images/fire.png');
const water = require('../../assets/images/glass.png');

const HomeScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const diary = context.diary_today;
  const calories = diary?.process?.calories;
  const food = diary?.food;
  const breakfast = food?.filter(e => e.meal === 'Breakfast');
  const calories_breakfast =
    breakfast?.length > 0
      ? breakfast?.reduce((total, item) => {
          return total + parseFloat(item.calories);
        }, 0)
      : 0;
  const lunch = food?.filter(e => e.meal === 'Lunch');
  const calories_lunch =
    lunch?.length > 0
      ? lunch?.reduce((total, item) => {
          return total + parseFloat(item.calories);
        }, 0)
      : 0;
  const dinner = food?.filter(e => e.meal === 'Dinner');
  const calories_dinner =
    dinner?.length > 0
      ? dinner?.reduce((total, item) => {
          return total + parseFloat(item.calories);
        }, 0)
      : 0;
  const total_fat = Math.round((calories * diary?.process?.fat) / 100 / 9);
  const total_carbs = Math.round((calories * diary?.process?.carbs) / 100 / 4);
  const total_protein = Math.round(
    (calories * diary?.process?.protein) / 100 / 4,
  );
  const exercise = diary.exercise;
  const navigation = useNavigation();
  const date = moment().toDate().toISOString().split('T')[0];
  const windowWidth = Dimensions.get('window').width;
  const [activeNutrientIndex, setActiveNutrientIndex] = React.useState(0);
  const [activeExercisesIndex, setActiveExercisesIndex] = React.useState(0);
  const [activeLogIndex, setLogIndex] = React.useState(0);
  const [time, setTime] = useState(new Date(Date.now()));

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

  const onLogUpdate = React.useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setLogIndex(viewableItems[0].index || 0);
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
      mass: total_carbs,
      status: carbs,
      image: carbs_image,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: colors.ORANGE,
    },
    {
      id: 2,
      name: 'Fat',
      mass: total_fat,
      status: fat,
      image: fat_image,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: '#644678',
    },
    {
      id: 3,
      name: 'Protein',
      mass: total_protein,
      status: protein,
      image: meat,
      lightColor: '#f8e4d9',
      color: '#fcf1ea',
      darkColor: colors.RED_MEET,
    },
  ];

  useEffect(() => {
    context.getDiary(date);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setTime(new Date(Date.now()));
  //   }, 30000);
  // }, []);

  // useEffect(() => {
  //   if (
  //     time.getHours() === 8 &&
  //     time.getMinutes() === 25 &&
  //     calories_breakfast === 0
  //   ) {
  //     testPush("You haven't log your Breakfast.");
  //   }
  //   if (
  //     time.getHours() === 19 &&
  //     time.getMinutes() === 58 &&
  //     calories_lunch === 0
  //   ) {
  //     testPush("You haven't log your Lunch.");
  //   }
  //   if (
  //     time.getHours() === 20 &&
  //     time.getMinutes() === 0 &&
  //     calories_dinner === 0
  //   ) {
  //     testPush("You haven't log your Dinner.");
  //   }
  // }, [time.getMinutes()]);
  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
      },
      async taskId => {
        //console.log('Received background-fetch event: ', taskId);
        // PushNotification.localNotification({
        //   //... You can use all the options from localNotifications
        //   channelId: 'my-channel',
        //   message: `${time}: You haven't log your meal`, // (required)
        //   color: 'red',
        //   playSound: true,
        //   soundName: 'default',
        //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        // });
        testPush(`${time}: You haven't log your meal`);
        //console.log('Finish background-fetch event: ', taskId);
        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error(error);
      },
    );
  }, []);

  const testPush = async message => {
    try {
      PushNotification.localNotification({
        //... You can use all the options from localNotifications
        channelId: 'my-channel',
        message: message, // (required)
        color: 'red',
        playSound: true,
        soundName: 'default',
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

        //   // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
    } catch (e) {
      console.log(e);
    }
  };
  const formatDate = input => {
    var datePart = input.match(/\d+/g),
      month = datePart[1],
      day = datePart[2];

    return day;
  };

  const weights = context.weight_week;

  const data_weight = weights?.map(item => {
    return item.weight_log;
  });

  const data_heart_rate = weights?.map(item => {
    return item.heart_rate_log;
  });

  const data_blood = weights?.map(item => {
    return item.blood_pressure_log;
  });

  const labels = weights?.map(item => {
    if (item?.date === date) {
      return 'Today';
    } else return formatDate(item?.date);
  });

  let logArray = [
    {
      id: 1,
      name: 'Weight',
      data: data_weight,
      labels: labels,
      lightColor: '#ffbc59',
      color: '#ffa726',
      labelColor: '#e18600',
      label: ' kg',
    },
    {
      id: 2,
      name: 'Heart Rate',
      data: data_heart_rate,
      labels: labels,
      lightColor: '#ff828e',
      color: '#ff717e',
      labelColor: '#ff0b21',
      label: ' BPM',
    },
    {
      id: 3,
      name: 'Blood Pressure',
      data: data_blood,
      labels: labels,
      color: '#edbba0',
      lightColor: '#f6d3bd',
      labelColor: '#df8859',
      label: '',
    },
  ];

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
          <Label>Nutrients</Label>
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
          <Label>Exercises</Label>
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
                  <Banner image={banner} />
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
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 10,
            marginRight: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Label>Progress</Label>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddWeightScreen', {
                date: diary.date,
                index: activeLogIndex,
              });
            }}>
            <Ionicons name="add-sharp" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            margin: 5,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            {weights?.length > 0 ? (
              <Progress data={data_weight} labels={labels} height={200} />
            ) : (
              <ActivityIndicator
                size={'large'}
                color={colors.BACK_GROUND_COLOR}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            )}
          </View>
        </View> */}
        {weights.length > 0 ? (
          <Carousel
            data={logArray}
            renderItem={({item, index}) => (
              // <View key={index}>

              <Progress
                color={item.color}
                lightColor={item.lightColor}
                name={item.name}
                data={item.data}
                labels={item.labels}
                label={item.label}
                height={200}
                labelColor={item.labelColor}
              />
              // </View>
            )}
            snapToInterval={windowWidth - 5}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onLogUpdate.current}
            activeIndex={activeLogIndex}
            dotColor={colors.BACK_GROUND_COLOR}
          />
        ) : null}
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

const Banner = ({image}) => (
  <View style={[styles.card, {marginVertical: 5}]}>
    <ImageBackground
      imageStyle={{opacity: 1, borderRadius: 10}}
      style={{
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={image}>
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

const WaterAdd = ({image}) => (
  <View style={[styles.waterCard, {marginVertical: 5}]}>
    <ImageBackground
      imageStyle={{
        borderRadius: 10,
        resizeMode: 'contain',
      }}
      style={{
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={image}></ImageBackground>
  </View>
);
