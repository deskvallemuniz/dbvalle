"use client"
import React from 'react';
import PainelContent from './PainelContent';
import PainelContextProvider from './PainelContext';

const PainelPage = () => {
    const [connections, setConnections] = React.useState<any>([]);

    return <PainelContextProvider>
        <div className='h-screen w-screen'>
            <div className='size-full p-2'>
                <PainelContent />
            </div>
        </div>
    </PainelContextProvider>

}

export default PainelPage;