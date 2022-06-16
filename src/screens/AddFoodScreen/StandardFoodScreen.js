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

const StandardFoodScreen = ({isSearched, isSearching, food, diaryId, meal}) => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();

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
        {food?.length > 0 ? (
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
    </>
  );
};

export default StandardFoodScreen;
