import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import NotificationScreen from '../../screens/NotificationScreen';
const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator initialRouteName="More">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
  );
};

export default HomeStack;
