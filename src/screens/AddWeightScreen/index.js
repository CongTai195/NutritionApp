import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import SearchInput from '../../components/SearchInput';
import AddFoodItem from '../../components/AddFoodItem';
import AnimatedLottieView from 'lottie-react-native';
import font from '../../assets/fonts/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {color} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useToast} from 'react-native-toast-notifications';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import Progress from '../../components/Progress';

const AddWeightScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const context = useContext(DataContext);
  const user = context?.user;
  const route = useRoute();
  const [logType, setSelectedLogType] = useState(route.params.index || 0);
  const [date, setDate] = useState(new Date(route.params.date));
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);

  const formatDate = input => {
    var datePart = input.match(/\d+/g),
      month = datePart[1],
      day = datePart[2];

    return day;
  };

  const [weights, setWeights] = useState(context.weight_week);

  const data_weight = weights?.map(item => {
    return item.weight_log;
  });

  const data_heart_rate = weights?.map(item => {
    return item.heart_rate_log;
  });

  const data_blood = weights?.map(item => {
    return item.blood_pressure_log;
  });

  const labels = weights?.map(item => {
    if (item?.date === moment().toDate().toISOString().split('T')[0]) {
      return 'Today';
    } else return formatDate(item?.date);
  });

  let logArray = [
    {
      id: 1,
      name: 'Weight',
      data: data_weight,
      labels: labels,
      lightColor: '#ffbc59',
      color: '#ffa726',
      labelColor: '#e18600',
      label: ' kg',
    },
    {
      id: 2,
      name: 'Heart Rate',
      data: data_heart_rate,
      labels: labels,
      lightColor: '#ff828e',
      color: '#ff717e',
      labelColor: '#ff0b21',
      label: ' BPM',
    },
    {
      id: 3,
      name: 'Blood Pressure',
      data: data_blood,
      labels: labels,
      color: '#edbba0',
      lightColor: '#f6d3bd',
      labelColor: '#df8859',
      label: '',
    },
  ];

  const getTime = item => {
    if (item === time) {
      return logArray[logType].labelColor;
    } else return '#fff';
  };

  const getLabel = item => {
    if (item === time) {
      return logArray[logType].labelColor;
    } else return '#000';
  };

  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        logType === 0
          ? `Weight Log`
          : logType === 1
          ? 'Heart Rate Log'
          : 'Blood Pressure Log',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            onPress={() => getDiary(date.toISOString().split('T')[0])}>
            <Ionicons
              name="checkmark-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, weight, date, logType]);

  const createDiary = async date => {
    try {
      const body =
        logType === 0
          ? {
              date: date,
              is_enough: 0,
              weight_log: weight,
            }
          : logType === 1
          ? {
              date: date,
              is_enough: 0,
              heart_rate_log: weight,
            }
          : {
              date: date,
              is_enough: 0,
              blood_pressure_log: weight,
            };
      const response = await fetch(`${context.BASE_URL}/api/diary`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        setWeight('');
        context.getUser();
        context.getWeight();
        toast.show('Data logged successfully', {
          type: 'success',
          placement: 'bottom',
          duration: 1700,
          offset: 30,
          animationType: 'slide-in',
        });
        const time = setTimeout(() => {
          navigation.navigate('HomeScreen');
        }, 1700);
        return () => clearTimeout(time);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDiary = async date => {
    try {
      const body =
        logType === 0
          ? {
              weight_log: weight,
            }
          : logType === 1
          ? {
              heart_rate_log: weight,
            }
          : {
              blood_pressure_log: weight,
            };
      const response = await fetch(
        `${context.BASE_URL}/api/diary/detail?date=${date}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
          },
        },
      );
      const result = await response.json();
      if (result.status === 'OK') {
        const diary_id = result.results.id;
        const action = await context.updateDiary(diary_id, body);
        if (action) {
          setWeight('');
          toast.show('Data logged successfully', {
            type: 'success',
            placement: 'bottom',
            duration: 1700,
            offset: 30,
            animationType: 'slide-in',
          });
          const time = setTimeout(() => {
            navigation.navigate('HomeScreen');
            context.getWeight();
            context.getUser();
          }, 1700);
          return () => clearTimeout(time);
        }
      }
      if (result.status === 'NG') {
        createDiary(date);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.others}>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Change data</Text>
        </View>
        <View style={styles.childOthers}>
          <Picker
            style={{height: 50, flex: 1}}
            useNativeAndroidPickerStyle={false}
            selectedValue={logType}
            onValueChange={itemValue => setSelectedLogType(itemValue)}>
            <Picker.Item label={'Weight'} value={0} />
            <Picker.Item label={'Heart Rate'} value={1} />
            <Picker.Item label={'Blood Pressure'} value={2} />
          </Picker>
        </View>
      </View>
      <View style={styles.others}>
        {/* <TouchableOpacity activeOpacity={0.5}> */}
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>
            {logType === 0
              ? `Weight`
              : logType === 1
              ? 'Heart Rate'
              : 'Blood Pressure'}
          </Text>
          <View style={[styles.textInput, {marginHorizontal: 15}]}>
            <TextInput
              maxLength={4}
              placeholder={
                logType === 0
                  ? `${user?.process?.current_weight} kg`
                  : logType === 1
                  ? 'BPM'
                  : 'mm/Hg'
              }
              placeholderTextColor="#c4c4c4"
              style={styles.servingSizeText}
              keyboardType={'numeric'}
              //value={weight.toString()}
              onChangeText={value => {
                setWeight(value);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          activeOpacity={0.5}>
          <View style={styles.childOthers}>
            <Text style={styles.labelText}>Date</Text>
            <Text style={styles.servingSizeText}>
              {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //flex: 1,
          backgroundColor: colors.PURE_WHITE,
          width: '95%',
          //alignSelf: 'center',
          marginTop: 10,
          //borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            //borderBottomWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            marginBottom: 0.5,
            width: '100%',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: getTime(0),
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setTime(0);
                setWeights(context.weight_week);
              }}>
              <Text
                style={{
                  flex: 1,
                  color: getLabel(0),
                  fontSize: 16,
                  fontFamily: font.DEFAULT_FONT,
                  fontWeight: '900',
                  marginHorizontal: 10,
                }}>
                1 week
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: getTime(1),
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setTime(1);
                setWeights(context.weight_month);
              }}>
              <Text
                style={{
                  flex: 1,
                  color: getLabel(1),
                  fontSize: 16,
                  fontFamily: font.DEFAULT_FONT,
                  fontWeight: '900',
                  marginHorizontal: 10,
                }}>
                1 month
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: getTime(2),
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setTime(2);
                setWeights(context.weight_3_months);
              }}>
              <Text
                style={{
                  flex: 1,
                  color: getLabel(2),
                  fontSize: 16,
                  fontFamily: font.DEFAULT_FONT,
                  fontWeight: '900',
                  marginHorizontal: 10,
                }}>
                3 months
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          //styles.others,
          {
            //alignItems: 'center',
            //backgroundColor: '#fff',
            justifyContent: 'flex-start',
            flex: 1,
          },
        ]}>
        {weights.length > 0 ? (
          <Progress
            color={logArray[logType].color}
            lightColor={logArray[logType].lightColor}
            name={logArray[logType].name}
            data={logArray[logType].data}
            labels={logArray[logType].labels}
            label={logArray[logType].label}
            height={320}
            labelColor={logArray[logType].labelColor}
          />
        ) : null}
      </View>
      <View>
        <DatePicker
          androidVariant="iosClone"
          maximumDate={moment().toDate()}
          minimumDate={new Date(user?.created_at)}
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default AddWeightScreen;
