import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database } from "lucide-react";

const QuickStart = () => {

    return <div className="mt-10 flex size-full justify-center">
        <div className="container flex flex-col gap-2">
            <h1 className="font-bold">Welcome to DeskValle DB</h1>
            <h1 className="">Recent connections</h1>
            <Separator />

            <Button className="w-[250px]">
                <div className="flex items-center justify-start w-full gap-2">
                    <Database /> Open connection manager
                </div>
            </Button>
        </div>
    </div>


}

export default QuickStart;