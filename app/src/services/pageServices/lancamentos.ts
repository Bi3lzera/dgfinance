import { AuthenticationService } from "../auth/AuthService"
import axiosInstance from "../../../config/axiosConfig"

import { useEffect, useState } from "react";

export const getLancamentos = async (mes: string, ano: number) => {
    if (AuthenticationService.getToken() == null) {
        AuthenticationService.doDevLogin()
    }

    const response = await axiosInstance.get('lancamentos/efetivado', {
        params: {
            mes,
            ano
        }
    })
    const data = response.data
    return data
}

export const getLancamentosAgendados = async () => {
    if (AuthenticationService.getToken() == null) {
        AuthenticationService.doDevLogin()
    }

    const response = await axiosInstance.get('lancamentos/agendado')
    const data = response.data
    return data
}
export const deleteLancamento = async (id: string, atualizarDados: () => void) => {
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