import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

export const getCurrentUser = () => {
  return axios
    .get(API_URL + '/me', { withCredentials: true })
    .then((response) => {
      console.log('here!!');
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    });
};

export const getAllUsers = () => {
  return axios.get(API_URL, { withCredentials: true });
};
