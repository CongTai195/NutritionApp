import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import LoginStack from '../LoginStack';
import HomeStack from '../HomeStack';
import DiaryScreen from '../../screens/DiaryScreen';
import ProgressScreen from '../../screens/ProgressScreen';
import MoreStack from '../MoreStack/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import styles from './style';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ProfileScreen' || routeName === 'NotificationScreen') {
      return 'none';
    } else {
      return 'flex';
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.BACK_GROUND_COLOR,
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 10,
            elevation: 0,
            borderRadius: 15,
            ...styles.shadow,
          },
          tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
          tabBarActiveTintColor: colors.PURE_WHITE,
          tabBarInactiveTintColor: colors.GREY,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Ionicons name="home" size={25} color={color} />
            ),
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: colors.BACK_GROUND_COLOR,
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 10,
              elevation: 0,
              borderRadius: 15,
              ...styles.shadow,
            },
          })}
        />
        <Tab.Screen
          name="Diary"
          component={DiaryScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Ionicons name="reader" size={25} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Ionicons name="cellular" size={25} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreStack}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Ionicons name="ellipsis-horizontal" size={25} color={color} />
            ),
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: colors.BACK_GROUND_COLOR,
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 10,
              elevation: 0,
              borderRadius: 15,
              ...styles.shadow,
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTab;
