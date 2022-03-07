import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LoginStack from './src/navigations/LoginStack';
import SplashScreen from './src/screens/SplashScreen';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  },[])
  if (isLoading === true) {
    return(
      <View style={styles.container}>
      <SplashScreen/>
    </View>
    );
  } else 
  return (
    <View style={styles.container}>
      <LoginStack/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24253c',
  }
});

export default App;
