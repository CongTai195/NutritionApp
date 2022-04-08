import {Text, View, Dimensions} from 'react-native';
import React, {useLayoutEffect} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const ProgressScreen = () => {
  const labels = [
    'Today',
    'Tomorrow',
    '1',
    '2',
    '27-03',
    'April',
    'May',
    'June',
  ];
  const data = [90, 89, 88, 88, 87, 86, 88, 89];
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Progress',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle:{fontWeight: "700", fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const startWeight = 91;
  const currentWeight = 84;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.childHeader}>
          <Text style={styles.textChildHeader}>{startWeight} kg</Text>
          <Text style={styles.textChildHeader}>START</Text>
        </View>
        <View style={styles.childHeader}>
          <Text style={styles.textChildHeader}>{currentWeight} kg</Text>
          <Text style={styles.textChildHeader}>CURRENT</Text>
        </View>
        <View style={[styles.childHeader, {flex: 1.5}]}>
          <Text style={styles.textChildHeader}>
            {currentWeight > startWeight
              ? currentWeight - startWeight
              : startWeight - currentWeight}{' '}
            kg
          </Text>
          <Text style={styles.textChildHeader}>
            CHANGE {currentWeight > startWeight ? `(+` : `(-`}{' '}
            {(Math.round(((startWeight - currentWeight) / startWeight) * 100))} %)
          </Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width*95/100} // from react-native
        height={320}
        //yAxisLabel="$"
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(36,37,60, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.PURE_WHITE,
          },
        }}
        segments={4} // the amount of horizontal lines
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 20,
        }}
      />
    </View>
  );
};

export default ProgressScreen;
