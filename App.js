import React, {useEffect, useState, useContext} from 'react';
import 'react-native-gesture-handler';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LoginStack from './src/navigations/LoginStack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import BottomTab from './src/navigations/BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './src/navigations/Drawer';
import colors from './src/assets/colors/colors';
import {DataProvider} from './src/context/Context';

const App = () => {
  useEffect(() => {});
  return (
    // <NavigationContainer>
    <DataProvider>
      <View style={styles.container}>
        <BottomTab />
      </View>
    </DataProvider>
    //</NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
});

export default App;
