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
  const [isSearching, SetIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

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
        "Search term too short",
        "Please enter a search term that is at least 2 characters long.",
        [
          { text: "Dismiss", onPress: () => {} }
        ]
      )
      //alert('Please input something with at least 2 characters!');
    } else {
      setIsSearched(true);
      SetIsSearching(true);
      setFoods([]);
      try {
        const response = await fetch(`${BASE_URL}food/search/${searchValue}`);
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
  return (
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
                navigation.navigate('DetailFoodScreen', {food: item})
              }
              item={item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default AddFoodScreen;
