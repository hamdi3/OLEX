import axios from 'axios';
const authFetch = axios.create({
  baseURL: 'http://127.0.0.1:8000/users_api',
  timeout: 1000,
  Accept: 'application/json',
});

authFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('refresh_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);

export default authFetch;
