import {
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  SafeAreaView,
  FlatList,
  Text,
  View,
  StatusBar,
  LogBox,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import font from '../../assets/fonts/font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MealItem from '../MealItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';

const WaterItem = ({meal, listItem, onPress, date}) => {
  const toast = useToast();
  const context = useContext(DataContext);
  const [items, setItems] = useState({});
  const navigation = useNavigation();
  const amount = context.diary.water;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={styles.childAdding}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <Text style={[styles.headerText, {flex: 1}]}>Water</Text>
          <>
            {amount === 0 ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={styles.caloText}>{amount}</Text>
                <Text style={styles.kcaloText}>ml</Text>
              </View>
            )}
          </>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={
            onPress
            // navigation.navigate('AddFoodScreen', {meal: meal, diaryId: diaryId})
          }>
          <View style={[styles.addFood, {marginBottom: amount === 0 ? 0 : 20}]}>
            <Ionicons name="add-outline" size={25} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaterItem;
