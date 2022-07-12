import {
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
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
import colors from '../../assets/colors/colors';

const DiaryItem = ({meal, listItem, onPress, date}) => {
  const toast = useToast();
  const context = useContext(DataContext);
  const [items, setItems] = useState({});
  const navigation = useNavigation();
  const [show, setShow] = useState(true);

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
        if (result.status === 'OK') {
          toast.show('Exercise deleted successfully off your diary', {
            type: 'danger',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
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
          toast.show('Food deleted successfully off your diary', {
            type: 'danger',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
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
    const name = meal === 'Exercise' ? data.item?.name : data.item.food?.name;
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
    const detail = data.item?.food?.detail;
    const duration = data.item?.duration;
    const imageURL =
      meal === 'Exercise' ? data.item?.imageURL : data.item.food?.imageURL;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (meal === 'Exercise') {
              navigation.navigate('DetailExerciseScreen', {
                exercise: data.item,
                action: 'Update',
              });
            } else {
              navigation.navigate('DetailFoodScreen', {
                food: data.item?.food,
                serving_size: data.item?.serving_size,
                quantity: data.item?.quantity,
                food_detail_id: data.item?.id,
                action: 'Update',
              });
            }
          }}
          style={styles.rowFront}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 10}}>
              <Image
                style={{height: 70, width: 70, borderRadius: 10}}
                source={{uri: imageURL}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.textHeader} numberOfLines={1}>
                {name}{' '}
              </Text>
              <View numberOfLines={1} style={{flexDirection: 'row'}}>
                {meal === 'Exercise' ? (
                  <>
                    <Text numberOfLines={1} style={styles.textInfo}>
                      {duration} {duration > 1 ? 'minutes' : 'minute'},{' '}
                      {calories} cal
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
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = (data, rowMap) => {
    return <VisibleItem key={rowMap} data={data} />;
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
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <Text style={[styles.headerText, {flex: 1}]}>{meal}</Text>
          <>
            {calories === 0 ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text style={styles.caloText}>{Math.round(calories)}</Text>
                <Text style={styles.kcaloText}>calories</Text>
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
          <View
            style={[styles.addFood, {marginBottom: calories === 0 ? 0 : 10}]}>
            <Ionicons
              style={{textAlign: 'center', width: 24}}
              size={25}
              name="add"
              color={'white'}
            />
          </View>
        </TouchableOpacity>
      </View>
      {show ? (
        <SafeAreaView
          style={[styles.container, {marginBottom: items.length > 0 ? 15 : 0}]}>
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
      ) : null}
      <View
        style={{
          backgroundColor: colors.THEME,
          borderBottomColor: colors.THEME,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: 'flex-end',
        }}>
        {items.length > 0 ? (
          <TouchableOpacity onPress={() => setShow(!show)}>
            {show ? (
              <Ionicons
                style={{marginHorizontal: 15}}
                name="chevron-up-outline"
                size={25}
                color={'black'}
              />
            ) : (
              <Ionicons
                style={{marginHorizontal: 15}}
                name="chevron-down-outline"
                size={25}
                color={'black'}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default DiaryItem;
