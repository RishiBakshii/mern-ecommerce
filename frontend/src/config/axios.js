import axios from 'axios';

export const axiosi = axios.create({
  baseURL: 'http://localhost:8000', // Updated to match the backend server URL
  withCredentials: true,
});

// Add a request interceptor to include authentication headers
axiosi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized: Redirecting to login...');
        // Optionally redirect to login page
      } else if (error.response.status === 500) {
        console.error('Internal Server Error: Please check the backend.');
      }
    }
    return Promise.reject(error);
  }
);