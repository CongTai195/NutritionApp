import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import SearchInput from '../../components/SearchInput';
import AddFoodItem from '../../components/AddFoodItem';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';
import Foods from '../../data/Foods';
import BASE_URL from '../../data/ENV';

const AddFoodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const meal = route.params.meal;
  const diaryId = route.params.diaryId;
  const [isSearching, SetIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const [search, setSearch] = useState('');
  const [foods, setFoods] = useState('');

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
      SetIsSearching(true);
      setFoods([]);
      try {
        const response = await fetch(`${BASE_URL}search?name=${searchValue}`);
        const result = await response.json();
        setTimeout(() => {
          setFoods(result.results);
          SetIsSearching(false);
        }, 1500);
      } catch (error) {
        console.error(error);
      }
      //  finally {
      //   SetIsSearching(false);
      // }
    }
  };

  const addFood = async item => {
    try {
      const response = await fetch(`${BASE_URL}diary/food`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          diary_id: diaryId,
          serving_size_food_id: item.nutrition_facts[0].id,
          quantity: 1,
          meal: meal,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        setIsAdded(true);
        const time = setTimeout(() => {
          navigation.goBack();
        }, 1700);
        return () => clearTimeout(time);
      } else {
        alert('Error adding food');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isAdded === false ? (
        <>
          <View style={styles.container}>
            <SearchInput
              icon="search"
              initialPlaceholder="Search for a food"
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
            <View>
              <FlatList
                data={foods}
                renderItem={({item}) => (
                  <AddFoodItem
                    onPress={() =>
                      navigation.navigate('DetailFoodScreen', {
                        food: item,
                        diaryId: diaryId,
                        meal: meal,
                      })
                    }
                    item={item}
                    addFood={() => {
                      addFood(item);
                    }}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{flex: 1}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <AnimatedLottieView
                style={{height: 100, alignSelf: 'center'}}
                autoPlay
                source={require('../../assets/lottie/91001-success.json')}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default AddFoodScreen;
