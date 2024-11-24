"use client";

import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { PainelContextProviderProps } from "./types";
import electronServe from "electron-serve";
import QuickStart from "./blocks/tabs/block/QuickStart";

export type PainelData = {
    tabs: any[]
};

export type PainelActions = {
    fetchData: (filter: any, tab: any) => any;
};

const PainelContext = createContext<PainelData>({
    tabs: []
});

const PainelActionsContext = createContext<PainelActions>({
    fetchData: () => { },
});

export const usePainelContext = () => useContext(PainelContext);

export const usePainelActionsContext = () => useContext(PainelActionsContext);

const PainelContextProvider: React.FC<PainelContextProviderProps> = ({
    children,
}) => {

    const [connections, setConnections] = React.useState([])

    const [date, setDate] = React.useState(new Date())

    const [tabs, setTabs] = React.useState<any[]>([{
        title: "Mysql",
        component: "MysqlQuery",
        key: "mysql"
    }])

    const fetchData = async (filter: any, tab: any) => {
        window.electronAPI.send("fetch-data", { filter, tab: "mysql" })

        return null
    }

    const onGetConnections = (connections: any) => {
        setConnections(connections)
    }

    const init = async () => {

        window.electronAPI.on("get-connections", onGetConnections)
        window.electronAPI.send("get-connections")

        window.electronAPI.on("fetch-data-main", (result: any, data: any) => {
            console.log("?>>")
            tabs[0].metadata = data.metadata
            tabs[0].data = data.data

            console.log("?>asd", data)
            setDate(new Date())
        })
        // window.electronAPI.send("ipc-example", { "data": 2 })

        // window.electronAPI.on("table-info", (event, data) => {
        //     setDatabase(data.data)
        //     console.log(data)
        // })
    }

    React.useEffect(() => {
        if (!window) return;

        init();
    }, [])

    return (
        <PainelContext.Provider value={{ tabs, date }} >
            <PainelActionsContext.Provider
                value={{ fetchData }}
            >
                {children}
            </PainelActionsContext.Provider>
        </PainelContext.Provider >
    );
};

export default PainelContextProvider;

PainelContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
