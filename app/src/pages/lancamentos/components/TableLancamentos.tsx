import React from 'react';
import { useState } from 'react';
import Table from '../../../components/table/Table.tsx';
import { formatarValorBRL as formatarValor } from '../../../utils/formatacoes.ts';
import DetailsForm from '../../../components/detailsForm/detailsForm.tsx';
import { getLancamentosById } from '../../../services/pageServices/lancamentos.ts';
import { lancamentoDetailsModel } from '../../../types/lancamentoDetailsModel.ts';
import LoadingScreen from '../../../components/loading/loading.tsx';
interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dados: any[];
    onRowDoubleClick?: (id: number) => void; // Função para alterar, passada como prop
    loading?: boolean;
}

function Tabela(props: Props) {
    const [mostrarDetails, setMostrarDetails] = React.useState(false);
    const [detailsData, setDetailsData] = useState<lancamentoDetailsModel | null>(null);
    const [loading, setLoading] = useState(false);
    const { dados, onRowDoubleClick } = props;

    const handleDoubleClick = async (id: number) => {
        setLoading(true);

        console.log(`Clicado row: ${id}`);
        if (onRowDoubleClick) {
            onRowDoubleClick(id);
        }

        const response = await getLancamentosById(id);

        setDetailsData(response);

        setLoading(false);
        setMostrarDetails(true);
    };

    const colunas = [
        { header: 'Data', accessor: 'data', className: 'text-center' },
        { header: 'Descrição', accessor: 'descricao', className: '' },
        {
            header: 'Valor',
            accessor: 'valor',
            className: 'text-center',
            cell: ({ value }: { value: number }) => formatarValor(value),
        },
        {
            header: 'Valor Pago',
            accessor: 'valorOperacao',
            className: 'text-center',
            cell: ({ value }: { value: number }) => formatarValor(value),
        },
        { header: 'Banco', accessor: 'bancoNome', className: 'text-center' },
        { header: 'Forma Pagamento', accessor: 'formaPagamentoNome', className: 'text-center' },
        { header: 'Parcela', accessor: '', className: 'text-center' },
    ];

    return (
        <>
            <Table data={dados} columns={colunas} loading={props.loading} onRowDoubleClick={(id: number) => handleDoubleClick(id)} />
            { loading && <LoadingScreen/>}
            {mostrarDetails && detailsData && <DetailsForm voltar={() => setMostrarDetails(false)} dados={detailsData} />}
        </>
    )
}

export default Tabela;