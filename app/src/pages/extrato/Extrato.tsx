import React from 'react';
import ControlPanelCard from './components/ControlPanelCard';
import FutureCompromissesCard from './components/FutureCompromissesCard';
import Transactions from './components/Transactions';
import Filters from './components/Filters';

const Extrato: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-[#fbfbfe]">
            <div className="flex flex-col flex-1 max-w-[80vw] mx-auto w-full py-6 overflow-hidden">
                {/* Filters */}
                <div className="flex-shrink-0">
                    <Filters />
                </div>

                {/* Main Content Area */}
                <div className="flex gap-8 items-stretch flex-1 overflow-hidden">
                    {/* Main: List of transactions */}
                    <Transactions />

                    {/* Right side: Control Panel */}
                    <div className="w-[340px] flex flex-col flex-shrink-0 h-full overflow-hidden">
                        <ControlPanelCard />
                        <FutureCompromissesCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extrato;
