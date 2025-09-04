import { AuthenticationService } from "../../services/auth/AuthService"
import axiosInstance from "../../config/axiosConfig"

export const getDespesas = async () => {
    if (AuthenticationService.getToken() == null) {
        AuthenticationService.doDevLogin()
    }

    const response = await axiosInstance.get('lancamentos/index')
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
export const deleteDespesa = async (id: string, atualizarDados: () => void) => {
    const confirmacao = window.confirm('Você tem certeza que deseja deletar este item?');

    if (confirmacao) {
        try {
            // Envia a requisição DELETE para a API, passando a ID como query parameter
            await axiosInstance.delete(`/despesa/delete?id=${id}`);

            alert('Item deletado com sucesso!');
            // Atualiza os dados na interface. `atualizarDados` deve ser uma função passada como prop
            atualizarDados();
        } catch (error) {
            console.error('Erro ao deletar o item:', error);
            alert('Erro ao tentar deletar o item.');
        }
    }
};