import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/', // set your backend's base URL here
});

export default instance;
