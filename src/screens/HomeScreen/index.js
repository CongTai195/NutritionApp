import React, {useEffect, useState, useLayoutEffect} from 'react';
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

const headerImage = require('../../assets/images/defaultAvatar.png');
const notification = require('../../assets/images/Notification.png');
const next = require('../../assets/images/next.png');
const carbs = require('../../assets/images/carbs.png');
const meat = require('../../assets/images/meat.png');
const fat = require('../../assets/images/fat.png');

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  //const [data, setData] = useState([]);
  const navigation = useNavigation();

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

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://shop-adidas.herokuapp.com/api/product',
  //     );
  //     const json = await response.json();
  //     console.table(json.results);
  //     setData(json.results);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const axiosFetch = () => {
  //   axios
  //     .get(`${ENV.BASE_URL}product`)
  //     .then(res => {
  //       console.log('Data: ', res.data.results.length);
  //       setData(res.data.results);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.warn(error);
  //     });
  // };

  useEffect(() => {
    //axiosFetch();
  }, []);
  const goal = 2090;
  const food = 0;
  const exercise = 0;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.screen}>
            <Header onPress={() => {
              navigation.navigate('LoginScreen');
            }} />
            {/* <Banner /> */}
            <CaloriesRemaining goal={goal} food={food} exercise={exercise} />
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Label>Your Nutrients</Label>
            <View style={{flexDirection: 'row'}}>
              <Card name={"Carbs"} mass={100} status={80} image={carbs} lightColor="#f8e4d9" color="#fcf1ea" darkColor="#fac5a4" />
              <Card name={"Fat"} mass={100} status={80} image={fat} lightColor="#dad5fe" color="#e7e3ff" darkColor="#8860a2" />
              <Card name={"Protein"} mass={100} status={80} image={meat} lightColor="#d7f0f7" color="#e8f7fc" darkColor="#aceafc" />
            </View>
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
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <Image source={image} style={{height: 25, width: 25}} />
      <Text style={{color: colors.BLACK, fontFamily: font.DEFAULT_FONT, fontWeight: '500'}}>
          {mass} g
        </Text>
      </View>
      <View style={{alignSelf: 'center', margin: 5}}>
        <Progress.Circle
          size={50}
          progress={status / 100}
          //progress={0.1}
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
      {/* <View>
        <Text style={{fontSize: 10, fontFamily: 'Poppins-Light'}}>
          {'Day     1'}
        </Text>
        <Text style={{fontSize: 10, fontFamily: 'Poppins-Light'}}>
          {'Time   20 min'}
        </Text>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily: font.DEFAULT_FONT, fontSize: 16, color: "black", fontWeight: '100'}}>
          {name}
        </Text>
        {/* <View
          style={{
            backgroundColor: data.lightColor,
            padding: 2,
            borderRadius: 10,
          }}>
          <Image
            source={next}
            style={{
              height: 12,
              width: 12,
              resizeMode: 'contain',
            }}
          />
        </View> */}
      </View>
    </View>
  );
};

const Label = ({children}) => <Text style={styles.label}>{children}</Text>;

const Header = ({onPress}) => (
  <View style={styles.header}>
    <ImageContainer image={headerImage} />
    <HeaderTitle />
    <View style={styles.iconNotification}>
          <TouchableOpacity
            onPress={onPress}>
            <Ionicons
              name="notifications-outline"
              size={25}
              color={colors.BLACK}
            />
          </TouchableOpacity>
        </View>
  </View>
);
const ImageContainer = ({image, height = '100%', width = '100%'}) => (
  <View style={styles.imageContainer}>
    <Image source={image} style={[{height, width}]} />
  </View>
);

const HeaderTitle = () => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hi, lkt</Text>
    <Text style={styles.smallTitle}>Apr 12, 2022</Text>
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
