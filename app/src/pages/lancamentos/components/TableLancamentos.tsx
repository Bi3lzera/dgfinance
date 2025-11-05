import { FaTrash } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Table from '../../../components/table/Table.tsx';
import { formatarValorBRL as formatarValor } from '../../../utils/formatacoes.ts';

interface Props {
    dados: any[];
    onAlterar?: (id: string) => void; // Função para alterar, passada como prop
    loading?: boolean;
}

function Tabela(props: Props) {
    const { dados } = props;
    const { onAlterar } = props;

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
        <Table data={dados} columns={colunas} loading={props.loading} />
    )
}

export default Tabela;