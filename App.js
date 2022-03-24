import React, {useEffect, useState} from 'react';
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
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading === true) {
    return (
      <View style={styles.container}>
        <SplashScreen />
      </View>
    );
  } else
    return (
      // <NavigationContainer>
        <View style={styles.container}>
          <BottomTab />
        </View>
      //</NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24253c',
  },
});

export default App;
