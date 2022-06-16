import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MoreScreen from '../../screens/MoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import NutritionUpdateScreen from '../../screens/NutritionUpdateScreen';
import GoalUpdateScreen from '../../screens/GoalUpdateScreen';
const MoreStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="More">
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="NutritionUpdateScreen"
        component={NutritionUpdateScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="GoalUpdateScreen"
        component={GoalUpdateScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default MoreStack;
