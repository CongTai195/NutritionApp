import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import styles from './style';
import colors from '../../assets/colors/colors';

const CustomDonutChart = ({calories, carbs, fat, protein}) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  //   const carbs = 0;
  //   const fat = 44;
  //   const protein = 56;
  const total = carbs + fat + protein;

  const carbsPercentage = (carbs / total) * 100;
  const fatPercentage = (fat / total) * 100;
  const proteinPercentage = (protein / total) * 100;

  const carbsStrokeDashoffset =
    circleCircumference - (circleCircumference * carbsPercentage) / 100;
  const fatStrokeDashoffset =
    circleCircumference - (circleCircumference * fatPercentage) / 100;
  const proteinStrokeDashoffset =
    circleCircumference - (circleCircumference * proteinPercentage) / 100;

  const carbsAngle = (carbs / total) * 360;
  const fatAngle = (fat / total) * 360;
  const proteinAngle = carbsAngle + fatAngle;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="80" width="80" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={colors.ORANGE}
                  fill="transparent"
                  strokeWidth="10"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={carbsStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={colors.PURPLE}
                  fill="transparent"
                  strokeWidth="10"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={fatStrokeDashoffset}
                  rotation={carbsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={colors.RED_MEET}
                  fill="transparent"
                  strokeWidth="10"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={proteinStrokeDashoffset}
                  rotation={proteinAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
              </>
            )}
          </G>
        </Svg>
        <View style={{position: 'absolute'}}>
          <Text style={styles.label}>{calories}</Text>
          <Text style={styles.label1}>cal</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDonutChart;
