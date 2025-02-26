import { AuthenticationService } from "../../services/auth/AuthService"
import axiosInstance from "../../config/axiosConfig"

export const getDespesas = async () => {
    if (AuthenticationService.getToken() == null) {
        AuthenticationService.doDevLogin()
    }

    const response = await axiosInstance.get('despesa/index')
    const data = response.data
    return data
}

export const getDespesasAgendadas = async () => {
    if (AuthenticationService.getToken() == null) {
        AuthenticationService.doDevLogin()
    }

    const response = await axiosInstance.get('despesa/despesaAgendada')
    const data = response.data
    return data
}