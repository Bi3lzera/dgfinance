export type RowData = Record<string, any>;

export type CellProps<T extends RowData> = {
  value: T[keyof T];  // valor daquela célula
  row?: T;             // linha inteira (objeto original)
};

export type Column<T extends RowData> = {
  header: string;                           // Título da coluna
  accessor: keyof T;                        // Nome da chave que vai buscar no dado
  className?: string;                       // Classe CSS opcional
  cell?: (props: CellProps<T>) => React.ReactNode; // Função para render customizado
};
