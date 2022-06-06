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
} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/Heading';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
import {DataContext} from '../../context/Context';
import SplashRegister from '../../components/RegisterComponent/SplashRegister';
import FirstGoalRegister from '../../components/RegisterComponent/FirstGoalRegister';
import SecondGoalRegister from '../../components/RegisterComponent/SecondGoalRegister';
import SexAgeRegister from '../../components/RegisterComponent/SexAgeRegister';
import HeightWeightRegister from '../../components/RegisterComponent/HeightWeightRegister';
import Progress from '../../components/RegisterComponent/Progress';
import {useFocusEffect} from '@react-navigation/native';
import WeeklyGoalRegister from '../../components/RegisterComponent/WeeklyGoalRegister';
import AccountRegister from '../../components/RegisterComponent/AccountRegister';

const SignupScreen = () => {
  const context = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const progress = [
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.YELLOW,
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        index === 0
          ? 'Sign Up'
          : index === 1 || index === 2 || index === 5
          ? 'Goal'
          : index === 3 || index === 4
          ? 'You'
          : 'Sign Up',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BLUE},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={styles.iconNotification}>
          <TouchableOpacity onPress={() => onPrev()}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, index]);

  const [secureTextEntry, setSecurityTextEntry] = useState(true);
  const [data, setData] = useState({});
  const [initialPlaceholder, setInitialPlaceholder] = useState({
    yourName: 'Your Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
  });
  const [error, setError] = useState({});
  const onChange = ({name, value}) => {
    setData({...data, [name]: value});

    if (value !== '') {
      setError(prev => {
        return {...prev, [name]: null};
      });
    } else {
      setError(prev => {
        return {...prev, [name]: 'This field is required'};
      });
    }
  };

  const onPress = () => {
    if (!data.yourName) {
      setError(prev => {
        return {...prev, yourName: 'Please input your name'};
      });
    }
    if (!data.email) {
      setError(prev => {
        return {...prev, username: 'Please input your email'};
      });
    }
    if (!data.password) {
      setError(prev => {
        return {...prev, password: 'Please input your password'};
      });
    }
    if (!data.confirmPassword) {
      setError(prev => {
        return {...prev, confirmPassword: 'Please confirm your password'};
      });
    }
    if (data.email && data.password && data.yourName && data.confirmPassword) {
      context.register(data.yourName, data.email, data.password);
    }
  };

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };

  const onNext = props => {
    if (!props.item || props.array?.length === 0) {
      alert('Please make your choice!');
    } else if (index === 4 && context.register_data?.goal === 'Maintain Weight')
      setIndex(prev => (prev += 2));
    else setIndex(prev => (prev += 1));
  };

  const onPrev = () => {
    if (index === 0 || index === 1) {
      navigation.goBack();
    } else {
      setIndex(prev => (prev -= 1));
    }
  };

  return (
    <>
      {index === 0 ? (
        <>
          <SplashRegister onPress={() => onNext({item: true})}></SplashRegister>
        </>
      ) : index === 1 ? (
        <>
          <FirstGoalRegister
            onPress={() =>
              onNext({item: context.register_data?.goal})
            }></FirstGoalRegister>
        </>
      ) : index === 2 ? (
        <>
          <SecondGoalRegister
            onPress={() =>
              onNext({item: context.register_data?.activity_level})
            }></SecondGoalRegister>
        </>
      ) : index === 3 ? (
        <>
          <SexAgeRegister
            onPress={() =>
              onNext({
                item: true,
                array:
                  context.register_data?.gender && context.register_data?.age
                    ? [
                        context.register_data?.gender,
                        context.register_data?.age,
                      ]
                    : [],
              })
            }></SexAgeRegister>
        </>
      ) : index === 4 ? (
        <>
          <HeightWeightRegister
            onPress={() =>
              onNext({
                item: true,
                array:
                  context.register_data?.height &&
                  context.register_data?.starting_weight &&
                  context.register_data?.goal_weight
                    ? [
                        context.register_data?.height,
                        context.register_data?.starting_weight,
                        context.register_data?.goal_weight,
                      ]
                    : [],
              })
            }></HeightWeightRegister>
        </>
      ) : index === 5 ? (
        <>
          <WeeklyGoalRegister
            onPress={() =>
              onNext({item: context.register_data?.weekly_goal})
            }></WeeklyGoalRegister>
        </>
      ) : (
        <>
          <AccountRegister></AccountRegister>
        </>
      )}
    </>
  );
};

export default SignupScreen;
