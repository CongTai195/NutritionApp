import { Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import colors from '../../assets/colors/colors'

const NotificationScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notification',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  
  return (
    <View>
      <Text>Notification</Text>
    </View>
  )
}

export default NotificationScreen;