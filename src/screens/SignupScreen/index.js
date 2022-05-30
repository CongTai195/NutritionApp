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

const SignupScreen = () => {
  const context = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: index === 0 ? 'Sign Up' : index === 1 ? 'Goal' : '',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BLUE},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
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

  const onNext = () => {
    setIndex(prev => (prev += 1));
  };

  return (
    <>
      {index === 0 ? (
        <>
          <SplashRegister onPress={() => onNext()}></SplashRegister>
        </>
      ) : index === 1 ? (
        <>
          <FirstGoalRegister onPress={() => onNext()}></FirstGoalRegister>
        </>
      ) : index === 2 ? (
        <>
          <SecondGoalRegister onPress={() => onNext()}></SecondGoalRegister>
        </>
      ) : index === 3 ? (
        <>
          <SexAgeRegister onPress={() => onNext()}></SexAgeRegister>
        </>
      ) : index === 4 ? (
        <>
          <HeightWeightRegister onPress={() => onNext()}></HeightWeightRegister>
        </>
      ) : (
        <>
          <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <View style={styles.inner}>
              <Heading name="Sign Up" />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Input
                  name="Your name"
                  secureText={false}
                  value={data.yourName}
                  initialPlaceholder={initialPlaceholder.yourName}
                  onFocus={() =>
                    setInitialPlaceholder({...initialPlaceholder, yourName: ''})
                  }
                  onBlur={() =>
                    setInitialPlaceholder({
                      ...initialPlaceholder,
                      yourName: 'Your Name',
                    })
                  }
                  onChangeText={value => onChange({name: 'yourName', value})}
                  error={error.yourName}
                />
                <Input
                  name="Email"
                  secureText={false}
                  value={data.email}
                  initialPlaceholder={initialPlaceholder.email}
                  onFocus={() =>
                    setInitialPlaceholder({...initialPlaceholder, email: ''})
                  }
                  onBlur={() =>
                    setInitialPlaceholder({
                      ...initialPlaceholder,
                      email: 'Email',
                    })
                  }
                  onChangeText={value => onChange({name: 'email', value})}
                  error={error.email}
                />
                <Input
                  name="Password"
                  secureText={secureTextEntry}
                  value={data.password}
                  initialPlaceholder={initialPlaceholder.password}
                  onFocus={() =>
                    setInitialPlaceholder({...initialPlaceholder, password: ''})
                  }
                  onBlur={() =>
                    setInitialPlaceholder({
                      ...initialPlaceholder,
                      password: 'Password',
                    })
                  }
                  onChangeText={value => onChange({name: 'password', value})}
                  pressable={
                    <Pressable
                      style={styles.hidePassword}
                      onPress={() => changeSecureTextEntry()}>
                      {secureTextEntry === false ? (
                        <Ionicons
                          name="eye-off-outline"
                          size={24}
                          color={colors.PURE_WHITE}
                        />
                      ) : (
                        <Ionicons
                          name="eye-outline"
                          size={24}
                          color={colors.PURE_WHITE}
                        />
                      )}
                    </Pressable>
                  }
                  error={error.password}
                />
                <Input
                  name="Confirm Password"
                  secureText={secureTextEntry}
                  value={data.confirmPassword}
                  initialPlaceholder={initialPlaceholder.confirmPassword}
                  onFocus={() =>
                    setInitialPlaceholder({
                      ...initialPlaceholder,
                      confirmPassword: '',
                    })
                  }
                  onBlur={() =>
                    setInitialPlaceholder({
                      ...initialPlaceholder,
                      confirmPassword: 'Confirm Password',
                    })
                  }
                  onChangeText={value =>
                    onChange({name: 'confirmPassword', value})
                  }
                  pressable={
                    <Pressable
                      style={styles.hidePassword}
                      onPress={() => changeSecureTextEntry()}>
                      {secureTextEntry === false ? (
                        <Ionicons
                          name="eye-off-outline"
                          size={24}
                          color={colors.PURE_WHITE}
                        />
                      ) : (
                        <Ionicons
                          name="eye-outline"
                          size={24}
                          color={colors.PURE_WHITE}
                        />
                      )}
                    </Pressable>
                  }
                  error={error.confirmPassword}
                />
              </View>
              <Button onPress={onPress} text={'SIGN UP'} />
              <View style={styles.toLogin}>
                <Text style={styles.textToLogin}>Already have an account?</Text>
                <Text
                  style={styles.textLogin}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  Log In
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
};

export default SignupScreen;
