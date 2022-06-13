import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import colors from '../../assets/colors/colors';
import font from '../../assets/fonts/font';
import {LineChart} from 'react-native-chart-kit';
import styles from './style';

const Progress = ({
  name,
  labels,
  data,
  height,
  color,
  lightColor,
  label,
  labelColor,
}) => {
  const hexToRgbA = hex => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
      );
    }
    throw new Error('Bad Hex');
  };

  const countUnique = iterable => {
    return new Set(iterable).size;
  };

  const horizontalLines = countUnique(data) - 1 > 1 ? countUnique(data) - 1 : 2;

  return (
    <View style={styles.card}>
      <View
        style={{
          //height: 200,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignSelf: 'center', margin: 5}}>
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
            height={height}
            //yAxisLabel="$"
            yAxisSuffix={label}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#000',
              backgroundGradientFrom: lightColor,
              backgroundGradientTo: color,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => hexToRgbA(labelColor),
              labelColor: (opacity = 1) => hexToRgbA('#000'),
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: colors.PURE_WHITE,
              },
              propsForVerticalLabels: {
                fontWeight: '900',
                fontSize: 16,
                fontFamily: font.DEFAULT_FONT,
              },
              propsForHorizontalLabels: {
                fontWeight: '900',
                fontSize: 14,
                fontFamily: font.DEFAULT_FONT,
              },
            }}
            segments={horizontalLines} // the amount of horizontal lines
            bezier
            style={{
              //marginVertical: 8,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: font.DEFAULT_FONT,
            fontSize: 16,
            color: labelColor,
            fontWeight: '900',
          }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default Progress;
