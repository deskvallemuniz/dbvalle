import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePainelContext } from "../../PainelContext";
import QuickStart from "./block/QuickStart";
import MysqlQuery from "./block/MysqlQuery";

const TabsBlock = () => {
    const { tabs } = usePainelContext()
    return <div className="h-full">

        <Tabs defaultValue="0" className="min-h-full flex flex-col">
            <TabsList className="flex w-full justify-start bg-gray-100 shadow">
                {(tabs || []).map((tab: any, idx: any) => {
                    return <TabsTrigger value={idx.toString()} key={idx}>{tab.title}</TabsTrigger>
                })}
            </TabsList>
            {(tabs || []).map((tab: any, idx: any) => {
                return <TabsContent value={idx.toString()} key={idx} className="mt-0 flex-1">
                    {tab.component === "QuickStart" && <QuickStart />}
                    {tab.component === "MysqlQuery" && <MysqlQuery tab={tab}/>}
                    {/* {tab.component({})} */}
                </TabsContent>
            })}
        </Tabs>
    </div>
}

export default TabsBlock;