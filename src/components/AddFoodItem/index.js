import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';

const AddFoodItem = ({item, onPress, addFood}) => {
  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          {/* <Text style={styles.textHeader} numberOfLines={1}>
            {item?.name}{' '}
          </Text>
          <View numberOfLines={1} style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.textInfo}>
              {item.nutrition_facts[0]?.calories} cal,{' '}
              {item.nutrition_facts[0]?.serving_size}, {item?.detail}
            </Text>
          </View> */}
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
              <View numberOfLines={1} style={{flexDirection: 'row'}}>
                <Text numberOfLines={1} style={styles.textInfo}>
                  {item.nutrition_facts[0]?.calories} cal,{' '}
                  {item.nutrition_facts[0]?.serving_size}, {item?.detail}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.add}>
        <TouchableOpacity onPress={addFood}>
          <Ionicons
            style={{textAlign: 'center'}}
            name="add-outline"
            size={30}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFoodItem;
