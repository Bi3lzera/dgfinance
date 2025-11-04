import { AuthenticationService } from "../auth/authService"
import axiosInstance from "../../../config/axiosConfig"
import { Lancamento, Operacao } from "../../types/lancamentoModel"

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
export const createLancamento = async (lancamentoData: Lancamento, onSuccess?: () => void) => {
    try {
        const response = await axiosInstance.post('/lancamentos/createLancamento', lancamentoData);
        
        if (!response || !response.data) {
            throw new Error('Resposta inválida da API');
        }

        let responseData = response.data;
        if (typeof responseData === 'string' && responseData.includes('HTTP/1.0')) {
            const jsonStart = responseData.indexOf('{');
            if (jsonStart !== -1) {
                try {
                    responseData = JSON.parse(responseData.substring(jsonStart));
                } catch (e) {
                    console.error('Erro ao fazer parse do JSON:', e);
                }
            }
        }

        console.log('Dados processados:', responseData);
        
        const lancamentoId = responseData.id;
        
        if (!lancamentoId) {
            throw new Error('ID do lançamento não encontrado na resposta');
        }
        
        if (lancamentoData.agendado === 'N') {
            const operacaoData: Operacao = {
                idLancamento: lancamentoId, // Usando o ID extraído corretamente
                operacao: lancamentoData.tipo,
                valorOperacao: parseFloat(lancamentoData.valor.toString()),
                parcelaOperacao: 1,
                dataOperacao: lancamentoData.data,
                idFormaPagamento: lancamentoData.idFormaPagamento,
                idBanco: lancamentoData.idBanco
            };

            createOperacao(operacaoData);

            console.log('Operação criada com sucesso!');
        }

        // Chama o callback de sucesso se ele foi fornecido
        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.error('Erro ao criar o lançamento/operação:', error);
    }
}
export const createOperacao = async (operacaoData: Operacao) => {
    try {
        await axiosInstance.post('/lancamentos/createOperacao', operacaoData);
        console.log('Operação criada com sucesso!');
    }catch (error){
        console.error('Erro ao criar a operação:', error);
    }
}