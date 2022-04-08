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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../components/Heading';
import colors from '../../assets/colors/colors';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecurityTextEntry] = useState(true);
  const [data, setData] = useState({});
  const [initialPlaceholder, setInitialPlaceholder] = useState({
    yourName: "Your Name",
    username: 'Username',
    password: 'Password',
    confirmPassword: "Confirm Password"
  });
  const [error, setError] = useState({});
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
  };
  const onPress = () => {
    if (!data.yourName) {
      setError((prev) => {
        return{...prev, yourName: "Please input your name"}
      })
    } 
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
    if (!data.confirmPassword) {
      setError((prev) => {
        return{...prev, confirmPassword: "Please confirm your password"}
      })
    } 
    if (data.username && data.password && data.yourName && data.confirmPassword ) {
      alert(data);
    }
  };

  const changeSecureTextEntry = () => {
    setSecurityTextEntry(prev => !prev);
  };
 
  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.inner}>
        <Heading name="Sign Up"/>
        <Input
            name="Your name"
            secureText={false}
            value={data.yourName}
            initialPlaceholder={initialPlaceholder.yourName}
            onFocus= {() => setInitialPlaceholder({...initialPlaceholder, yourName: ""})}
            onBlur = {() => setInitialPlaceholder({...initialPlaceholder, yourName: "Your Name"})}
            onChangeText={value => onChange({name: "yourName", value})}
            error={error.yourName}
          />
        <Input
          name="Username"
          secureText={false}
          value={data.username}
          initialPlaceholder={initialPlaceholder.username}
          onFocus= {() => setInitialPlaceholder({...initialPlaceholder, username: ""})}
          onBlur = {() => setInitialPlaceholder({...initialPlaceholder, username: "Username"})}
          onChangeText={value => onChange({name: "username", value})}
          error={error.username}
        />
        <Input
          name="Password"
          secureText={secureTextEntry}
          value={data.password}
          initialPlaceholder={initialPlaceholder.password}
          onFocus= {() => setInitialPlaceholder({...initialPlaceholder, password: ""})}
          onBlur = {() => setInitialPlaceholder({...initialPlaceholder, password: "Password"})}
          onChangeText={value => onChange({name: "password", value})}
          pressable={
            <Pressable
              style={styles.hidePassword}
              onPress={() => changeSecureTextEntry()}>
              {secureTextEntry === false ? (
                <Ionicons name='eye-off-outline' size={24} color={colors.PURE_WHITE}/>
              ) : (<Ionicons name='eye-outline' size={24} color={colors.PURE_WHITE}/>)}
            </Pressable>
          }
          error={error.password}
        />
        <Input
          name="Confirm Password"
          secureText={secureTextEntry}
          value={data.confirmPassword}
          initialPlaceholder={initialPlaceholder.confirmPassword}
          onFocus= {() => setInitialPlaceholder({...initialPlaceholder, confirmPassword: ""})}
          onBlur = {() => setInitialPlaceholder({...initialPlaceholder, confirmPassword: "Confirm Password"})}
          onChangeText={value => onChange({name: "confirmPassword", value})}
          pressable={
            <Pressable
              style={styles.hidePassword}
              onPress={() => changeSecureTextEntry()}>
              {secureTextEntry === false ? (
                <Ionicons name='eye-off-outline' size={24} color={colors.PURE_WHITE}/>
              ) : (<Ionicons name='eye-outline' size={24} color={colors.PURE_WHITE}/>)}
            </Pressable>
          }
          error={error.confirmPassword}
        />
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
  );
};

export default SignupScreen;
