import { Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import colors from '../../assets/colors/colors'

const ProgressScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Progress',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  
  return (
    <View>
      <Text>Progress</Text>
    </View>
  )
}

export default ProgressScreen;