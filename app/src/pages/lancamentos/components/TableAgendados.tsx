import React from 'react';
import { FaTrash } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Tabela from '../../../components/table/Table.tsx';
import { formatarValorBRL as formatarValor } from '../../../utils/formatacoes.ts';

interface Props {
    dados: any[];
    onAlterar?: (id: string) => void; // Função para alterar, passada como prop
    loading?: boolean;
}

function tableAgendados(props: Props) {
    const { dados } = props;
    //const [dados, setDados] = useState(props.dados); // Controla os dados da tabela
    const { onAlterar } = props;

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

    ], [onAlterar]);

    return (
        <Tabela columns={colunas} data={dados} loading={props.loading} />
    )
}

export default tableAgendados;