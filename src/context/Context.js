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
      food: [],
      register_data: {},

      today: `${moment().toDate().getDate()}/${
        moment().toDate().getMonth() + 1
      }/${moment().toDate().getFullYear()}`,
      diary_today: [],

      isLoading: false,

      BASE_URL: 'http://10.0.2.2:8000',
      token: null,
    };
  }

  setToken = async () => {
    this.setState({token: await AsyncStorage.getItem('@storage_Key')});
  };

  removeToken = () => {
    this.setState({token: null});
  };

  setRegisterData = ({name, value}) => {
    this.setState({
      register_data: {...this.state.register_data, [name]: value},
    });
  };

  async componentDidMount() {
    if (await AsyncStorage.getItem('@storage_Key')) {
      if (this.state.user.length === 0) {
        this.getUser();
      }
      this.setToken();
    }
  }

  getUser = async () => {
    try {
      const response = await fetch(`${this.state.BASE_URL}/api/getUser`, {
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
      const response = await fetch(`${this.state.BASE_URL}/api/login`, {
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
        await this.setToken();
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

  register = async (
    name,
    email,
    password,
    gender,
    age,
    height,
    starting_weight,
    goal_weight,
    weekly_goal,
    activity_level,
  ) => {
    try {
      const response = await fetch(`${this.state.BASE_URL}/api/register`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          gender: gender,
          age: age,
          height: height,
          starting_weight: starting_weight,
          goal_weight: goal_weight,
          weekly_goal: weekly_goal,
          activity_level: activity_level,
        }),
      });
      const result = await response.json();
      if (result.status === 'OK') {
        alert('Register Successfully');
      } else {
        alert('Fail Register');
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

  logout = async token => {
    try {
      const response = await fetch(`${this.state.BASE_URL}/api/logout`, {
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
        await this.removeToken();
        this.setState({user: {}});
        this.setState({diary_today: {}});
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
      const response = await fetch(
        `${this.state.BASE_URL}/api/diary/detail?date=${date}`,
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
        if (date === this.state.today) {
          this.setState({diary_today: result.results});
        }
        this.setState({diary: result.results});
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
      const response = await fetch(`${this.state.BASE_URL}/api/diary`, {
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
        if (date === this.state.today) {
          this.setState({diary_today: result.results});
        }
        this.setState({diary: result.results});
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      user,
      register_data,
      diary,
      diary_today,
      food,
      BASE_URL,
      token,
      isLoading,
    } = this.state;
    const {
      login,
      logout,
      register,
      addUser,
      getDiary,
      setIsLoading,
      setRegisterData,
    } = this;
    return (
      <DataContext.Provider
        value={{
          user,
          diary,
          food,
          isLoading,
          diary_today,
          BASE_URL,
          register_data,
          token,
          setRegisterData,
          setIsLoading,
          getDiary,
          addUser,
          login,
          register,
          logout,
        }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
