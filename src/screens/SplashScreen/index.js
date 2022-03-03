import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from '../../assets/styles/auth';
const SplashScreen = () => {
  const RenderLogo = () => {
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
  return <View style={styles.container}>{RenderLogo()}</View>;
};

export default SplashScreen;
