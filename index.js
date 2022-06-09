/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: 'my-channel', // (required)
    channelName: 'My channel', // (required)
  },
  created => console.log(`CreateChannel returned '${created}'`),
);

// BackgroundFetch.configure(
//   {
//     minimumFetchInterval: 15, // fetch interval in minutes
//   },
//   async taskId => {
//     //console.log('Received background-fetch event: ', taskId);
//     PushNotification.localNotification({
//       //... You can use all the options from localNotifications
//       channelId: 'my-channel',
//       message: "You haven't log your meal", // (required)
//       color: 'red',
//       playSound: true,
//       soundName: 'default',
//       allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
//     });
//     //console.log('Finish background-fetch event: ', taskId);
//     // Call finish upon completion of the background task
//     BackgroundFetch.finish(taskId);
//   },
//   error => {
//     console.error('RNBackgroundFetch failed to start.');
//   },
// );

AppRegistry.registerComponent(appName, () => App);
