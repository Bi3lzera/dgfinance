import axios from 'axios';
import {AuthenticationService} from "../src/services/auth/AuthService";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = AuthenticationService.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.baseURL = 'http://localhost:8000/api';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;