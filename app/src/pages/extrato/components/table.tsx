import React from 'react';
import { useTable } from 'react-table';

interface Props {
  dados: any[];
}

function Tabela(props: Props) {
  const { dados } = props;

  const colunas = React.useMemo(() => [
    { Header: 'Data', accessor: 'data' },
    { Header: 'Descrição', accessor: 'descricao', className: 'ExtratoTableDescription' },
    { Header: 'Valor', accessor: 'valor' },
    { Header: 'Banco', accessor: 'idBanco' },
    { Header: 'Forma Pagamento', accessor: 'idFormaPagamento' },
    { Header: 'Parcela', accessor: 'fParcela' , className: 'fParcela' },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: colunas, data: dados });

  return (
    <table {...getTableProps()} className="ExtratoTable">
      <thead className='ExtratoTableHeader'>
        {headerGroups.map((headerGroup: { getHeaderGroupProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: { getHeaderProps: () => React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableHeaderCellElement> & React.ThHTMLAttributes<HTMLTableHeaderCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
              <th {...column.getHeaderProps()} className={column.className}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className='ExtratoTableBody'>
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