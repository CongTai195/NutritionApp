import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import colors from '../../assets/colors/colors';

const CaloriesRemaining = ({goal, food, exercise, onPress}) => {
  return (
    <View style={styles.counter}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Text
          style={{
            fontSize: 16,
            color: colors.PURE_WHITE,
            fontWeight: '900',
            fontFamily: font.DEFAULT_FONT,
          }}>
          Calories Remaining
        </Text>
        <View style={styles.calculator}>
          <View style={styles.childCalculator}>
            <Text style={styles.textChild}>{goal}</Text>
            <Text style={[styles.textChild, {fontWeight: '700'}]}>Goal</Text>
          </View>
          <View style={styles.childCalculator}>
            <Ionicons
              name="remove-outline"
              size={24}
              color={colors.PURE_WHITE}
            />
          </View>
          <View style={styles.childCalculator}>
            <Text style={styles.textChild}>{food}</Text>
            <Text style={[styles.textChild, {fontWeight: '700'}]}>Food</Text>
          </View>
          <View style={styles.childCalculator}>
            <Ionicons name="add-outline" size={24} color={colors.PURE_WHITE} />
          </View>
          <View style={styles.childCalculator}>
            <Text style={styles.textChild}>{exercise}</Text>
            <Text style={[styles.textChild, {fontWeight: '700'}]}>
              Exercise
            </Text>
          </View>
          <View style={styles.childCalculator}>
            <Ionicons
              name="reorder-two-outline"
              size={24}
              color={colors.PURE_WHITE}
            />
          </View>
          <View style={styles.childCalculator}>
            <Text
              style={[
                styles.textChild,
                {color: colors.ORANGE, fontSize: 16, fontWeight: '700'},
              ]}>
              {goal - food + exercise}
            </Text>
            <Text style={[styles.textChild, {fontWeight: '700'}]}>
              Remaining
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CaloriesRemaining;
