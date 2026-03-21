import axios from 'axios';
import { AuthenticationService } from "../src/services/authentication/authService";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api'
});

// INTERCEPTOR DE REQUISIÇÃO (Executado ANTES de qualquer chamada ir pro servidor)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = AuthenticationService.getToken();

        // Se o usuário está tentando fazer algo (qualquer rota que não seja /login) sem token,
        // bloqueamos a requisição imediatamente e forçamos o refresh para a tela de login.
        if (!token && config.url !== '/login') {
            AuthenticationService.deleteToken();
            window.location.reload();
            // Rejeita a requisição para ela nem sequer sair do frontend
            return Promise.reject(new Error("Usuário não autenticado"));
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPOSTA (Executado QUANDO o servidor nos responde)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se a requisição foi feita e o servidor respondeu 401 (Não Autorizado / Token Expirado)
        if (error.response?.status === 401) {
            AuthenticationService.deleteToken();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;