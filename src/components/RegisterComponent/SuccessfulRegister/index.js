import React, {useState, useContext, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import {DataContext} from '../../../context/Context';
import Progress from '../../../components/RegisterComponent/Progress';
import font from '../../../assets/fonts/font';

const AccountRegister = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account Created',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BLUE},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: width,
        }}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.text}>Congratulations!</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.textDescription}>
            Your custom plan is ready and you're one step closer to your goal
            weight.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.textDescription}>Your BMR score is:</Text>
          <Text style={styles.textCalories}>{user?.BMR}</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.textDescription}>Your TDEE score is:</Text>
          <Text style={styles.textCalories}>{user?.TDEE}</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.textDescription}>
            Your daily net calorie goal is:
          </Text>
          <Text style={styles.textCalories}>{user?.calories}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => {
            context.setToken();
          }}
          text={'CONTINUE'}
        />
      </View>
    </View>
  );
};

export default AccountRegister;
