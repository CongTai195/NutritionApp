import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import LottieView from 'lottie-react-native';

const Loading = props => {
  return (
    <LottieView
      style={{...props.style, height: 100, width: 100}}
      source={require('../../assets/lottie/98432-loading.json')}
      autoPlay
      loop
    />
  );
};

export default Loading;
