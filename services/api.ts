import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import {AuthenticationService} from './AuthenticationService';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('@authorization');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      var authenticationService = new AuthenticationService(apiCall);
      const access_token:string = await authenticationService.refreshToken();

      if (access_token) {
        axios.defaults.headers.common['Authorization'] = access_token;
        originalRequest.headers['Authorization'] =  access_token;

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

const apiCall = {
  get: async (url: string, token: string = ''): Promise<AxiosResponse<any>> => { 
    const config = token ? { headers: { 'RefreshAuthorization': token } } : {};
    const response = await api.get(url, config);
    return response;
  },

  post: async (url: string, data: any): Promise<AxiosResponse<any>> => {
    const response = await api.post(url, data);
    return response;
  },

  put: async (url: string, data: any): Promise<AxiosResponse<any>> => {
    const response = await api.put(url, data);
    return response.data;
  },

  delete: async (url: string): Promise<AxiosResponse<any>> => {
    const response = await api.delete(url);
    return response.data;
  },
};

export default apiCall;