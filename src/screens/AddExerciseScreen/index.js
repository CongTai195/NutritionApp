import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import SearchInput from '../../components/SearchInput';
import AddFoodItem from '../../components/AddFoodItem';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';
import Token from '../../data/Token';
import BASE_URL from '../../data/ENV';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import AddExerciseItem from '../../components/AddExerciseItem';
import {useToast} from 'react-native-toast-notifications';

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

  const handleSearch = async searchValue => {
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
        const response = await fetch(
          `${context.BASE_URL}/api/exercise/search/search?name=${searchValue}`,
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
        setTimeout(() => {
          setExercise(result.results);
          setIsSearching(false);
        }, 1500);
      } catch (error) {
        console.error(error);
      }
      // } finally {
      //   setIsSearching(false);
      // }
      // setTimeout(() => {
      //   context.searchFood(searchValue);
      //   setIsSearching(false);
      // }, 1500);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SearchInput
          icon="search"
          initialPlaceholder="Search for a exercise"
          onChangeText={setSearch}
          value={search}
          onSubmitEditing={() => handleSearch(search)}
        />
        {isSearched === false ? (
          <Text style={styles.textHeader}></Text>
        ) : isSearching === true ? (
          <View>
            <Text style={styles.textHeader}>Searching ...</Text>
            <AnimatedLottieView
              autoPlay
              source={require('../../assets/lottie/14427-simple-dot-loading-ver02.json')}
            />
          </View>
        ) : (
          <Text style={styles.textHeader}>Search Result</Text>
        )}
        <View style={{flex: 1, marginBottom: 10}}>
          {exercise?.length > 0 ? (
            <>
              <FlatList
                data={exercise}
                renderItem={({item}) => (
                  <AddExerciseItem
                    onPress={() =>
                      navigation.navigate('DetailExerciseScreen', {
                        exercise: item,
                        diaryId: diaryId,
                        action: 'View',
                      })
                    }
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default AddExerciseScreen;
