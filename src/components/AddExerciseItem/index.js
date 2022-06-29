import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddExerciseItem = ({item, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        {/* <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Text style={styles.textHeader} numberOfLines={1}>
            {item.name}{' '}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{marginRight: 10}}>
              <Image
                style={{height: 70, width: 70, borderRadius: 10}}
                source={{uri: item.imageURL}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.textHeader} numberOfLines={1}>
                {item.name}{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExerciseItem;
