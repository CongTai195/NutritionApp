import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CaloriesRemaining from '../../components/CaloriesRemaining';
import font from '../../assets/fonts/font';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const ExerciseCard = ({exercise, onPress}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: 20,
        }}>
        {/* //
          <Image source={image} style={{height: 25, width: 25}} /> */}
        <Text
          style={{
            fontSize: 16,
            color: colors.BLACK,
            fontFamily: font.DEFAULT_FONT,
            fontWeight: '900',
            marginBottom: 5,
          }}>
          {exercise?.duration} {exercise?.duration > 1 ? 'minutes' : 'minute'}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <ImageBackground
          imageStyle={{opacity: 0.5, borderRadius: 10}}
          style={{
            height: 200,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{
            uri:
              exercise.imageURL !== null
                ? `${exercise.imageURL}`
                : 'https://res.cloudinary.com/dxtozrwr9/image/upload/v1655346153/exercise_r0ajjo.jpg',
          }}>
          <View style={{alignItems: 'center', margin: 5}}>
            <Text
              style={{
                fontFamily: font.DEFAULT_FONT,
                fontSize: 32,
                color: '#000a7d',
                fontWeight: '900',
              }}>
              {exercise?.calories} calories
            </Text>
            <Text
              style={{
                fontFamily: font.DEFAULT_FONT,
                fontSize: 32,
                color: '#000a7d',
                fontWeight: '900',
              }}>
              burned
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: font.DEFAULT_FONT,
            fontSize: 16,
            color: colors.BLACK,
            fontWeight: '900',
          }}>
          {exercise?.name}
        </Text>
      </View>
    </View>
  );
};

export default ExerciseCard;
