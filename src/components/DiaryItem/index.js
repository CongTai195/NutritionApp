import {
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
  View,
} from 'react-native';
import React from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DiaryItem = ({meal, listFood, diaryId}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.childAdding}>
      <Text style={styles.headerText}>{meal}</Text>
      <View style={styles.separator}></View>
      {/* <SafeAreaView>
        {Object.values(listFood).map(food => (
          <View>
            <Text>{food.name}</Text>
          </View>
        ))}
      </SafeAreaView> */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('AddFoodScreen', {meal: meal, diaryId: diaryId})
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
