import {Text, View, Dimensions, ActivityIndicator} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext} from 'react';
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
import {DataContext} from '../../context/Context';
import Progress from '../../components/Progress';

const ProgressScreen = () => {
  const context = useContext(DataContext);
  const user = context.user;
  const weights = context.weight;

  const formatDate = input => {
    var datePart = input.match(/\d+/g),
      month = datePart[1],
      day = datePart[2];

    return day + '/' + month;
  };
  const data = weights?.map(item => {
    return item.weight_log;
  });

  const labels = weights?.map(item => {
    return formatDate(item?.date);
  });
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Progress',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const startWeight = user?.process.starting_weight;
  const currentWeight = user?.process.current_weight;

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
        <View style={[styles.childHeader]}>
          <Text style={styles.textChildHeader}>
            {currentWeight > startWeight
              ? currentWeight - startWeight
              : startWeight - currentWeight}{' '}
            kg
          </Text>
          <Text style={styles.textChildHeader}>
            {currentWeight > startWeight ? `(+` : `(-`}{' '}
            {Math.round(
              (Math.abs(startWeight - currentWeight) / startWeight) * 100,
            )}{' '}
            %)
          </Text>
        </View>
      </View>
      {weights?.length > 0 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {data: data},
              // {
              //   key: 'dummy-range-padding',
              //   data: [0, 100],
              //   color: () => 'rgba(0, 0, 0, 0)',
              //   strokeDashArray: [0, 1000],
              //   withDots: false,
              // },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={320}
          //yAxisLabel="$"
          yAxisSuffix=" kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#000',
            backgroundGradientFrom: '#ffba62',
            backgroundGradientTo: '#ffa726',
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
            propsForVerticalLabels: {
              fontWeight: '500',
              fontSize: 16,
              fontFamily: font.DEFAULT_FONT,
            },
            propsForHorizontalLabels: {
              fontWeight: '500',
              fontSize: 14,
              fontFamily: font.DEFAULT_FONT,
            },
          }}
          segments={4} // the amount of horizontal lines
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      ) : (
        <ActivityIndicator
          size={'large'}
          color={colors.BACK_GROUND_COLOR}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )}
    </View>
  );
};

export default ProgressScreen;
