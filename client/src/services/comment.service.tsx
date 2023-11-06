import axios from 'axios';

import { getCurrentUser, logout } from './auth.service';

const API_URL = 'http://localhost:8000/api/comments';

interface CreateParams {
  case: string;
  message: string;
  commenter: string;
  imageUrl?: string;
}

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

export const createComment = (
  caseId: string,
  message: string,
  imageUrl?: string
) => {
  const commenterId = getCurrentUser()._id;
  const createParams: CreateParams = {
    case: caseId,
    message: message,
    commenter: commenterId,
  };
  if (imageUrl && imageUrl.length > 0) {
    createParams.imageUrl = imageUrl;
  }
  return axios
    .post(API_URL, createParams, { withCredentials: true })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logout();
      }
    });
};
