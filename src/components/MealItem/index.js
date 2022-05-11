import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MealItem = ({item, onPress, addFood}) => {
  const name = item.name;
  const calories = item.calories;
  const serving_size =
    item.serving_size.split(' ')[0] * item.quantity +
    ' ' +
    item.serving_size.split(' ')[1] +
    (item.serving_size.split(' ')[2]
      ? ' ' + item.serving_size.split(' ')[2]
      : '') +
    (item.serving_size.split(' ')[3]
      ? ' ' + item.serving_size.split(' ')[3]
      : '');
  const detail = item.detail;
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Text style={styles.textHeader} numberOfLines={1}>
            {name}{' '}
          </Text>
          <View numberOfLines={1} style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.textInfo}>
              {calories} cal, {serving_size}, {detail}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.add}>
        <TouchableOpacity onPress={addFood}>
          <Ionicons name="add-outline" size={25} color="blue" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default MealItem;
