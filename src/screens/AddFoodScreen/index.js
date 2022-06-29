import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
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
import {useToast} from 'react-native-toast-notifications';
import StandardFoodScreen from './StandardFoodScreen';
import CustomFoodScreen from './CustomFoodScreen';

const AddFoodScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const meal = route.params.meal;
  const diaryId = route.params.diaryId;
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [food, setFood] = useState([]);
  const [myFood, setMyFood] = useState(context.my_food);

  const [time, setTime] = useState(0);

  const getTime = item => {
    if (item === time) {
      return colors.TEXT;
    } else return colors.LIGHT_GREY;
  };

  const getLabel = item => {
    if (item === time) {
      return colors.TEXT;
    } else return colors.BLACK;
  };

  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const data = [
    'Beef',
    'Egg',
    'Pork',
    'Chicken',
    'Sugar',
    'Shrimp',
    'Salmon',
    'Tuna',
    'Green Bell Pepper',
    'Red Bell Pepper',
    'Potato',
    'Sweet Potato',
    'Broccoli',
    'Oil',
    'Rice',
    'Oat',
    'Banh Mi',
    'Pho',
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${meal}`,
      headerTintColor: colors.TEXT,
      headerStyle: {backgroundColor: colors.THEME},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const searchFood = async searchValue => {
    if (searchValue.length < 2) {
      Alert.alert(
        'Search term too short',
        'Please enter a search term that is at least 2 characters long.',
        [{text: 'Dismiss', onPress: () => {}}],
      );
      //alert('Please input something with at least 2 characters!');
    } else {
      setIsSearched(true);
      setIsSearching(true);
      setFood([]);
      try {
        const url = `${context.BASE_URL}/api/food/search/search?name=${searchValue}`;
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
          },
        });
        const result = await response.json();
        setTimeout(() => {
          setFood(result.results);
          setIsSearching(false);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const searchMyFood = async searchValue => {
    try {
      const url = `${context.BASE_URL}/api/myFood/search?name=${searchValue}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
      });
      const result = await response.json();
      setMyFood(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(myFood);

  return (
    <View style={styles.container}>
      <View>
        <SearchInput
          show={show}
          data={
            time === 0
              ? data.filter(item => item.toLowerCase().indexOf(search) > -1)
              : []
          }
          icon="search"
          initialPlaceholder="Search food"
          onChangeText={value => {
            if (value === '') setShow(false);
            else setShow(true);
            setSearch(value);
            // if (time === 1) {
            //   searchMyFood(capitalizeFirstLetter(value));
            // }
          }}
          onPress={value => {
            setSearch(value);
            searchFood(capitalizeFirstLetter(value));
            setShow(false);
          }}
          value={search}
          onSubmitEditing={() => {
            if (time === 0) {
              searchFood(capitalizeFirstLetter(search));
            } else searchMyFood(capitalizeFirstLetter(search));
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          //borderBottomWidth: 0.5,
          alignSelf: 'center',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          //height: 40,
          marginBottom: 0.5,
          marginTop: 10,
          width: '100%',
          backgroundColor: colors.LIGHT_GREY,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: colors.PURE_WHITE,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: getTime(0),
            borderWidth: 2,
            marginRight: 2,
            borderRadius: 10,
            height: 60,
            marginHorizontal: 10,
          }}
          onPress={() => {
            setTime(0);
          }}>
          <View>
            <Text
              style={{
                color: getLabel(0),
                fontSize: 16,
                fontFamily: font.DEFAULT_FONT,
                fontWeight: time === 0 ? '900' : '500',
                marginHorizontal: 10,
              }}>
              Standard Food
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: colors.PURE_WHITE,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: getTime(1),
            borderWidth: 2,
            marginRight: 2,
            borderRadius: 10,
            height: 60,
            marginRight: 10,
          }}
          onPress={() => {
            setTime(1);
          }}>
          <View>
            <Text
              style={{
                color: getLabel(1),
                fontSize: 16,
                fontFamily: font.DEFAULT_FONT,
                fontWeight: time === 1 ? '900' : '500',
                marginHorizontal: 10,
              }}>
              Custom Food
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {time === 0 ? (
        <StandardFoodScreen
          meal={meal}
          diaryId={diaryId}
          isSearched={isSearched}
          isSearching={isSearching}
          food={food}
        />
      ) : (
        <CustomFoodScreen
          meal={meal}
          diaryId={diaryId}
          isSearched={isSearched}
          isSearching={isSearching}
          food={myFood}
        />
      )}
    </View>
  );
};

export default AddFoodScreen;
