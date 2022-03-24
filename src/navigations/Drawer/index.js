import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
const Drawer = createDrawerNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
          drawerType: "front",
          overlayColor: 'transparent',
          drawerStatusBarAnimation: "slide"
        }}
        initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} options={{
          drawerIcon: (color) => (
            <Ionicons name='log-in-outline' color={color} size={20}  />
          )
        }}/>
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;
