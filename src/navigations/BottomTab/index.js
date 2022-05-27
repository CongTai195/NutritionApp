import {View, Text, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import LoginStack from '../LoginStack';
import HomeStack from '../HomeStack';
import DiaryStack from '../../navigations/DiaryStack';
import ProgressScreen from '../../screens/ProgressScreen';
import MoreStack from '../MoreStack/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import styles from './style';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomTab = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'ProfileScreen' ||
      routeName === 'NotificationScreen' ||
      routeName === 'SignupScreen' ||
      routeName === 'LoginScreen' ||
      routeName === 'AddFoodScreen' ||
      routeName === 'DetailFoodScreen' ||
      routeName === 'DetailExerciseScreen' ||
      routeName === 'AddExerciseScreen' ||
      routeName === 'NutrientScreen'
    ) {
      return 'none';
    } else {
      return 'flex';
    }
  };

  const getKey = async () => {
    setToken(await AsyncStorage.getItem('@storage_Key'));
  };

  useEffect(() => {
    getKey();
  });

  if (context.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={'large'}
          color={colors.PURE_WHITE}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      </View>
    );
  } else if (!token) {
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
  } else
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: colors.PURE_WHITE,
              position: 'absolute',
              left: 10,
              right: 10,
              bottom: 10,
              elevation: 0,
              borderRadius: 10,
              ...styles.shadow,
            },
            tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
            tabBarActiveTintColor: colors.ACTIVE_BUTTON_BOTTOM_TAB,
            tabBarInactiveTintColor: colors.INACTIVE_BUTTON_BOTTOM_TAB,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={({route}) => ({
              headerShown: false,
              tabBarIcon: ({color}) => (
                <Ionicons name="home" size={30} color={color} />
              ),
              tabBarStyle: {
                display: getTabBarVisibility(route),
                backgroundColor: colors.PURE_WHITE,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
                elevation: 0,
                borderRadius: 10,
                ...styles.shadow,
              },
            })}
          />
          <Tab.Screen
            name="Diary"
            component={DiaryStack}
            options={({route}) => ({
              headerShown: false,
              tabBarIcon: ({color}) => (
                <Ionicons name="reader" size={30} color={color} />
              ),
              tabBarStyle: {
                display: getTabBarVisibility(route),
                backgroundColor: colors.PURE_WHITE,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
                elevation: 0,
                borderRadius: 10,
                ...styles.shadow,
              },
            })}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <Ionicons name="cellular" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="More"
            component={MoreStack}
            options={({route}) => ({
              headerShown: false,
              tabBarIcon: ({color}) => (
                <Ionicons name="ellipsis-horizontal" size={30} color={color} />
              ),
              tabBarStyle: {
                display: getTabBarVisibility(route),
                backgroundColor: colors.PURE_WHITE,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
                elevation: 0,
                borderRadius: 10,
                ...styles.shadow,
              },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
};

export default BottomTab;
