import axios from 'axios';

import { logout } from './auth.service';

const API_URL = 'http://localhost:8000/api/caseReviews';

export const getAllCaseReviews = () => {
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

export const getCaseReviewDetails = (id: string) => {
  return axios
    .get(API_URL + `/${id}`, { withCredentials: true })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logout();
      }
    });
};

export const updateCaseReviewDetails = (id: string, caseReviewData: any) => {
  return axios
    .put(API_URL + `/${id}`, caseReviewData, { withCredentials: true })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logout();
      }
    });
};
