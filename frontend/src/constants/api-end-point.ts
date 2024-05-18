import axios from 'axios';

const endpointPrefix = '/api';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
});

export const API_END_POINTS = {
  AUTH: endpointPrefix + '/auth',
  ROOM: endpointPrefix + '/room',
};
