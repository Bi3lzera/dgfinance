import React, { useState, useEffect, useContext } from 'react';
import ControlPanelCard from './components/ControlPanelCard';
import FutureCompromissesCard from './components/FutureCompromissesCard';
import Transactions from './components/Transactions';
import Filters from './components/Filters';
import { getExtrato } from '../../services/pageServices/extrato';
import { ExtratoModel } from '../../types/extratoModel';
import { DateContext } from '../../contexts/DateContext';


const Extrato: React.FC = () => {
    const [extrato, setExtrato] = useState<ExtratoModel[]>([]);
    const { mes, ano } = useContext(DateContext);

    useEffect(() => {
        const monthMap: { [key: string]: number } = {
            "janeiro": 1, "fevereiro": 2, "marco": 3, "abril": 4,
            "maio": 5, "junho": 6, "julho": 7, "agosto": 8,
            "setembro": 9, "outubro": 10, "novembro": 11, "dezembro": 12
        };
        const monthNumber = monthMap[mes.toLowerCase()] || 1;
        const formattedMonth = monthNumber.toString().padStart(2, '0');

        const initialDate = `${ano}-${formattedMonth}-01`;
        const lastDayOfMonth = new Date(ano, monthNumber, 0).getDate();
        const finalDate = `${ano}-${formattedMonth}-${lastDayOfMonth}`;
        console.log(initialDate, finalDate);
        const fetchExtrato = async () => {
            try {
                const data = await getExtrato(initialDate, finalDate);
                setExtrato(data);
            } catch (error) {
                console.error("Failed to fetch extrato:", error);
            }
        };

        fetchExtrato();
    }, [mes, ano]);

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
                    <Transactions extrato={extrato} />

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
