"use client";
import React from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import AppSidebar from './blocks/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
const PainelContent = () => {

    const [database, setDatabase] = React.useState()

    React.useEffect(() => {
        if (!window) return;

        window.electronAPI.send("ipc-example", { "data": 2 })

        window.electronAPI.on("table-info", (event, data) => {
            setDatabase(data.data)
            console.log(data)
        })
    }, [])

    return <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border md:min-w-[450px]"
    >
        <ResizablePanel defaultSize={30}>
            <SidebarProvider className="items-start">
                <AppSidebar className='' database={database}/>
            </SidebarProvider>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
            <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
            </div>
        </ResizablePanel>
    </ResizablePanelGroup>
}

export default PainelContent;

