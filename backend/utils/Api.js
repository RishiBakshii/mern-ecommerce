const axios = require('axios');

const API = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend's port
});

export default API;
