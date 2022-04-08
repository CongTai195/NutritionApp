import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DiaryScreen from '../../screens/DiaryScreen';
import AddFoodScreen from '../../screens/AddFoodScreen';
import DetailFoodScreen from '../../screens/DetailFoodScreen';

const DiaryStack = () => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator initialRouteName="DiaryScreen">
        <Stack.Screen
          name="DiaryScreen"
          component={DiaryScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AddFoodScreen"
          component={AddFoodScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DetailFoodScreen"
          component={DetailFoodScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
  );
};

export default DiaryStack;
