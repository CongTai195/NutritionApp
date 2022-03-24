import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const name = 'lktgamingDUT';
  const progressNumber = 5;
  const height = 176;
  const sex = "Male";
  const dob = "22 Mar 2000";
  const location = "Vietnam";
  const email = "lktgamingDUT@gmail.com"

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${name}`,
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/defaultAvatar.jpg')}
        />
        <View style={styles.nameSection}>
          <Text style={styles.lightText}>{name}</Text>
        </View>
      </View>
      <View style={styles.progressSection}>
        <View style={{margin: 10, flexDirection: 'row', flex: 1}}>
          <Text style={{fontSize: 16, color: 'green'}}>
            {progressNumber} kg{' '}
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>Lost</Text>
        </View>
        <View style={{borderLeftWidth: 0.5}}></View>
        <View style={{margin: 10, flexDirection: 'row', flex: 1}}>
          <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
            {0}{' '}
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>Friends</Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        <Text
          style={{margin: 10, fontSize: 16, color: 'black', fontWeight: '500'}}>
          Personal Details
        </Text>
        <View style={styles.childInfoSection}>
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
                style={{height: 40, width: 40, resizeMode: "cover", borderRadius: 50, margin: 10}}
                source={require('../../assets/images/defaultAvatar.jpg')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Text style={[styles.textChild, {flex: 1}]}>Height</Text>
              <Text style={[styles.textChild, {color: "blue"} ]}>{height} cm</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Text style={[styles.textChild, {flex: 1}]}>Sex</Text>
              <Text style={[styles.textChild, {color: "blue"} ]}>{sex}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Text style={[styles.textChild, {flex: 1}]}>Date of Birth</Text>
              <Text style={[styles.textChild, {color: "blue"} ]}>{dob}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Text style={[styles.textChild, {flex: 1}]}>Location</Text>
              <Text style={[styles.textChild, {color: "blue"} ]}>{location}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.child}>
              <Text style={[styles.textChild, {flex: 1}]}>Email Address</Text>
              <Text style={[styles.textChild, {color: "blue"} ]}>{email}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
