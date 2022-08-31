import React, { ReactElement } from "react";

export interface ColumnData {
    label: string;
}

interface RowComponentType
    extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> {
    content: ReactElement | string;
    className?: string;
}

export interface RowData
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
    onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    components: RowComponentType[];
}

interface TableProps<T> {
    columns: ColumnData[];
    rows: (data: T) => RowData;
    data: T[];
    id?: string;
}

export function Table<T>(props: TableProps<T>) {
    return (
        <table className="tabell" id={props.id}>
            <TableHead columns={props.columns} />
            <TableBody rows={props.rows} data={props.data} />
        </table>
    );
}

interface TableHeadProps {
    columns: ColumnData[];
}

function TableHead(props: TableHeadProps) {
    return (
        <thead>
            <tr>
                {props.columns.map((column, index) => (
                    <th key={index}>{column.label}</th>
                ))}
            </tr>
        </thead>
    );
}

interface TableRowProps {
    row: RowData;
}

function TableRow({ row }: TableRowProps) {
    const { components, ...tableProps } = row;
    return (
        <tr {...tableProps}>
            {components.map((component, index) => {
                const { content, ...tdProps } = component;
                return (
                    <td key={"row_" + index} {...tdProps}>
                        {content}
                    </td>
                );
            })}
        </tr>
    );
}

interface TableBodyProps<T> {
    rows: (data: T) => RowData;
    data: T[];
}

function TableBody<T>(props: TableBodyProps<T>) {
    return (
        <tbody>
            {props.data.map((data, index) => (
                <TableRow key={index} row={props.rows(data)} />
            ))}
        </tbody>
    );
}
