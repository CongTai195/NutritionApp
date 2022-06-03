import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import {DataContext} from '../../context/Context';

const ProfileScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  const name = user.name;
  const progressNumber = 5;
  const height = user.height;
  const sex = user.gender === 1 ? 'Male' : 'Female';
  const dob = '22 Mar 2000';
  const location = 'Vietnam';
  const email = user.email;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${name}`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.headerSection}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/defaultAvatar.png')}
        />
        <View style={styles.nameSection}>
          <Text style={styles.lightText}>{name}</Text>
        </View>
      </View>
      <View style={styles.progressSection}>
        <View style={{margin: 10, flexDirection: 'row', flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: 'green',
              fontFamily: font.DEFAULT_FONT,
            }}>
            {progressNumber} kg{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontFamily: font.DEFAULT_FONT,
            }}>
            Lost
          </Text>
        </View>
        <View style={{borderLeftWidth: 1}}>
          <Text></Text>
        </View>
        <View style={{margin: 10, flexDirection: 'row', flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: '500',
              fontFamily: font.DEFAULT_FONT,
            }}>
            {0}{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontFamily: font.DEFAULT_FONT,
            }}>
            Friends
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: font.DEFAULT_FONT,
          alignSelf: 'flex-start',
          margin: 10,
          fontSize: 16,
          color: 'black',
          fontWeight: '900',
        }}>
        Personal Details
      </Text>
      <View style={styles.infoSection}>
        {/* <View style={styles.childInfoSection}> */}
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.child}>
            <Text style={[styles.textChild, {flex: 1}]}>User Name</Text>
            <Text style={[styles.textChild, {color: 'blue'}]}>{name}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.child}>
            <Text style={[styles.textChild, {flex: 1}]}>Profile Photo</Text>
            <Image
              style={{
                height: 40,
                width: 40,
                resizeMode: 'cover',
                borderRadius: 50,
                margin: 10,
              }}
              source={require('../../assets/images/defaultAvatar.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.child}>
            <Text style={[styles.textChild, {flex: 1}]}>Height</Text>
            <Text style={[styles.textChild, {color: 'blue'}]}>{height} cm</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.child}>
            <Text style={[styles.textChild, {flex: 1}]}>Sex</Text>
            <Text style={[styles.textChild, {color: 'blue'}]}>{sex}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.child}>
            <Text style={[styles.textChild, {flex: 1}]}>Email Address</Text>
            <Text style={[styles.textChild, {color: 'blue'}]}>{email}</Text>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
