import React, {useState, useContext, useLayoutEffect, useEffect} from 'react';
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
  ActivityIndicator,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const context = useContext(DataContext);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sign In',
      headerTintColor: colors.TEXT,
      headerStyle: {backgroundColor: colors.THEME},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const [data, setData] = useState({});
  const [initialPlaceholder, setInitialPlaceholder] = useState({
    username: 'Email',
    password: 'Password',
  });
  const [secureTextEntry, setSecurityTextEntry] = useState(true);

  const [error, setError] = useState({});

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };

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

  const onPress = async () => {
    if (!data.username) {
      setError(prev => {
        return {...prev, username: 'Please input your email'};
      });
    }
    if (!data.password) {
      setError(prev => {
        return {...prev, password: 'Please input your password'};
      });
    }
    if (data.username && data.password) {
      const result = await context.login(data.username, data.password);
      if (result) {
        navigation.replace('App');
      }
    }
  };

  const getToken = async () => {
    setToken(await AsyncStorage.getItem('@storage_Key'));
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      navigation.replace('App');
    }
  }, [token]);

  const RenderLogo = () => {
    return (
      <View style={styles.logo}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dxtozrwr9/image/upload/v1655717041/logo_vv1ftl.jpg',
          }}
          style={styles.logoImage}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={[styles.inner, {opacity: context.isLoading ? 0.4 : 1}]}>
        {RenderLogo()}
        <View style={styles.button}>
          <Input
            name="Username"
            icon="user"
            secureText={false}
            value={data.username}
            initialPlaceholder={initialPlaceholder.username}
            onFocus={() =>
              setInitialPlaceholder({...initialPlaceholder, username: ''})
            }
            onBlur={() =>
              setInitialPlaceholder({
                ...initialPlaceholder,
                username: 'Email',
              })
            }
            onChangeText={value => onChange({name: 'username', value})}
            error={error.username}
          />
          <Input
            name="Password"
            icon="lock"
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
                {/* <Text style={styles.textHidePassword}>
                {secureTextEntry === false ? 'Hide' : 'Show'}
              </Text> */}
                {secureTextEntry === true ? (
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
        </View>
        <View style={styles.button}>
          <Button
            isLoading={context.isLoading}
            onPress={onPress}
            text={'SIGN IN'}
          />
        </View>

        <View style={styles.toSignup}>
          <Text style={styles.textToSignup}>Don't have an account?</Text>
          <Text
            style={styles.textSignup}
            onPress={() => {
              navigation.navigate('SignupScreen');
            }}>
            Sign Up
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
