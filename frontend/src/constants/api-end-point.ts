import axios from 'axios';

const endpointPrefix = '/api';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export const API_END_POINTS = {
  AUTH: endpointPrefix + '/auth',
  ROOM: endpointPrefix + '/room',
};
