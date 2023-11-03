import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const register = (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  return axios.post(API_URL + '/register', {
    name,
    email,
    password,
    passwordConfirm,
  });
};

export const login = async (email: string, password: string) => {
  return axios.post(
    API_URL + '/login',
    {
      email,
      password,
    },
    { withCredentials: true }
  );
};

export const logout = () => {
  localStorage.removeItem('user');
  return axios.post(API_URL + '/logout', { withCredentials: true });
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
