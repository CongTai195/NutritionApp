import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import BottomTab from './src/navigations/BottomTab';
import colors from './src/assets/colors/colors';
import {DataProvider} from './src/context/Context';
import {ToastProvider} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundFetch from 'react-native-background-fetch';

const App = () => {
  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
      },
      async taskId => {
        //console.log('Received background-fetch event: ', taskId);
        PushNotification.localNotification({
          //... You can use all the options from localNotifications
          channelId: 'my-channel',
          message: "You haven't log your meal", // (required)
          color: 'red',
          playSound: true,
          soundName: 'default',
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        });
        //console.log('Finish background-fetch event: ', taskId);
        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }, []);
  return (
    // <NavigationContainer>
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
          <BottomTab />
        </View>
      </DataProvider>
    </ToastProvider>
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
