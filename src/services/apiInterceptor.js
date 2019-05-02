import axios from 'axios';
import { getToken } from './auth';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API });

axiosInstance.interceptors.request.use(
  (config) => {
    const customConfig = config;

    const token = getToken();

    if (token) {
      customConfig.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers['Content-Type']) {
      customConfig.headers['Content-Type'] = 'application/json';
    }
    return customConfig;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let msgError = {
      status: '',
      msg: '',
    };

    if (error.response) {
      msgError = {
        status: error.response.status,
        msg: error.response.data.error_description
          ? error.response.data.error_description
          : error.response.data.message,
      };
    }

    return Promise.reject(msgError);
  },
);

export default axiosInstance;
