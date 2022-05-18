import React, {Component, createContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const DataContext = createContext();

export class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      diary: [],
      food_diary: [],
      breakfast_diary: [],
      lunch_diary: [],
      dinner_diary: [],
      food: [],

      today: `${moment().toDate().getDate()}/${
        moment().toDate().getMonth() + 1
      }/${moment().toDate().getFullYear()}`,
      food_diary_today: [],
      exercise_diary_today: [],

      isLoading: false,
    };
  }

  async componentDidMount() {
    if (await AsyncStorage.getItem('@storage_Key')) {
      if (this.state.user.length === 0) {
        this.getUser();
      }
    }
  }

  getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}getUser`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'GET',
      });
      const result = await response.json();
      if (result.status === 'OK') {
        this.setState({user: result.results.info});
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  addUser = user => {
    this.setState({user: user});
  };

  setIsLoading = isLoading => {
    this.setState({isLoading: !isLoading});
  };

  login = async (userName, password) => {
    try {
      const response = await fetch(`${BASE_URL}login`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: userName,
          password: password,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        this.setIsLoading(false);
        await AsyncStorage.setItem('@storage_Key', result.results.token);
        this.setState({user: result.results.info});
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setIsLoading(true);
      }, 1500);
    }
  };

  logout = async token => {
    try {
      const response = await fetch(`${BASE_URL}logout`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + token,
        },
        method: 'GET',
      });
      const result = await response.json();
      if (result.status === 'OK') {
        this.setIsLoading(false);
        await AsyncStorage.removeItem('@storage_Key');
        this.setState({user: {}});
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setIsLoading(true);
      }, 1500);
    }
  };

  getDiary = async date => {
    try {
      const response = await fetch(`${BASE_URL}diary/detail?date=${date}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
      });
      const result = await response.json();
      if (result.status === 'OK') {
        if (date === this.state.today) {
          this.setState({exercise_diary_today: result.results.exercise});
          this.setState({food_diary_today: result.results.food});
        }
        this.setState({diary: result.results});
        this.setState({food_diary: result.results.food});
        this.setState({
          breakfast_diary: result.results.food.filter(
            e => e.meal === 'Breakfast',
          ),
        });
        this.setState({
          lunch_diary: result.results.food.filter(e => e.meal === 'Lunch'),
        });
        this.setState({
          dinner_diary: result.results.food.filter(e => e.meal === 'Dinner'),
        });
      }
      if (result.status === 'NG') {
        this.creatDiary(date);
      }
    } catch (error) {
      console.error(error);
    }
  };

  creatDiary = async date => {
    try {
      const response = await fetch(`${BASE_URL}diary`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
        },
        method: 'POST',
        body: JSON.stringify({
          date: date,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        this.setState({diary_diary: result.results});
        this.setState({food: {}});
        this.setState({breakfast_diary: {}});
        this.setState({lunch_diary: {}});
        this.setState({dinner_diary: {}});
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  searchFood = async searchValue => {
    {
      //this.setState({food: {}});
      try {
        const response = await fetch(`${BASE_URL}search?name=${searchValue}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
          },
        });
        const result = await response.json();
        console.log(result);
        this.setState({food: result.results});
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const {
      user,
      diary,
      food_diary,
      dinner_diary,
      lunch_diary,
      breakfast_diary,
      food_diary_today,
      exercise_diary_today,
      food,
      isLoading,
    } = this.state;
    const {login, logout, addUser, getDiary, searchFood, setIsLoading} = this;
    return (
      <DataContext.Provider
        value={{
          user,
          diary,
          food_diary,
          dinner_diary,
          lunch_diary,
          breakfast_diary,
          food,
          isLoading,
          food_diary_today,
          exercise_diary_today,
          setIsLoading,
          searchFood,
          getDiary,
          addUser,
          login,
          logout,
        }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
