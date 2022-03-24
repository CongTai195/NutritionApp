import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DiaryScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Diary',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
          Calories Remaining
        </Text>
        <View style={styles.calculator}>
          <View style={styles.childCalculator}>
            <Text style={styles.textChild}>2.090</Text>
            <Text style={[styles.textChild, {fontWeight: '300'}]}>Goal</Text>
          </View>
          <View style={styles.childCalculator}>
            <Ionicons name="remove-outline" size={24} color={'black'} />
          </View>
          <View style={styles.childCalculator}>
            <Text style={styles.textChild}>0</Text>
            <Text style={[styles.textChild, {fontWeight: '300'}]}>Food</Text>
          </View>
          <View style={styles.childCalculator}>
            <Ionicons name="add-outline" size={24} color={'black'} />
          </View>
          <View style={styles.childCalculator}>
            <Text style={styles.textChild}>0</Text>
            <Text style={[styles.textChild, {fontWeight: '300'}]}>
              Exercise
            </Text>
          </View>
          <View style={styles.childCalculator}>
            <Ionicons name="reorder-two-outline" size={24} color={'black'} />
          </View>
          <View style={styles.childCalculator}>
            <Text
              style={[
                styles.textChild,
                {color: 'blue', fontSize: 16, fontWeight: '700'},
              ]}>
              2.090
            </Text>
            <Text style={[styles.textChild, {fontWeight: '300'}]}>
              Remaining
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.addingSection}>
        <View style={styles.childAdding}>
          <Text style={styles.headerText}>Breakfast</Text>
          <View style={styles.separator}></View>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.addFood}>
              <Text style={{fontSize: 16, color: "blue", fontWeight: "500"}}>ADD FOOD</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{borderBottomWidth: 20, borderBottomColor: colors.LIGHT_GREY}}></View>

        <View style={styles.childAdding}>
          <Text style={styles.headerText}>Lunch</Text>
          <View style={styles.separator}></View>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.addFood}>
              <Text style={{fontSize: 16, color: "blue", fontWeight: "500"}}>ADD FOOD</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 20, borderBottomColor: colors.LIGHT_GREY}}></View>

        <View style={styles.childAdding}>
          <Text style={styles.headerText}>Dinner</Text>
          <View style={styles.separator}></View>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.addFood}>
              <Text style={{fontSize: 16, color: "blue", fontWeight: "500"}}>ADD FOOD</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 20, borderBottomColor: colors.LIGHT_GREY}}></View>

        <View style={styles.childAdding}>
          <Text style={styles.headerText}>Snack</Text>
          <View style={styles.separator}></View>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.addFood}>
              <Text style={{fontSize: 16, color: "blue", fontWeight: "500"}}>ADD FOOD</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 20, borderBottomColor: colors.LIGHT_GREY}}></View>

        <View style={styles.childAdding}>
          <Text style={styles.headerText}>Water</Text>
          <View style={styles.separator}></View>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.addFood}>
              <Text style={{fontSize: 16, color: "blue", fontWeight: "500"}}>ADD FOOD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiaryScreen;
