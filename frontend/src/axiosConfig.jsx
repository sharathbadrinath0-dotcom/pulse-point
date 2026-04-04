import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.211.135.140:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;