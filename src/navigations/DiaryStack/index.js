import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DiaryScreen from '../../screens/DiaryScreen';
import AddFoodScreen from '../../screens/AddFoodScreen';
import DetailFoodScreen from '../../screens/DetailFoodScreen';
import AddExerciseScreen from '../../screens/AddExerciseScreen';
import DetailExerciseScreen from '../../screens/DetailExerciseScreen';
import NutrientScreen from '../../screens/NutrientScreen';
import CreateFoodScreen from '../../screens/CreateFoodScreen';
import CreateServingScreen from '../../screens/CreateFoodScreen/CreateServingScreen';
import CreateExerciseScreen from '../../screens/CreateExerciseScreen';
import AddWaterScreen from '../../screens/AddWaterScreen';

const DiaryStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="DiaryScreen">
      <Stack.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        options={{headerShown: false}}
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
      <Stack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="DetailExerciseScreen"
        component={DetailExerciseScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="NutrientScreen"
        component={NutrientScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CreateFoodScreen"
        component={CreateFoodScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CreateServingScreen"
        component={CreateServingScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CreateExerciseScreen"
        component={CreateExerciseScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddWaterScreen"
        component={AddWaterScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
