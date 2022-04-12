import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import SearchInput from '../../components/SearchInput';
import AddFoodItem from '../../components/AddFoodItem';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';
import Foods from '../../data/Foods';


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

  const handleSearch = searchValue => {
    setIsSearched(true);
    SetIsSearching(true);
    setFoods([]);
    setTimeout(() => {
      const result = Foods.filter(e =>
        e.name.toLowerCase().includes(searchValue),
      );
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
