import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/users_api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
