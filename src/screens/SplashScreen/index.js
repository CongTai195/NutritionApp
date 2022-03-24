import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './style';
import LottieView from 'lottie-react-native';
const SplashScreen = () => {
  return (
    <View style={[styles.logo, {flex: 1}]}>
      <View style={styles.shadow}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.textAppName}>Nutritious</Text>
    </View>
  );
};

export default SplashScreen;
