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

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isUserNameInputEmpty, setIsUserNameInputEmpty] = useState(false);
  const [isPasswordInputEmpty, setIsPasswordInputEmpty] = useState(false);
  const [isYourNameInputEmpty, setIsYourNameInputEmpty] = useState(false);
  const [isConfirmPasswordInputEmpty, setIsConfirmPasswordInputEmpty] = useState(false);
  const [data, setData] = useState({
      yourName: "",
      username: "",
      password: "",
      confirmPassword: ""
  });
  const [initialUsernamePlaceholder, setInitialUsernamePlaceholder] =
    useState('Username');
  const [initialPasswordPlaceholder, setInitialPasswordPlaceholder] =
    useState('Password');
    const [initialYourNamePlaceholder, setInitialYourNamePlaceholder] =
    useState('Your name');
  const [initialConfirmPasswordPlaceholder, setInitialConfirmPasswordPlaceholder] =
    useState('Confirm Password');
  const [secureTextEntry, setSecurityTextEntry] = useState(true);

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };
  const onPress = () => {
    if (username === '' || password === '') {
      if (username === '') {
        if (isUserNameInputEmpty === false) {
          setIsUserNameInputEmpty(true);
        }
      }
      if (password === '') {
        if (isPasswordInputEmpty === false) {
          setIsPasswordInputEmpty(true);
        }
      }
    }
    if (username !== '') {
      if (isUserNameInputEmpty === true) {
        setIsUserNameInputEmpty(false);
      }
    }
    if (password !== '') {
      if (isPasswordInputEmpty === true) {
        setIsPasswordInputEmpty(false);
      }
    }
    if (username !== '' && password !== '') {
      alert(`Username: ${username} Password: ${password}`);
    }
  };
  const RenderHeading = () => {
    return (
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Sign Up</Text>
      </View>
    );
  };
  const RenderErrorText = name => {
    if (name === 'username') {
      if (isUserNameInputEmpty === false) return null;
      else
        return (
          <View style={styles.errorPart}>
            <Text style={styles.errorText}>Please input your {name}.</Text>
          </View>
        );
    }
    if (name === 'password') {
      if (isPasswordInputEmpty === false) return null;
      else
        return (
          <View style={styles.errorPart}>
            <Text style={styles.errorText}>Please input your {name}.</Text>
          </View>
        );
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.inner}>
        {RenderHeading()}
        <Input
            name="Your name"
            secureText={false}
            value={data.yourName}
            initialPlaceholder={initialYourNamePlaceholder}
            setPlaceholder={setInitialYourNamePlaceholder}
            onChangeText={setData}
          />
        <Input
          name="Username"
          secureText={false}
          value={data.username}
          initialPlaceholder={initialUsernamePlaceholder}
          setPlaceholder={setInitialUsernamePlaceholder}
          onChangeText={setData}
        />
        {RenderErrorText('username')}
        <Input
          name="Password"
          secureText={secureTextEntry}
          value={data.password}
          initialPlaceholder={initialPasswordPlaceholder}
          setPlaceholder={setInitialPasswordPlaceholder}
          onChangeText={setData}
          pressable={
            <Pressable
              style={styles.hidePassword}
              onPress={() => changeSecureTextEntry()}>
              <Text style={styles.textHidePassword}>
                {secureTextEntry === false ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          }
        />
        <Input
          name="Confirm Password"
          secureText={secureTextEntry}
          value={data.confirmPassword}
          initialPlaceholder={initialConfirmPasswordPlaceholder}
          setPlaceholder={setInitialConfirmPasswordPlaceholder}
          onChangeText={setData}
          pressable={
            <Pressable
              style={styles.hidePassword}
              onPress={() => changeSecureTextEntry()}>
              <Text style={styles.textHidePassword}>
                {secureTextEntry === false ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          }
        />
        {RenderErrorText('password')}
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

export default SignupScreen;
