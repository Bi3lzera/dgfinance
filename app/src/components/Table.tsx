import { Column, RowData } from "./types.ts";

type DataTableProps<T extends RowData> = {
    columns: Column<T>[];
    data: T[];
};

export default function DataTable<T extends RowData>({ columns, data }: DataTableProps<T>) {
    return (
        <div className="max-h-85 overflow-auto rounded-md shadow-md">
            <table className="min-w-full border-collapse shadow-lg">
                <thead className='sticky top-0 bg-blue-300 rounded-tb-md'>
                    <tr className="rounded-md">
                        {columns.map((col, index) => (
                            <th key={index} className={`px-4 py-2 font-bold ${col.className ?? ""}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className='hover:bg-gray-100 h-7 border-b border-gray-100'>
                            {columns.map((col, colIndex) => {
                                const rawValue = row[col.accessor];
                                return (
                                    <td key={colIndex} className={`${col.className ?? ""}`}>
                                        {col.cell ? col.cell(rawValue) : rawValue}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
