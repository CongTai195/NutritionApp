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

const DiaryItem = ({meal}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.childAdding}>
      <Text style={styles.headerText}>{meal}</Text>
      <View style={styles.separator}></View>
      {/* <SafeAreaView>
        <FlatList
            data={item.listFood}
            keyExtractor={item => item.id}  
            renderItem={({item}) => (
                <View>
                    <Text>{item.name}</Text>
                </View>
            )}
            />
      </SafeAreaView> */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('AddFoodScreen', {meal: meal})}>
        <View style={styles.addFood}>
          <Ionicons name="add-outline" size={20} color="blue" />
          <Text
            style={{
              fontSize: 16,
              color: 'blue',
              fontWeight: '900',
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
