import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import font from '../../assets/fonts/font';
import QuantitySelector from '../../components/QuantitySelector';
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataContext} from '../../context/Context';
import {useToast} from 'react-native-toast-notifications';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

const CreateFoodScreen = () => {
  const toast = useToast();
  const context = useContext(DataContext);
  const user = context.user;
  const navigation = useNavigation();
  const route = useRoute();
  const diary_id = route.params.diary_id;
  const meal = route.params.meal;
  const [isAdded, setIsAdded] = useState(false);

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [serving, setServing] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Food',
      headerTintColor: '#fff',
      headerStyle: {backgroundColor: colors.BACK_GROUND_COLOR},
      headerTitleStyle: {fontWeight: '700', fontFamily: font.DEFAULT_FONT},
      headerTitleAlign: 'center',
      headerRight: () => (
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            disabled={!(name !== '' && detail !== '' && serving !== '')}
            onPress={() => {
              const re = /\d\s\w*$/;
              if (re.test(serving)) {
                navigation.navigate('CreateServingScreen', {
                  name: name,
                  detail: detail,
                  serving: serving,
                  diary_id: diary_id,
                  meal: meal,
                });
              } else {
                alert(
                  'Your serving size must in a format such as "1 bowl, 100g, ..."',
                );
                console.log('NOT OK');
              }
            }}>
            <Ionicons
              name="arrow-forward-outline"
              size={25}
              color={colors.PURE_WHITE}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, name, detail, serving]);

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.others}>
        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Name</Text>

          <View style={[styles.textInput]}>
            <TextInput
              placeholder={'Required'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              //value={weight.toString()}
              onChangeText={value => {
                setName(value);
              }}
            />
          </View>
        </View>

        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Detail</Text>
          <View style={[styles.textInput]}>
            <TextInput
              placeholder={'Required'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              //value={weight.toString()}
              onChangeText={value => {
                setDetail(value);
              }}
            />
          </View>
        </View>

        <View style={styles.childOthers}>
          <Text style={styles.labelText}>Serving Size</Text>
          <View style={[styles.textInput]}>
            <TextInput
              placeholder={'Required'}
              placeholderTextColor="#c4c4c4"
              style={styles.amountText}
              //value={weight.toString()}
              onChangeText={value => {
                setServing(value);
              }}
            />
          </View>
        </View>
      </View>
      <Text
        style={{
          marginHorizontal: 30,
          textAlign: 'center',
          fontSize: 16,
          color: '#ded006',
          fontFamily: font.DEFAULT_FONT,
        }}>
        Your serving size must in a format such as "1 bowl, 100g, ..."
      </Text>
    </ScrollView>
  );
};

export default CreateFoodScreen;
