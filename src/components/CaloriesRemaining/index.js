import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';

const CaloriesRemaining = ({goal, food, exercise}) => {
  return (
    <View style={styles.counter}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '900', fontFamily: font.DEFAULT_FONT}}>
              Calories Remaining
            </Text>
            <View style={styles.calculator}>
              <View style={styles.childCalculator}>
                <Text style={styles.textChild}>{goal}</Text>
                <Text style={[styles.textChild, {fontWeight: '300'}]}>
                  Goal
                </Text>
              </View>
              <View style={styles.childCalculator}>
                <Ionicons name="remove-outline" size={24} color={'black'} />
              </View>
              <View style={styles.childCalculator}>
                <Text style={styles.textChild}>{food}</Text>
                <Text style={[styles.textChild, {fontWeight: '300'}]}>
                  Food
                </Text>
              </View>
              <View style={styles.childCalculator}>
                <Ionicons name="add-outline" size={24} color={'black'} />
              </View>
              <View style={styles.childCalculator}>
                <Text style={styles.textChild}>{exercise}</Text>
                <Text style={[styles.textChild, {fontWeight: '300'}]}>
                  Exercise
                </Text>
              </View>
              <View style={styles.childCalculator}>
                <Ionicons
                  name="reorder-two-outline"
                  size={24}
                  color={'black'}
                />
              </View>
              <View style={styles.childCalculator}>
                <Text
                  style={[
                    styles.textChild,
                    {color: 'blue', fontSize: 16, fontWeight: '700'},
                  ]}>
                  {goal - food + exercise}
                </Text>
                <Text style={[styles.textChild, {fontWeight: '300'}]}>
                  Remaining
                </Text>
              </View>
            </View>
          </View>
  )
}

export default CaloriesRemaining;
