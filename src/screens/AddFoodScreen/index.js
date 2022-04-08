import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import SearchInput from '../../components/SearchInput';
import AddFoodItem from '../../components/AddFoodItem';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';

const DATA = [
  {
    id: 1,
    name: 'Beef',
    calories: {
      calories: 170,
      fromCarbs: {
        mass: 0,
        percentage: 0
      },
      fromFat:{
        mass: 8,
        percentage: 44
      },
      fromProtein:{
        mass: 23,
        percentage: 56
      },
    },
    servingSize: 112,
    detail: '93% lean beef',
  },
  {
    id: 2,
    name: 'Chicken',
    calories: {
      calories: 100,
      fromCarbs: {
        mass: 1,
        percentage: 4
      },
      fromFat:{
        mass: 2,
        percentage: 16
      },
      fromProtein:{
        mass: 22,
        percentage: 80
      },
    },
    servingSize: 112,
    detail: 'Grilled chicken',
  },
  {
    id: 3,
    name: 'Egg',
    calories: {
      calories: 70,
      fromCarbs: {
        mass: 0,
        percentage: 0
      },
      fromFat:{
        mass: 5,
        percentage: 65
      },
      fromProtein:{
        mass: 6,
        percentage: 35
      },
    },
    servingSize: 50,
    detail: 'Egg',
  },
  {
    id: 4,
    name: 'Brocolini',
    calories: {
      calories: 33,
      fromCarbs: {
        mass: 6.4,
        percentage: 64
      },
      fromFat:{
        mass: 0.4,
        percentage: 8
      },
      fromProtein:{
        mass: 2.8,
        percentage: 28
      },
    },
    servingSize: 100,
    detail: 'Generic',
  },
];
const AddFoodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const meal = route.params.meal;
  const [isSearching, SetIsSearching] = useState(false);

  const [search, setSearch] = useState('');
  const [foods, setFoods] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${meal}`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle:{fontWeight: "700", fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const handleSearch = searchValue => {
    SetIsSearching(true);
    setFoods([]);
    setTimeout(() => {
      const result = DATA.filter(e => e.name.toLowerCase().includes(searchValue));
      setFoods(result);
      SetIsSearching(false);
    }, 2000);
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
      {isSearching === true ? (
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
          renderItem={({item}) => <AddFoodItem onPress={() => navigation.navigate("DetailFoodScreen", {food: item})} item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default AddFoodScreen;
