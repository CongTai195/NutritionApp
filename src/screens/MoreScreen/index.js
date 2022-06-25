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
import image from '../../constants/image';

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
              source={{
                uri:
                  user.gender === 1
                    ? image.DEFAULT_AVATAR_MEN
                    : image.DEFAULT_AVATAR_WOMEN,
              }}
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
                name="information-circle"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={styles.labelPart}>
                <Text style={styles.textChild}>My Information</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.othersSection}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('GoalUpdateScreen');
            }}>
            <View style={styles.child}>
              <Ionicons
                name="flame"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={styles.labelPart}>
                <Text style={styles.textChild}>Goals</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.othersSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NutritionUpdateScreen');
            }}
            activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="nutrition"
                size={24}
                color={'black'}
                style={{marginRight: 10}}
              />
              <View style={styles.labelPart}>
                <Text style={styles.textChild}>Nutrition</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logOutSection}>
          <TouchableOpacity onPress={() => logOut()} activeOpacity={0.5}>
            <View style={styles.child}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={'red'}
                style={{marginRight: 10}}
              />
              <View style={styles.labelPart}>
                <Text style={styles.textChild}>Log Out</Text>
              </View>
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
