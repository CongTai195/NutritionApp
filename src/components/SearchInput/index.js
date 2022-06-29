import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
const SearchInput = ({
  icon,
  initialPlaceholder,
  onChangeText,
  secureText,
  onBlur,
  onFocus,
  onSubmitEditing,
  value,
  data,
  onPress,
  show,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputPart}>
        <View
          style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name={icon} color={colors.GREY} size={20} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={initialPlaceholder}
          placeholderTextColor={colors.GREY}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      {show === true && data.length > 0 && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            width: '95%',
            top: 50,
            zIndex: 2,
            alignSelf: 'center',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: '#000',
            borderWidth: 1,
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  onPress(item);
                }}>
                <Icon name={icon} color={colors.GREY} size={20} />
                <Text
                  style={{
                    margin: 10,
                    color: colors.BLACK,
                    fontSize: 16,
                    fontFamily: font.DEFAULT_FONT,
                    fontWeight: '500',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
    </View>
  );
};

export default SearchInput;
