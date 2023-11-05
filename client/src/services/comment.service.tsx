import axios from 'axios';

import { getCurrentUser, logout } from './auth.service';

const API_URL = 'http://localhost:8000/api/comments';

export const getAllComments = (caseId: string) => {
  return axios
    .get(API_URL + `?caseId=${caseId}`, { withCredentials: true })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logout();
      }
    });
};

export const createTextComment = (caseId: string, message: string) => {
  const commenterId = getCurrentUser()._id;
  return axios
    .post(
      API_URL,
      { case: caseId, message: message, commenter: commenterId },
      { withCredentials: true }
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logout();
      }
    });
};
