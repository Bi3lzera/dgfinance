import React, {useState} from 'react';
import {useTable} from 'react-table';
import axios from 'axios';
import {IoMdAddCircle} from "react-icons/io";
import {FaTrash} from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { deleteDespesa } from '../../pagesServices/despesa';

interface Props {
    dados: any[];
    onAlterar: (id: string) => void; // Função para alterar, passada como prop
}

function Tabela(props: Props) {
    const {dados} = props;
    //const [dados, setDados] = useState(props.dados); // Controla os dados da tabela
    const { onAlterar } = props;

    const handleDelete = async (id: string) => {
        try {
            // Chama a função deleteDespesa do serviço
            await deleteDespesa(id);

            // Remove o item da lista localmente após o sucesso da exclusão
            setDados((prevDados) => prevDados.filter((item) => item.id !== id));
            console.log(`Despesa de ID ${id} deletada com sucesso!`);
        } catch (error) {
            console.error('Erro ao deletar a despesa:', error);
        }
    };


    const formatarValor = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    };

    const colunas = React.useMemo(() => [
        { Header: 'Data', accessor: 'data', className: 'text-center' },
        { Header: 'Descrição', accessor: 'descricao', className: '' },
        {
            Header: 'Valor',
            accessor: 'valor',
            className: 'text-center',
            Cell: ({ value }: { value: number }) => formatarValor(value),
        },
        { Header: 'Banco', accessor: 'bancoNome', className: '' },
        { Header: 'Forma Pagamento', accessor: 'formaPagamentoNome', className: '' },
        { Header: 'Parcela', accessor: 'fParcela', className: 'text-center' },
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
    ], [onAlterar]);


    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
        columns: colunas,
        data: dados
    });

    return (
        <div className="max-h-64 overflow-auto rounded-md shadow-md" >
            <table {...getTableProps()} className="min-w-full border-collapse shadow-lg">
                <thead className='sticky top-0 bg-blue-300 rounded-tb-md'>
                {headerGroups.map((headerGroup: {
                    getHeaderGroupProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>;
                    headers: any[];
                }) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: {
                            getHeaderProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                            render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
                        }) => (
                            <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className=''>
                {rows.map((row: {
                    getRowProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>;
                    cells: any[];
                }) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className='hover:bg-gray-100 h-7 border-b border-gray-100'>
                            {row.cells.map((cell: {
                                getCellProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>;
                                render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
                            }) => {
                                return <td {...cell.getCellProps()}
                                           className={cell.column.className}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;