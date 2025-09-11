import React from "react";

type Column = {
    header: string;
    acessor: string;
    className?: string;
}

type Props<T> = {
    data: any[];
    columns: Column[];
}

export default function Table<T>({ data, columns }: Props<T>) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th key={i}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col, j) => (
                            <td key={j} className={col.className}>
                                {row.acessor}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}