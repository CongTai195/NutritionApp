import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useContext, useState} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../components/Loading';

const MoreScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const startDay = user?.created_at;
  const today = moment().toDate().toISOString().split('T')[0];
  const startingWeight = user?.process?.starting_weight;
  const currentWeight = user?.process?.current_weight;
  const formatDate = input => {
    var datePart = input?.match(/\d+/g),
      month = datePart[1],
      day = datePart[2];
    return day;
  };
  const [isLoading, setIsLoading] = useState(false);

  const streak = parseInt(formatDate(today)) - parseInt(formatDate(startDay));

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'More',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const logOut = async () => {
    Alert.alert('', 'Do you really want to leave us?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: async () => {
          //navigation.reset();
          setIsLoading(true);
          const token = await AsyncStorage.getItem('@storage_Key');
          await context.logout(token);
          setTimeout(() => {
            setIsLoading(false);
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{name: 'LoginStack'}],
            });
            navigation.dispatch(resetAction);
          }, 1000);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.LIGHT_GREY}}>
      <ScrollView
        pointerEvents="none"
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isLoading ? 0.4 : 1,
        }}>
        <View style={styles.profileSection}>
          <View style={styles.streak}>
            <Text style={styles.lightText}>Streak</Text>
            <Text style={styles.boldText}>{streak}</Text>
            <Text style={styles.lightText}>days</Text>
          </View>
          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={require('../../assets/images/defaultAvatar.png')}
            />
            <Text style={styles.boldText}>{user.name}</Text>
          </View>
          <View style={styles.progress}>
            <Text style={styles.lightText}>Progress</Text>
            <Text style={styles.weightLostText}>
              {Math.abs(startingWeight - currentWeight)} kg
            </Text>
            <Text style={styles.lightText}>
              {startingWeight > currentWeight ? 'kgs lost' : 'kgs gain'}
            </Text>
          </View>
        </View>
        <View style={styles.othersSection}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ProfileScreen')}>
            <View style={styles.child}>
              <Ionicons
                name="person-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>My Profile</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="barbell-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Workout Routine</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('GoalUpdateScreen');
            }}>
            <View style={styles.child}>
              <Ionicons
                name="checkmark-done-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Goals</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NutritionUpdateScreen');
            }}
            activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="pie-chart-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Nutrition</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="receipt-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Meals, Recipes {'&'} Food</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="alarm-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Reminders</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="apps-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Apps {'&'} Devices</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="body-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Steps</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="people-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Friends</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Message</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="settings-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Settings</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Privacy Center</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Help</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => logOut()} activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textChild}>Log Out</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.LIGHT_GREY,
          justifyContent: 'center',
          alignItems: 'center',
          display: isLoading ? 'flex' : 'none',
        }}>
        <Loading style={{position: 'absolute', top: -200}} />
      </View>
    </SafeAreaView>
  );
};

export default MoreScreen;
