import axios from 'axios';

import { logout } from './auth.service';

const API_URL = 'http://localhost:8000/api/users';

export const getCurrentUser = () => {
  return axios
    .get(API_URL + '/me', { withCredentials: true })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    });
};

export const getAllUsers = () => {
  return axios
    .get(API_URL, { withCredentials: true })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logout();
      }
    });
};
