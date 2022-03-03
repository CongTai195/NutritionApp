import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import styles from '../../assets/styles/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/Input';
const LoginScreen = () => {
  const [isUserNameInputEmpty, setIsUserNameInputEmpty] = useState(false);
  const [isPasswordInputEmpty, setIsPasswordInputEmpty] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [initialUsernamePlaceholder, setInitialUsernamePlaceholder] =
    useState('Username');
  const [initialPasswordPlaceholder, setInitialPasswordPlaceholder] =
    useState('Password');
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
  const RenderButton = () => {
    return (
      <View style={styles.buttonPart}>
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
          <Text style={styles.textButton}>LOG IN</Text>
        </TouchableOpacity>
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
    <View style={styles.container}>
      {RenderLogo()}
      {RenderHeading()}
      <Input
        name="Username"
        icon="user"
        secureText={false}
        value={username}
        initialPlaceholder={initialUsernamePlaceholder}
        setPlaceholder={setInitialUsernamePlaceholder}
        onChangeText={setUsername}
      />
      {RenderErrorText('username')}
      <Input
        name="Password"
        icon="lock"
        secureText={secureTextEntry}
        value={password}
        initialPlaceholder={initialPasswordPlaceholder}
        setPlaceholder={setInitialPasswordPlaceholder}
        onChangeText={setPassword}
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
      {RenderButton()}
    </View>
  );
};

export default LoginScreen;
