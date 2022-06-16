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
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.headerText, {flex: 1}]}>Water</Text>
        <>
          {amount === 0 ? null : (
            <>
              <Text style={styles.headerText}>{Math.round(amount)} ml</Text>
            </>
          )}
        </>
      </View>
      <>
        <View style={styles.separator}></View>
        <View style={styles.separator}></View>
      </>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={
          onPress
          // navigation.navigate('AddFoodScreen', {meal: meal, diaryId: diaryId})
        }>
        <View style={styles.addFood}>
          <Ionicons name="add-outline" size={16} color={'black'} />
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: '500',
              fontFamily: font.DEFAULT_FONT,
            }}>
            Add Water
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WaterItem;
