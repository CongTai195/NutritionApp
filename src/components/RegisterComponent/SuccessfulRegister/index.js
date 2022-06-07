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
  const [BMTNote, setBMRNote] = useState(false);
  const [TDEENote, setTDEENote] = useState(false);
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
        <View style={{marginVertical: 10, elevation: 2, width: width}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textDescription}>Your BMR score is:</Text>
            <TouchableOpacity
              onFocus={() => {
                console.log('Focus');
              }}
              onBlur={() => {
                console.log('Blur');
                setBMRNote(false);
              }}
              onPress={() => {
                setBMRNote(!BMTNote);
              }}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.PURE_WHITE}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          {BMTNote ? (
            <View style={[styles.note, {elevation: 3}]}>
              <Text style={styles.textNote}>
                Basal Metabolic Rate (BMR) refers to the number of calories your
                body burns each day to keep you alive. Basically, BMR is the
                number of calories your body would expend in a 24 hour period if
                all you did was lay in bed all day long.
              </Text>
            </View>
          ) : null}
          <Text style={styles.textCalories}>{user?.process?.BMR}</Text>
        </View>
        <View style={{marginVertical: 10, elevation: 0, width: width}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textDescription}>Your TDEE score is:</Text>
            <TouchableOpacity
              onBlur={() => {
                console.log('Blur');
                setBMRNote(false);
              }}
              onPress={() => {
                setTDEENote(!TDEENote);
              }}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.PURE_WHITE}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          {TDEENote ? (
            <View style={[styles.note, {elevation: 1}]}>
              <Text style={styles.textNote}>
                TDEE stands for “Total Daily Energy Expenditure.'' In brief,
                TDEE is the number of calories you burn each day. TDEE = BMR * R
                which R is your activity level during the day.
              </Text>
            </View>
          ) : null}
          <Text style={styles.textCalories}>{user?.process?.TDEE}</Text>
        </View>
        <View style={{marginVertical: 10, elevation: -1, width: width}}>
          <Text style={styles.textDescription}>
            Your daily net calorie goal is:
          </Text>
          <Text style={styles.textCalories}>{user?.process?.calories}</Text>
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
