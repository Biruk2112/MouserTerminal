import axios from 'axios';
import { toast } from 'react-hot-toast';

// API configuration
const MOUSER_API_BASE = 'https://api.mouser.com/api/v1';
const SEARCH_API_KEY = 'cf71f077-8c7b-47ce-a461-013eca30196b';
const ORDER_API_KEY = '1d90e4c1-dd5a-402f-9989-a143b7983656';

// Create separate instances for search and order APIs
export const searchApi = axios.create({
  baseURL: MOUSER_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

export const orderApi = axios.create({
  baseURL: `${MOUSER_API_BASE}/order`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Utility function to safely clone error objects
const safeErrorClone = (error: any) => {
  if (!error) return null;
  
  return {
    message: error.message,
    code: error.code,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
  };
};

// Request interceptors
searchApi.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  config.params.apiKey = SEARCH_API_KEY;
  config.params._t = Date.now();
  return config;
}, (error) => Promise.reject(safeErrorClone(error)));

orderApi.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  config.params.apiKey = ORDER_API_KEY;
  config.params._t = Date.now();
  return config;
}, (error) => Promise.reject(safeErrorClone(error)));

// Response interceptors
const handleApiError = (error: any) => {
  const clonedError = safeErrorClone(error);
  let errorMessage = 'An error occurred';
  
  if (clonedError.status) {
    errorMessage = clonedError.data?.Errors?.[0]?.Message 
      || clonedError.data?.ErrorMessage 
      || `Server error: ${clonedError.status}`;
  } else if (error.request) {
    errorMessage = 'No response from server. Please check your connection.';
  } else {
    errorMessage = clonedError.message || errorMessage;
  }
  
  // Safe console logging without non-cloneable objects
  console.error('API Error:', {
    message: errorMessage,
    status: clonedError.status,
    data: clonedError.data
  });
  
  toast.error(errorMessage);
  return Promise.reject(new Error(errorMessage));
};

searchApi.interceptors.response.use(
  (response) => response,
  handleApiError
);

orderApi.interceptors.response.use(
  (response) => response,
  handleApiError
);

export const handleResponse = <T>(response: any, errorMessage: string): T => {
  if (!response?.data) {
    throw new Error('No data received from server');
  }
  
  if (response.data.Errors?.length > 0) {
    const error = response.data.Errors[0].Message || errorMessage;
    toast.error(error);
    throw new Error(error);
  }
  
  if (response.data.ErrorMessage) {
    toast.error(response.data.ErrorMessage);
    throw new Error(response.data.ErrorMessage);
  }
  
  return response.data;
};