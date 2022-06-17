import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import BottomTab from './src/navigations/BottomTab';
import colors from './src/assets/colors/colors';
import {DataProvider} from './src/context/Context';
import {ToastProvider} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigations/MainStack';

const App = () => {
  return (
    <ToastProvider
      successIcon={
        <Ionicons
          name="checkmark-done-outline"
          size={25}
          color={'white'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      }
      dangerIcon={
        <Ionicons
          name="close-circle-outline"
          size={25}
          color={'white'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      }>
      <DataProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </View>
      </DataProvider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
});

export default App;
