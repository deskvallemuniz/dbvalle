"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Editor } from "@monaco-editor/react"
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import React from "react";
import { Button } from "@/components/ui/button";
import { usePainelActionsContext, usePainelContext } from "@/presentation/painel/PainelContext";
import { Table as TableUI, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ColumnDef, ColumnResizeMode, flexRender, getCoreRowModel, RowModel, Table, useReactTable } from "@tanstack/react-table";
import moment from "moment";
type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const defaultColumns: ColumnDef<Person>[] = [
    {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
    },
]
const MysqlQuery = ({ tab }: any) => {

    const { fetchData } = usePainelActionsContext()
    const { tabs, date } = usePainelContext()
    const [query, setQuery] = React.useState("select * from Post")
    const [columnResizeMode, setColumnResizeMode] =
        React.useState<ColumnResizeMode>('onChange')

    const metadata = (tab.metadata || []).map(m => {
        return {
            accessorKey: m.name,
            cell: info => {
                if (m.type === 12) {
                    return <div className=" text-nowrap">{moment(info.getValue()).format()}</div>
                }
                return info.getValue()
            },

        }
    })

    console.log("t", date)

    const table = useReactTable({
        data: tab.data || defaultData,
        columns: metadata || defaultColumns,
        //  (tab.metadata || []).map(m => {
        //     return {
        //         accessorKey: m.name,
        //         cell: info => info.getValue(),
        //         footer: props => m.name,
        //     }
        // }),
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
        columnResizeMode,
        columnResizeDirection: "ltr"
    })


    console.log("???")


    return <div className="flex h-[calc(100vh-58px)] justify-center ">
        <ResizablePanelGroup
            direction="vertical"
            className="h-full"
        >
            <ResizablePanel defaultSize={25}>
                <Button size="sm" className="m-1" onClick={() => {
                    fetchData(query, "mysql")
                }}>Enviar</Button>
                <Editor value={query} onChange={(value) => {
                    console.log("V", value)
                    setQuery(value)
                }} defaultLanguage="mysql" />

            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
                <TableUI
                    {...{
                        style: {
                            width: table.getCenterTotalSize(),
                        },
                    }}
                >
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        {...{
                                            key: header.id,
                                            colSpan: header.colSpan,
                                            style: {
                                                width: header.getSize(),
                                            },
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        <div
                                            {...{
                                                onDoubleClick: () => header.column.resetSize(),
                                                onMouseDown: header.getResizeHandler(),
                                                onTouchStart: header.getResizeHandler(),
                                                className: `resizer ${table.options.columnResizeDirection
                                                    } ${header.column.getIsResizing() ? 'isResizing' : ''
                                                    }`,
                                                style: {
                                                    transform:
                                                        columnResizeMode === 'onEnd' &&
                                                            header.column.getIsResizing()
                                                            ? `translateX(${(table.options.columnResizeDirection ===
                                                                'rtl'
                                                                ? -1
                                                                : 1) *
                                                            (table.getState().columnSizingInfo
                                                                .deltaOffset ?? 0)
                                                            }px)`
                                                            : '',
                                                },
                                            }}
                                        />
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell
                                        {...{
                                            key: cell.id,
                                            style: {
                                                width: cell.column.getSize(),
                                            },
                                        }}
                                        className="overflow-ellipsis text-ellipsis text-nowrap whitespace-nowrap"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </TableUI>

                {/* <DataGrid
                    columns={(tab.metadata || []).map(m => {
                        return {
                            key: m.name,
                            name: m.name
                        }
                    })}
                    rows={(tab.data && JSON.parse(JSON.stringify(tab.data)) || [])}
                    con
                /> */}
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
}

export default MysqlQuery