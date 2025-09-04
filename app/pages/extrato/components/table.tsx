import React from 'react';
import { useTable } from 'react-table';
import '../style/table.css';

interface Props {
  dados: Array<{ data: string; descricao: string; valor: number; bancoNome: string; formaPagamentoNome: string; fParcela: string; }>;
}

function Tabela(props: Props) {
  const { dados } = props;

    const formatarValor = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            
        }).format(valor);
    };

  const colunas = React.useMemo(() => [
    { Header: 'Data', accessor: 'data', className: 'dataColumn'},
    { Header: 'Descrição', accessor: 'descricao', className: 'descriptionColumn' },
    { Header: 'Banco', accessor: 'bancoNome', classnames: 'bancoColumn' },
    { Header: 'Forma Pagamento', accessor: 'formaPagamentoNome', classnames: 'formaPagamentoColumn' },
    { Header: 'Parcela', accessor: 'fParcela' , className: 'parcelaColumnn' },
    { Header: 'Valor', accessor: 'valor', className: 'valorColumn', 
      Cell: ({ value, row }: { value: number, row: any }) => {
        const tipo = row.original.tipo;
        const cor = tipo === 'R' ? 'valor-positivo' : tipo === 'D' ? 'valor-negativo' : '';
        return (
          <span className={cor}>
            {formatarValor(value)}
          </span>
        );
      }
    },
    { Header: 'Tipo', accessor: 'tipo', className: 'tipoColumn' },
    
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: colunas, data: dados });

  return (
    <table {...getTableProps()} className="table">
      <thead className='tableHeader sticky top-0 bg-blue-300'>
        {headerGroups.map((headerGroup: { getHeaderGroupProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: { getHeaderProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
              <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className='tableBody'>
        {rows.map((row: { getRowProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: { getCellProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                return <td {...cell.getCellProps()} className={cell.column.className}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Tabela;