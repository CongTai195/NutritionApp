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
import AddExerciseItem from '../../components/AddExerciseItem';
import {useToast} from 'react-native-toast-notifications';
import StandardExerciseScreen from './StandardExerciseScreen';
import CustomExerciseScreen from './CustomExerciseScreen';

const AddExerciseScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const meal = route.params.meal;
  const diaryId = route.params.diaryId;
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [exercise, setExercise] = useState([]);
  const [myExercise, setMyExercise] = useState(context.my_exercise);

  const [time, setTime] = useState(0);
  const [show, setShow] = useState(false);

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const data = [
    'Running',
    'Bicycling',
    'Martial arts',
    'Football',
    'Badminton',
    'Jumping jacks',
    'Rope jumping',
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

  const searchExercise = async searchValue => {
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
      setExercise([]);
      try {
        const url = `${context.BASE_URL}/api/exercise/search/search?name=${searchValue}`;
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
          setExercise(result.results);
          setIsSearching(false);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const searchMyExercise = async searchValue => {
    try {
      const url = `${context.BASE_URL}/api/myExercise/search?name=${searchValue}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
      });
      const result = await response.json();
      setMyExercise(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput
        show={show}
        data={
          time === 0
            ? data.filter(item => item.toLowerCase().indexOf(search) > -1)
            : []
        }
        icon="search"
        initialPlaceholder="Search for an exercise"
        onChangeText={value => {
          if (value === '') setShow(false);
          else setShow(true);
          setSearch(value);
          if (time === 1) {
            searchMyExercise(capitalizeFirstLetter(value));
          }
        }}
        onPress={value => {
          setSearch(value);
          searchExercise(capitalizeFirstLetter(value));
          setShow(false);
        }}
        value={search}
        onSubmitEditing={() => {
          if (time === 0) {
            searchExercise(capitalizeFirstLetter(search));
          }
        }}
      />
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
              Standard Exercise
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
              Custom Exercise
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {time === 0 ? (
        <StandardExerciseScreen
          meal={meal}
          diaryId={diaryId}
          isSearched={isSearched}
          isSearching={isSearching}
          exercise={exercise}
        />
      ) : (
        <CustomExerciseScreen
          meal={meal}
          diaryId={diaryId}
          isSearched={isSearched}
          isSearching={isSearching}
          exercise={myExercise}
        />
      )}
    </View>
  );
};

export default AddExerciseScreen;
