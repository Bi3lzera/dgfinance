import { AuthenticationService } from "../auth/AuthService"
import axiosInstance from "../../../config/axiosConfig"

export const getExtrato = async () => {
    if (AuthenticationService.getToken() == null) {
        AuthenticationService.doDevLogin()
    }
}