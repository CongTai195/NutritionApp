import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [isUserNameInputEmpty, setIsUserNameInputEmpty] = useState(false);
  const [isPasswordInputEmpty, setIsPasswordInputEmpty] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [initialPlaceholder, setInitialPlaceholder] = useState({
    username: 'Username',
    password: 'Password',
  });
  const [secureTextEntry, setSecurityTextEntry] = useState(true);

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };
  const onPress = () => {
    if (data.username === '' || data.password === '') {
      if (data.username === '') {
        if (isUserNameInputEmpty === false) {
          setIsUserNameInputEmpty(true);
        }
      }
      if (data.password === '') {
        if (isPasswordInputEmpty === false) {
          setIsPasswordInputEmpty(true);
        }
      }
    }
    if (data.username !== '') {
      if (isUserNameInputEmpty === true) {
        setIsUserNameInputEmpty(false);
      }
    }
    if (data.password !== '') {
      if (isPasswordInputEmpty === true) {
        setIsPasswordInputEmpty(false);
      }
    }
    if (data.username !== '' && data.password !== '') {
      alert(`Username: ${data.username} Password: ${data.password}`);
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
  const RenderHeading = () => {
    return (
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Log In</Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.inner}>
        {RenderLogo()}
        {RenderHeading()}
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
            setInitialPlaceholder({...initialPlaceholder, username: 'Username'})
          }
          onChangeText={text => setData({...data, username: text})}
          error={isUserNameInputEmpty === false ? '' : 'username'}
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
            setInitialPlaceholder({...initialPlaceholder, password: 'Password'})
          }
          onChangeText={text => setData({...data, password: text})}
          pressable={
            <Pressable
              style={styles.hidePassword}
              onPress={() => changeSecureTextEntry()}>
              <Text style={styles.textHidePassword}>
                {secureTextEntry === false ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          }
          error={isPasswordInputEmpty === false ? '' : 'password'}
        />
        <Button onPress={onPress} text={'LOG IN'} />
        <View style={styles.toSignup}>
          <Text style={styles.textToSignup}>Don't have account?</Text>
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
