import React from 'react';
import '../style/table.css';
import Tabela from '../../../components/table/Table';
import { formatarValorBRL as formatarValor} from '../../../utils/formatacoes';

interface Props {
  dados: Array<{ data: string; descricao: string; valor: number; bancoNome: string; formaPagamentoNome: string; fParcela: string; tipo: string }>;
  loading?: boolean;
}

function TabelaExtrato(props: Props) {
  const { dados } = props;

  const colunas = React.useMemo(() => [
    { header: 'Data', accessor: 'data', className: 'text-center'},
    { header: 'Descrição', accessor: 'descricao', className: '' },
    { header: 'Banco', accessor: 'bancoNome', className: 'text-center' },
    { header: 'Forma Pagamento', accessor: 'formaPagamentoNome', className: 'text-center' },
    { header: 'Parcela', accessor: 'fParcela' , className: 'text-center' },
    { header: 'Valor', accessor: 'valor', className: 'text-right', 
      cell: ({ value, row }: { value: number, row: any }) => {
        const tipo = row.tipo;
        const cor = tipo === 'C' ? 'valor-positivo' : tipo === 'D' ? 'valor-negativo' : '';
        return (
          <span className={cor}>
            {formatarValor(value)}
          </span>
        );
      }
    },
    { header: 'Tipo', accessor: 'tipo', className: 'tipoColumn' },
    
  ], []);

  return (
    <Tabela columns={colunas} data={dados} loading={props.loading} className="h-20"/>
  )     
}

export default TabelaExtrato;