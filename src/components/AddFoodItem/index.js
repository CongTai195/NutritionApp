import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddFoodItem = ({item, onPress, addFood}) => {
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Text style={styles.textHeader} numberOfLines={1}>
            {item?.name}{' '}
          </Text>
          <View numberOfLines={1} style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.textInfo}>
              {item.nutrition_facts[0]?.calories} cal,{' '}
              {item.nutrition_facts[0]?.serving_size}, {item?.detail}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.add}>
        <TouchableOpacity onPress={addFood}>
          <Ionicons name="add-outline" size={25} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFoodItem;
