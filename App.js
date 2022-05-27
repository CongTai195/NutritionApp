import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import BottomTab from './src/navigations/BottomTab';
import colors from './src/assets/colors/colors';
import {DataProvider} from './src/context/Context';
import {ToastProvider} from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  useEffect(() => {});
  return (
    // <NavigationContainer>
    <ToastProvider
      successIcon={
        <Ionicons
          name="checkmark-done-outline"
          size={25}
          color={'white'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      }
      dangerIcon={
        <Ionicons
          name="close-circle-outline"
          size={25}
          color={'white'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      }>
      <DataProvider>
        <View style={styles.container}>
          <BottomTab />
        </View>
      </DataProvider>
    </ToastProvider>
    //</NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_GROUND_COLOR,
  },
});

export default App;
