// Tipo genérico para dados (pode ser qualquer objeto)
export type RowData = Record<string, any>;

export type Column<T extends RowData> = {
  header: string;                 // Título da coluna
  accessor: keyof T;              // Nome da chave que vai buscar no dado
  className?: string;             // Classe CSS opcional
  cell?: (value: any) => React.ReactNode; // Formatação opcional
};
