import React from 'react';
import Tabela from '../../../components/table/Table.tsx';
import { formatarValorBRL as formatarValor } from '../../../utils/formatacoes.ts';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dados: any[];
    onAlterar?: (id: string) => void; // Função para alterar, passada como prop
    loading?: boolean;
}

function tableAgendados(props: Props) {
    const { dados } = props;
    //const [dados, setDados] = useState(props.dados); // Controla os dados da tabela
    const { onAlterar } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const colunas = React.useMemo(() => [
        { header: 'Data Lançamento', accessor: 'data', className: 'text-center' },
        { header: 'Data Agendada', accessor: 'dataAgendamento', className: 'text-center' },
        { header: 'Descrição', accessor: 'descricao', className: '' },
        {
            header: 'Valor',
            accessor: 'valor',
            className: 'text-center',
            cell: ({ value }: { value: number }) => formatarValor(value),
        },
        { header: 'Parcela', accessor: 'fParcela', className: 'text-center' },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [onAlterar]);

    return (
        <Tabela columns={colunas} data={dados} loading={props.loading} />
    )
}

export default tableAgendados;