import {Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MoreScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'More',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.streak}>
          <Text style={styles.lightText}>Streak</Text>
          <Text style={styles.boldText}>2</Text>
          <Text style={styles.lightText}>days</Text>
        </View>
        <View style={styles.profile}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/defaultAvatar.jpg')}
          />
          <Text style={styles.boldText}>LKTGamingDUT</Text>
        </View>
        <View style={styles.progress}>
          <Text style={styles.lightText}>Progress</Text>
          <Text style={styles.boldText}>0 kg</Text>
          <Text style={styles.lightText}>kgs lost</Text>
        </View>
      </View>
      <View style={styles.othersSection}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ProfileScreen")}>
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
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        <TouchableOpacity activeOpacity={0.5}>
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
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MoreScreen;
