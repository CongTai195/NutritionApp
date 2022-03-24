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
import Heading from '../../components/Heading';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [initialPlaceholder, setInitialPlaceholder] = useState({
    username: 'Username',
    password: 'Password',
  });
  const [secureTextEntry, setSecurityTextEntry] = useState(true);

  const [error, setError] = useState({});

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };

  const onChange = ({name, value}) => {
    setData({...data, [name]: value})

    if (value !== '') {
      setError((prev) => {
        return{...prev, [name]: null}
      })
    } else {
      setError((prev) => {
        return{...prev, [name]: "This field is required"}
      })
    }
  }
  const onPress = () => {
    if (!data.username) {
      setError((prev) => {
        return{...prev, username: "Please input your username"}
      })
    } 
    if (!data.password) {
      setError((prev) => {
        return{...prev, password: "Please input your password"}
      })
    } 
    if (data.username && data.password ) {
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.inner}>
        {RenderLogo()}
        <Heading name="Log In" />
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
            setInitialPlaceholder({...initialPlaceholder, password: 'Password'})
          }
          onChangeText={value => onChange({name: 'password', value})}
          pressable={
            <Pressable
              style={styles.hidePassword}
              onPress={() => changeSecureTextEntry()}>
              <Text style={styles.textHidePassword}>
                {secureTextEntry === false ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          }
          error={error.password}
        />
        <Button onPress={onPress} text={'LOG IN'} />
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
