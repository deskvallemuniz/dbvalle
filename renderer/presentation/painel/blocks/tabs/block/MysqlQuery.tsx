"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Editor } from "@monaco-editor/react"
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import React from "react";
import { Button } from "@/components/ui/button";
import { usePainelActionsContext, usePainelContext } from "@/presentation/painel/PainelContext";
import { Table as TableUI, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ColumnDef, ColumnResizeDirection, ColumnResizeMode, flexRender, getCoreRowModel, RowModel, Table, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import { Calendar, FileDigit, Hash, Text } from "lucide-react";
import { ReactGrid, Column, Row, Id } from "@silevis/reactgrid";

import "@silevis/reactgrid/styles.css";

interface Person {
    name: string;
    surname: string;
}

const getPeople = (): Person[] => [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
];

const getColumns = (): Column[] => [
    { columnId: "name", width: 150, resizable: true },
    { columnId: "surname", width: 150, resizable: true }
];

const headerRow: Row = {
    rowId: "header",
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Surname" }
    ]
};

const getRows = (people: Person[]): Row[] => [
    headerRow,
    ...people.map<Row>((person, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: person.name, resizable: true },
            { type: "text", text: person.surname, resizable: true }
        ]
    }))
];

const MysqlQuery = ({ tab }: any) => {
    const ref: any = React.useRef({});
    const [loading, setLoading] = React.useState(false);
    const { fetchData } = usePainelActionsContext()
    const { tabs } = usePainelContext()
    const [query, setQuery] = React.useState("select * from Post")
    const [people] = React.useState<Person[]>(getPeople());

    const [rows, setRows] = React.useState(getRows(people));

    const [columns, setColumns] = React.useState<Column[]>(getColumns());


    const [data, setData] = React.useState(() => [])

    const [columnResizeMode, setColumnResizeMode] =
        React.useState<ColumnResizeMode>('onChange')

    const [columnResizeDirection, setColumnResizeDirection] =
        React.useState<ColumnResizeDirection>('ltr')


    const handleColumnResize = (ci: Id, width: number) => {
        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
            const resizedColumn = prevColumns[columnIndex];
            const updatedColumn = { ...resizedColumn, width };
            prevColumns[columnIndex] = updatedColumn;
            return [...prevColumns];
        });
    }

    React.useEffect(() => {
        setData(tab.data)

        console.log("R", ref)

        const metadata = (tab.metadata || []).map(m => {
            return { columnId: m.name, width: 150, resizable: true }
        });

        setColumns(metadata)
        const rows = [
            {
                rowId: "header",
                cells: metadata.map(m => {
                    return { type: "header", text: m.columnId, resizable: true }
                })
            },
            ...(tab.data || []).map((row, idx) => {
                return {
                    rowId: idx,
                    cells: Object.keys(row).map(r => {

                        return { type: "text", text: (row[r] || "").toString(), resizable: true }
                    })
                }
            })
        ]

        setRows(rows)

        console.log("ROWS", rows)
        setLoading(false)

    }, [tab.data])

    console.log("C", rows)

    return <>
        <div className="flex h-[calc(100vh-58px)] justify-center ">
            <ResizablePanelGroup
                direction="vertical"
                className="h-full"
            >
                <ResizablePanel defaultSize={25}>
                    <Button size="sm" className="m-1" onClick={() => {
                        setLoading(true)
                        fetchData(query, "mysql")
                    }}>Enviar</Button>
                    <Editor value={query} onChange={(value) => {
                        console.log("V", value)
                        setQuery(value)
                    }} defaultLanguage="mysql" />

                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="w-full overflow-x-auto">
                        <ReactGrid ref={ref} rows={rows} columns={columns} onColumnResized={handleColumnResize} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </>
}

export default MysqlQuery