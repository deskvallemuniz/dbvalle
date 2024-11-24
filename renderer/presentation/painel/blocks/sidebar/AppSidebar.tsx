import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { File } from 'lucide-react';
import Tree from './Tree';


const database = [
    {
        title: "afiliados",
        type: "folder",
        children: [
            {
                title: "button",
                type: "table"
            }
        ]
    }
]


const AppSidebar = ({ database, ...props }: any) => {

    database = [{
        title: "afiliados",
        type: "folder",
        children: database
    }]
    return (
        <Sidebar {...props} collapsible="none" className="hidden md:flex w-full">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Mysql</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {database.map((item, index) => (
                                <Tree key={index} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar