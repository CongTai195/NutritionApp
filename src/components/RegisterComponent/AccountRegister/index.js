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
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import {DataContext} from '../../../context/Context';
import Progress from '../../../components/RegisterComponent/Progress';

const AccountRegister = () => {
  const context = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const progress = [
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
    colors.GREEN_SELECTED,
  ];

  const [secureTextEntry, setSecurityTextEntry] = useState(true);
  const [data, setData] = useState({});
  const [initialPlaceholder, setInitialPlaceholder] = useState({
    yourName: 'Username',
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
        return {...prev, email: 'Please input your email'};
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
    if (!(data.confirmPassword === data.password)) {
      setError(prev => {
        return {...prev, confirmPassword: 'Your password is not matched'};
      });
    }
    if (data.email && data.password && data.yourName && data.confirmPassword) {
      context.register(
        data.yourName,
        data.email,
        data.password,
        context.register_data?.gender === 'Male' ? 1 : 0,
        context.register_data?.age,
        context.register_data?.height,
        context.register_data?.starting_weight,
        context.register_data?.goal_weight,
        context.register_data?.weekly_goal,
        context.register_data?.activity_level,
      );
    }
  };

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <Progress progress={progress} />
      <View
        style={{
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>Almost done! Create your account.</Text>
      </View>
      <View style={styles.inner}>
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
            onChangeText={value => onChange({name: 'confirmPassword', value})}
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
      </View>
      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Button onPress={onPress} text={'SIGN UP'} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AccountRegister;
