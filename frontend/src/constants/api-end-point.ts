import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
});

export const API_END_POINTS = {
  AUTH: '/auth',
  ROOM: '/room',
};
