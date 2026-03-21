import axiosInstance from "../../../config/axiosConfig";
//import {LoginFormSchema} from "../pages/LoginPage.tsx";
import { AxiosResponse } from "axios";
import { LoginResponse, UserResponse } from "./types";

export class AuthenticationService {
    static getToken = (): string | null => {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    };

    static saveToken = (token: string, remember: boolean): void => {
        if (remember) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }
    };

    static deleteToken = (): void => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    };

    static async login<T>(credentials: T, remember: boolean = true): Promise<AxiosResponse<LoginResponse>> {
        const response = await axiosInstance.post<LoginResponse>('/login', credentials) as AxiosResponse<LoginResponse>;
        this.saveToken(response.data.token, remember);
        console.log('Login response:', response);
        return response;
    };

    static async tokenLogin(): Promise<AxiosResponse<UserResponse>> {
        return await axiosInstance.get<UserResponse>('/authenticated-user') as AxiosResponse<UserResponse>;
    };

    static async logout(): Promise<void> {
        await axiosInstance.post<void>('/logout');
        this.deleteToken();
    };

    static async isAuthenticated(): Promise<boolean> {
        const token = this.getToken();
        if (token) {
            try {
                await this.tokenLogin();
                return true;
            } catch (error) {
                this.deleteToken();
                window.location.reload();
                return false;
            }
        }
        window.location.reload();
        return false;
    }

    static async doDevLogin() {
        const credentials = { login: 'dev@teste.com', password: 'password' };
        await this.login(credentials, true);
    }
}