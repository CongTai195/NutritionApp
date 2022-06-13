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
      weight_week: [],
      weight_month: [],
      weight_3_months: [],

      today: moment().toDate().toISOString().split('T')[0],
      diary_today: [],

      isLoading: false,

      BASE_URL: 'http://10.0.2.2:8000',
      token: null,
    };
  }

  // updateUserCurrentWeight = () => {
  //   try {
  //     this.setState({user: {}});
  //     const response = await fetch(`${this.state.BASE_URL}/api/getUser`, {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization:
  //           `Bearer` + (await AsyncStorage.getItem('@storage_Key')),
  //       },
  //       method: 'GET',
  //     });
  //     const result = await response.json();
  //     if (result.status === 'OK') {
  //       this.setState({user: result.results.info});
  //     } else {
  //       alert('Invalid username or password');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  getWeight = async () => {
    try {
      const response = await fetch(`${this.state.BASE_URL}/api/diary`, {
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
        this.setState({weight_week: result.results[0]});
        this.setState({weight_month: result.results[1]});
        this.setState({weight_3_months: result.results[2]});
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  setToken = async () => {
    this.setState({token: await AsyncStorage.getItem('@storage_Key')});
  };

  removeToken = () => {
    this.setState({token: null});
  };

  setRegisterData = ({name, value}, callback) => {
    this.setState(
      {
        register_data: {...this.state.register_data, [name]: value},
      },
      callback,
    );
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
      // this.setState({user: {}});
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
    this.setState({isLoading: isLoading});
  };

  login = async (userName, password) => {
    try {
      this.setIsLoading(true);
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
        this.setIsLoading(false);
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
      this.setIsLoading(true);
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
        this.setState({register_data: {}});
        await AsyncStorage.setItem('@storage_Key', result.results.token);
        this.setState({user: result.results.info});
        return true;
      } else {
        console.log(result);
        setTimeout(() => {
          alert('Fail Register');
        }, 1500);
        return false;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.setIsLoading(false);
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
        await AsyncStorage.removeItem('@storage_Key');
        this.removeToken();
        this.setState({user: {}});
        this.setState({diary_today: {}});
        this.setState({diary: []});
        this.setState({weight: []});
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
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
        this.createDiary(date);
      }
    } catch (error) {
      console.error(error);
    }
    this.getWeight();
  };

  updateDiary = async (diaryID, params) => {
    try {
      const response = await fetch(
        `${this.state.BASE_URL}/api/diary/${diaryID}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer' + (await AsyncStorage.getItem('@storage_Key')),
          },
          method: 'PUT',
          body: JSON.stringify(params),
        },
      );
      const result = await response.json();
      if (result.status === 'OK') {
        return true;
      } else {
        console.log(result);
        alert('Error updating food');
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  createDiary = async date => {
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
          is_enough: 0,
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
      weight_week,
      weight_month,
      weight_3_months,
    } = this.state;
    const {
      login,
      logout,
      register,
      addUser,
      getDiary,
      setIsLoading,
      setRegisterData,
      setToken,
      updateDiary,
      getWeight,
      getUser,
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
          weight_week,
          weight_month,
          weight_3_months,
          getWeight,
          setRegisterData,
          setIsLoading,
          getDiary,
          addUser,
          login,
          register,
          logout,
          setToken,
          updateDiary,
          getUser,
        }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
