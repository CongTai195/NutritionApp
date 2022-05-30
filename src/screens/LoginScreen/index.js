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

const LoginScreen = () => {
  const context = useContext(DataContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sign In',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BLUE},
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
  const onPress = () => {
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
      context.login(data.username, data.password);
    }
  };

  const RenderLogo = () => {
    return (
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={styles.logoImage}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.inner}>
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
                username: 'Username',
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
        </View>
        <View style={styles.button}>
          <Button onPress={onPress} text={'SIGN IN'} />
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
