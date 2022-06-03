import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import SuccessfulRegister from '../../components/RegisterComponent/SuccessfulRegister';

const LoginStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="SuccessfulRegister"
        component={SuccessfulRegister}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
