import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
  FlatList,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {ENV} from '../../constants/ENV';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Nutritious',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={styles.iconNotification} >
          <TouchableOpacity onPress={() => {navigation.navigate("NotificationScreen")}}>
            <Ionicons
              name="notifications"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://shop-adidas.herokuapp.com/api/product',
      );
      const json = await response.json();
      console.table(json.results);
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const axiosFetch = () => {
    axios
      .get(`${ENV.BASE_URL}product`)
      .then(res => {
        console.log('Data: ', res.data.results.length);
        setData(res.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  useEffect(() => {
    axiosFetch();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
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
              <Text style={[styles.textChild, {color: "blue", fontSize: 16, fontWeight: "700"}]}>2.090</Text>
              <Text style={[styles.textChild, {fontWeight: '300'}]}>
                Remaining
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
