import React from 'react';
import {View, Text, Pressable, TouchableOpacity, TextInput} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const QuantitySelector = ({quantity, setQuantity}) => {
  const onMinus = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onMinus}>
        <Ionicons name="remove-outline" size={25} color={'black'} />
      </TouchableOpacity>

      {/* <Text style={styles.quantity}>{quantity}</Text> */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          maxLength={3}
          placeholder={'%'}
          placeholderTextColor="#c4c4c4"
          style={styles.amountText}
          keyboardType={'numeric'}
          //value={weight.toString()}
          onChangeText={value => {
            if (value === '') {
              setQuantity(1);
            } else setQuantity(parseInt(value));
          }}
          value={quantity.toString()}
        />
      </View>

      <TouchableOpacity onPress={onPlus}>
        <Ionicons name="add-outline" size={25} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
