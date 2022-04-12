import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MoreScreen from '../../screens/MoreScreen';
import ProfileScreen from '../../screens/ProfileScreen';
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
      </Stack.Navigator>
  );
};

export default MoreStack;
