import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

    return day;
  };
  const data = weights?.map(item => {
    return item.weight_log;
  });

  const labels = weights?.map(item => {
    return formatDate(item?.date);
  });
  let logArray = [
    {
      id: 1,
      name: 'Weight',
      data: data,
      labels: labels,
      lightColor: '#ffbc59',
      color: '#ffa726',
      labelColor: '#e18600',
      label: ' kg',
    },
    // {
    //   id: 2,
    //   name: 'Heart Rate',
    //   data: data_heart_rate,
    //   labels: labels,
    //   lightColor: '#ff828e',
    //   color: '#ff717e',
    //   labelColor: '#ff0b21',
    //   label: ' BPM',
    // },
    // {
    //   id: 3,
    //   name: 'Blood Pressure',
    //   data: data_blood,
    //   labels: labels,
    //   color: '#edbba0',
    //   lightColor: '#f6d3bd',
    //   labelColor: '#df8859',
    //   label: '',
    // },
  ];
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
      {/* <Banner /> */}
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          marginTop: 10,
          marginRight: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddWeightScreen', {
              date: diary.date,
              index: activeLogIndex,
            });
          }}>
          <Ionicons name="add-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {weights.length > 0 ? (
        <Progress
          name={logArray[0].name}
          data={logArray[0].data}
          labels={logArray[0].labels}
          label={logArray[0].label}
          color={logArray[0].color}
          lightColor={logArray[0].lightColor}
          labelColor={logArray[0].labelColor}
          height={320}
        />
      ) : null}
    </View>
  );
};

export default ProgressScreen;
