import axios from 'axios';

const authFetchProducts = axios.create({
  baseURL: 'http://127.0.0.1:8000/products_api',

  Accept: 'application/json',
});

authFetchProducts.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);

export default authFetchProducts;
