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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {color} from 'react-native-reanimated';
import {useToast} from 'react-native-toast-notifications';

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
      setFood([]);
      try {
        const response = await fetch(
          `${context.BASE_URL}/api/food/search/search?name=${searchValue}`,
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
          setFood(result.results);
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

  const addFood = async item => {
    try {
      const response = await fetch(`${context.BASE_URL}/api/diary/food`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
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
        //setIsAdded(true);
        toast.show('Food logged successfully to your diary', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        setTimeout(() => {
          navigation.goBack();
        }, 1700);
        // return () => clearTimeout(time);
      } else {
        alert('Error adding food');
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            //backgroundColor: colors.RED_MEET,
          }}>
          {food.length > 0 ? (
            <>
              <FlatList
                data={food}
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
            </>
          ) : null}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAdded}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AnimatedLottieView
                  style={{height: 100, alignSelf: 'center'}}
                  autoPlay
                  source={require('../../assets/lottie/91001-success.json')}
                />
                <Text>Added</Text>
              </View>
            </View>
          </>
        </Modal>
      </View>
    </>
  );
};

export default AddFoodScreen;
