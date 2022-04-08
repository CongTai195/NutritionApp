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
import CaloriesRemaining from '../../components/CaloriesRemaining';
import font from '../../assets/fonts/font';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Nutritious',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle:{fontWeight: "700", fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={styles.iconNotification} >
          <TouchableOpacity onPress={() => {navigation.navigate("LoginScreen")}}>
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
  const goal = 2090;
  const food = 0;
  const exercise = 0;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <CaloriesRemaining goal={goal} food={food} exercise={exercise} />
      )}
    </View>
  );
};

export default HomeScreen;
