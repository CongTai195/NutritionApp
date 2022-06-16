import {
  StyleSheet,
  Dimensions,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomExerciseScreen = ({
  isSearched,
  isSearching,
  exercise,
  diaryId,
  meal,
}) => {
  const toast = useToast();
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <View
        style={{
          //backgroundColor: '#f450ff',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateExerciseScreen', {
              diaryId: diaryId,
            });
          }}
          activeOpacity={0.7}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width * 0.9,
              height: 100,
              //flexDirection: 'row',
            }}>
            <Ionicons name="bicycle-outline" size={40} color={'#4a61fd'} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: '900',
                fontFamily: font.DEFAULT_FONT,
                color: '#4a61fd',
              }}>
              Create an Exercise
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* {isSearched === false ? (
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
        )} */}
      {exercise?.length > 0 ? (
        <Text style={styles.textHeader}>My Exercises</Text>
      ) : null}
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          //backgroundColor: colors.RED_MEET,
        }}>
        {exercise?.length > 0 ? (
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
        ) : null}
      </View>
    </>
  );
};

export default CustomExerciseScreen;
