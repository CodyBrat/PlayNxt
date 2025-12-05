import axios from 'axios';
import { getToken } from '../utils/storage';

// IMPORTANT: iOS Simulator cannot use 'localhost', must use 127.0.0.1
// For physical device, use your computer's network IP address
const API_URL = __DEV__
    ? 'http://127.0.0.1:3000/api'  // For iOS/Android simulator
    // ? 'http://192.168.1.X:3000/api'  // For physical device (replace X with your IP)
    : 'https://your-production-api.com/api';

console.log('API URL:', API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor - attach token to all requests
api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout - Backend might not be running');
        } else if (error.code === 'ERR_NETWORK') {
            console.error('Network error - Cannot reach backend at', API_URL);
        } else if (error.response?.status === 401) {
            console.log('Unauthorized request');
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me'),
};

// Venue endpoints (for future use)
export const venueAPI = {
    getAll: () => api.get('/venues'),
    getById: (id) => api.get(`/venues/${id}`),
};

export default api;
