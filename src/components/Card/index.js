import {
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  SafeAreaView,
  FlatList,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styles from './style';
import font from '../../assets/fonts/font';
import * as Progress from 'react-native-progress';

const Card = ({name, status, image, mass, lightColor, color, darkColor}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: 20,
          marginBottom: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: darkColor,
            fontFamily: font.DEFAULT_FONT,
            fontWeight: '900',
          }}>
          {status} / {mass} g
        </Text>
      </View>
      <ImageBackground
        imageStyle={{opacity: 0.6, borderRadius: 10}}
        style={{
          height: 200,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={image}>
        <View style={{alignSelf: 'center', margin: 5}}>
          <Progress.Circle
            size={150}
            progress={status / mass}
            showsText
            text
            //textStyle={{fontSize: 20}}
            unfilledColor={'#fff'}
            borderColor="#fff"
            color={darkColor}
            direction="counter-clockwise"
            //fill={color}
            strokeCap="round"
            thickness={10}
            style={{
              shadowColor: 'grey',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 1,
            }}
            textStyle={{
              fontSize: 36,
              fontFamily: font.DEFAULT_FONT,
              fontWeight: 'bold',
              color: darkColor,
              //textDecorationLine: 'underline',
              // textShadowColor: '#000',
              // textShadowOffset: {width: 3, height: 3},
              // textShadowRadius: 10,
            }}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: font.DEFAULT_FONT,
            fontSize: 16,
            color: darkColor,
            fontWeight: '900',
          }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default Card;
