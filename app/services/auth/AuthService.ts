import axiosInstance from "../../config/axiosConfig";
//import {LoginFormSchema} from "../pages/LoginPage.tsx";
import {AxiosResponse} from "axios";
import {LoginResponse, UserResponse} from "./types";

export class AuthenticationService {
    static getToken = (): string | null => {
        return localStorage.getItem('token');
    };

    static saveToken = (token: string): void => {
        localStorage.setItem('token', token);
    };

    static deleteToken = (): void => {
        localStorage.removeItem('token');
    };

    static async login<T>(credentials: T): Promise<AxiosResponse<LoginResponse>> {
        const response = await axiosInstance.post<LoginResponse>('/login', credentials) as AxiosResponse<LoginResponse>;
        this.saveToken(response.data.token);
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

    static async doDevLogin (){
        const credentials = { login: 'raegan29@example.org', password: 'password' };
        await this.login(credentials);
    }
}