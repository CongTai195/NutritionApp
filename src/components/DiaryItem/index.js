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
import Token from '../../data/Token';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DataContext} from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiaryItem = ({meal, listItem, onPress, date}) => {
  const context = useContext(DataContext);
  const [items, setItems] = useState({});
  const navigation = useNavigation();

  const calories =
    items.length > 0
      ? items.reduce((total, item) => {
          return total + parseFloat(item.calories);
        }, 0)
      : 0;
  // const calories =
  //   listFood.length > 0
  //     ? listFood.reduce((total, food) => {
  //         return total + parseFloat(food.calories);
  //       }, 0)
  //     : 0;
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = async (rowMap, rowKey) => {
    if (meal === 'Exercise') {
      try {
        const response = await fetch(
          `${context.BASE_URL}/api/diary/exercise/${rowKey}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:
                `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
            },
            method: 'DELETE',
          },
        );
        const result = await response.json();
        console.log(result);
        if (result.status === 'OK') {
          const newFoods = items.filter(item => item.id != rowKey);
          setItems(newFoods);
          context.getDiary(date);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(
          `${context.BASE_URL}/api/diary/food/${rowKey}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:
                `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
            },
            method: 'DELETE',
          },
        );
        const result = await response.json();
        console.log(result);
        if (result.status === 'OK') {
          const newFoods = items.filter(item => item.id != rowKey);
          setItems(newFoods);
          context.getDiary(date);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const HiddenItemWithActions = props => {
    const {swipeAnimatedValue, onClose, onDelete} = props;
    return (
      <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [-75, -0],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <Ionicons
              name="trash-outline"
              size={25}
              color={'white'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            {/* <Text>Delete</Text> */}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };
  const VisibleItem = props => {
    const {data} = props;
    const name = data.item.name;
    const calories = data.item.calories;
    const serving_size =
      data.item.serving_size?.split(' ')[0] * data.item.quantity +
      ' ' +
      data.item.serving_size?.split(' ')[1] +
      (data.item.serving_size?.split(' ')[2]
        ? ' ' + data.item.serving_size?.split(' ')[2]
        : '') +
      (data.item.serving_size?.split(' ')[3]
        ? ' ' + data.item.serving_size?.split(' ')[3]
        : '');
    const detail = data.item?.detail;
    const duration = data.item?.duration;
    return (
      <View>
        <TouchableHighlight style={styles.rowFront}>
          <View>
            <Text style={styles.textHeader} numberOfLines={1}>
              {name}{' '}
            </Text>
            <View numberOfLines={1} style={{flexDirection: 'row'}}>
              {meal === 'Exercise' ? (
                <>
                  <Text numberOfLines={1} style={styles.textInfo}>
                    {duration} {duration > 1 ? 'minutes' : 'minute'}, {calories}{' '}
                    cal
                  </Text>
                </>
              ) : (
                <>
                  <Text numberOfLines={1} style={styles.textInfo}>
                    {calories} cal, {serving_size}, {detail}
                  </Text>
                </>
              )}
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.id)}
        onDelete={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setItems(listItem);
  }, [listItem]);

  return (
    <View style={styles.childAdding}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.headerText, {flex: 1}]}>{meal}</Text>
        <>
          {calories === 0 ? null : (
            <>
              <Text style={styles.headerText}>{Math.round(calories)} cal</Text>
            </>
          )}
        </>
      </View>
      <>
        <View style={styles.separator}></View>
      </>
      <SafeAreaView style={styles.container}>
        {/* {foods.length > 0
          ? foods.map((food, index, array) => (
              <MealItem onPress={() => onPress(food)} key={index} item={food} />
            ))
          : null} */}
        <SwipeListView
          data={items}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          disableRightSwipe
          scrollEnabled={false}
        />
      </SafeAreaView>
      <>
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
            {meal === 'Water'
              ? 'Add Water'
              : meal === 'Exercise'
              ? 'Add Exercise'
              : 'Add Food'}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <View
        style={{
          borderBottomWidth: 20,
          borderBottomColor: colors.LIGHT_GREY,
        }}></View> */}
    </View>
  );
};

export default DiaryItem;
