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

  const getTime = item => {
    if (item === time) {
      if (item === 1) {
        return '#4a61fd';
      } else return '#d4d021';
    } else return colors.LIGHT_GREY;
  };

  const getLabel = item => {
    if (item === time) {
      if (item === 1) {
        return '#4a61fd';
      } else return '#d4d021';
    } else return colors.BLACK;
  };

  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${meal}`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
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
        icon="search"
        initialPlaceholder="Search for an exercise"
        onChangeText={value => {
          setSearch(value);
          if (time === 1) {
            searchMyExercise(value);
          }
        }}
        value={search}
        onSubmitEditing={() => {
          if (time === 0) {
            searchExercise(search);
          }
        }}
      />
      <View style={{backgroundColor: '#fff', marginTop: 2}}>
        <View
          style={{
            flexDirection: 'row',
            //borderBottomWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            marginBottom: 0.5,
            marginTop: 10,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: getTime(0),
              borderBottomWidth: 2,
              borderRightColor: getTime(0),
              borderRightWidth: time === 0 ? 2 : 0,
              marginRight: 2,
            }}
            onPress={() => {
              setTime(0);
            }}>
            <View>
              {/* <TouchableOpacity
              onPress={() => {
                setTime(0);
              }}> */}
              <Text
                style={{
                  flex: 1,
                  color: getLabel(0),
                  fontSize: 16,
                  fontFamily: font.DEFAULT_FONT,
                  fontWeight: time === 0 ? '900' : '500',
                  marginHorizontal: 10,
                }}>
                Standard Exercises
              </Text>
              {/* </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: getTime(1),
              borderBottomWidth: 2,
              borderLeftColor: getTime(1),
              borderLeftWidth: time === 1 ? 2 : 0,
            }}
            onPress={() => {
              setTime(1);
            }}>
            <View>
              <Text
                style={{
                  flex: 1,
                  color: getLabel(1),
                  fontSize: 16,
                  fontFamily: font.DEFAULT_FONT,
                  fontWeight: time === 1 ? '900' : '500',
                  marginHorizontal: 10,
                }}>
                My Exercises
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
