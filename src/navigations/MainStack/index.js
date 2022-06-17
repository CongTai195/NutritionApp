import React, {useEffect, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from '../LoginStack';
import BottomTab from '../BottomTab';
import {DataContext} from '../../context/Context';

const Stack = createNativeStackNavigator();

function MainStack({navigation, route}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginStack">
      <Stack.Screen name="App" component={BottomTab} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
    </Stack.Navigator>
  );
}

export default MainStack;
