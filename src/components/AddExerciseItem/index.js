import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddExerciseItem = ({item, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Text style={styles.textHeader} numberOfLines={1}>
            {item.name}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExerciseItem;
