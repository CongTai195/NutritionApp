import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import SignupScreen from '../../screens/SignupScreen';
import LoginScreen from '../../screens/LoginScreen';
import NutrientScreen from '../../screens/NutrientScreen';
import DetailExerciseScreen from '../../screens/DetailExerciseScreen';
import AddWeightScreen from '../../screens/AddWeightScreen';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NutrientScreen"
        component={NutrientScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="DetailExerciseScreen"
        component={DetailExerciseScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddWeightScreen"
        component={AddWeightScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
