import React, { useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { IoMdAddCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { deleteLancamento } from '../../../services/pageServices/lancamentos.ts';
import Table from '../../../components/Table.tsx';

type Lancamentos = {
    id: string;
    data: string;
    descricao: string;
    valor: number;
    valorOperacao: number;
    bancoNome: string;
    formaPagamentoNome: string;
    parcela: number;
}

interface Props {
    dados: any[];
    onAlterar: (id: string) => void; // Função para alterar, passada como prop
}

function Tabela(props: Props) {
    const { dados } = props;
    //const [dados, setDados] = useState(props.dados); // Controla os dados da tabela
    const { onAlterar } = props;

    /*
    const handleDelete = async (id: string) => {
        try {
            // Chama a função deleteDespesa do serviço
            await deleteLancamento(id);

            // Remove o item da lista localmente após o sucesso da exclusão
            setDados((prevDados) => prevDados.filter((item) => item.id !== id));
            console.log(`Despesa de ID ${id} deletada com sucesso!`);
        } catch (error) {
            console.error('Erro ao deletar a despesa:', error);
        }
    };
    */

    const formatarValor = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    };

    const colunas = [
        { header: 'Data', accessor: 'data', className: 'text-center' },
        { header: 'Descrição', accessor: 'descricao', className: '' },
        {
            header: 'Valor',
            accessor: 'valor',
            className: 'text-center',
            cell: (value: number) => formatarValor(value),
        },
        {
            header: 'Valor Pago',
            accessor: 'valorOperacao',
            className: 'text-center',
            cell: (value: number) => formatarValor(value),
        },
        { header: 'Banco', accessor: 'bancoNome', className: 'text-center' },
        { header: 'Forma Pagamento', accessor: 'formaPagamentoNome', className: 'text-center' },
        { header: 'Parcela', accessor: '', className: 'text-center' },
        {
            header: 'Ações',
            accessor: 'acoes',
            className: 'text-center',
            cell: (row: any) => (
                <div className="flex gap-2 justify-center">
                    <FaTrash
                        className="text-1xl cursor-pointer"
                        onClick={() => handleDelete(row.original.id)} // Conecta a função de exclusão
                    />
                    <HiMiniPencilSquare
                        className="text-1xl cursor-pointer"
                        onClick={() => onAlterar(row.original.id)} // Conecta a função de alteração
                    />
                </div>
            ),
        }
    ];

    /*
    const colunas = React.useMemo(() => [
        { Header: 'Data', accessor: 'data', className: 'text-center' },
        
        { Header: 'Descrição', accessor: 'descricao', className: '' },
        {
            Header: 'Valor',
            accessor: 'valor',
            className: 'text-center',
            Cell: ({ value }: { value: number }) => formatarValor(value),
        },
        {
            Header: 'Valor Pago',
            accessor: 'valorOperacao',
            className: 'text-center',
            Cell: ({ value }: { value: number }) => formatarValor(value),
        },
        { Header: 'Banco', accessor: 'bancoNome', className: 'text-center' },
        { Header: 'Forma Pagamento', accessor: 'formaPagamentoNome', className: 'text-center' },
        { Header: 'Parcela', accessor: '', className: 'text-center' },
        {
            Header: 'Ações',
            accessor: 'acoes',
            className: 'text-center',
            Cell: ({ row }: any) => (
                <div className="flex gap-2 justify-center">
                    <FaTrash
                        className="text-1xl cursor-pointer"
                        onClick={() => handleDelete(row.original.id)} // Conecta a função de exclusão
                    />
                    <HiMiniPencilSquare
                        className="text-1xl cursor-pointer"
                        onClick={() => onAlterar(row.original.id)} // Conecta a função de alteração
                    />
                </div>
            ),
        },
        
    ], [onAlterar]);*/

    return (
        <Table data={dados} columns={colunas} />
    )
}

export default Tabela;