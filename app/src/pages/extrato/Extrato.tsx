import React, { useState, useEffect, useContext } from 'react';
import ControlPanelCard from './components/ControlPanelCard';
import FutureCompromissesCard from './components/FutureCompromissesCard';
import Transactions from './components/Transactions';
import Filters from './components/Filters';
import { getExtrato } from '../../services/pageServices/extrato';
import { ExtratoModel } from '../../types/extratoModel';
import { DateContext } from '../../contexts/DateContext';
import TransactionForm from '../transactionForm/TransactionForm';
import PaymentModal from '../paymentModal/paymentModal';
import { getUserBanks, getPaymentMethods } from '../../services/pageServices/miscelaneous';


const Extrato: React.FC = () => {
    const [extrato, setExtrato] = useState<ExtratoModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
    const [selectedMovementId, setSelectedMovementId] = useState<number | undefined>(undefined);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentItem, setSelectedPaymentItem] = useState<ExtratoModel | null>(null);
    const [userBanks, setUserBanks] = useState<any[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const { mes, ano } = useContext(DateContext);

    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const [banks, methods] = await Promise.all([
                    getUserBanks(),
                    getPaymentMethods()
                ]);
                setUserBanks(banks);
                setPaymentMethods(methods);
            } catch (error) {
                console.error("Erro ao carregar dependencias de pagamento:", error);
            }
        };
        fetchDependencies();
    }, []);

    useEffect(() => {
        const handleSaved = () => {
            setRefreshTrigger(prev => prev + 1);
        };
        window.addEventListener('transaction-saved', handleSaved);
        return () => {
            window.removeEventListener('transaction-saved', handleSaved);
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        setExtrato([]);
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
        const fetchExtrato = async () => {
            try {
                const data = await getExtrato(initialDate, finalDate, controller.signal);
                setExtrato(data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.name !== 'CanceledError' && error.name !== 'AbortError') {
                    console.error("Failed to fetch extrato:", error);
                    setIsLoading(false);
                }
            }
        };

        fetchExtrato();

        return () => {
            controller.abort();
        };
    }, [mes, ano, refreshTrigger]);

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
                    <Transactions extrato={extrato} isLoading={isLoading} 
                        onDoubleClick={(id) => {
                            setSelectedMovementId(id);
                            setIsTransactionFormOpen(true);
                        }} 
                        onConfirmPaymentClick={(item) => {
                            setSelectedPaymentItem(item);
                            setIsPaymentModalOpen(true);
                        }}
                    />

                    {/* Right side: Control Panel */}
                    <div className="w-[340px] flex flex-col flex-shrink-0 h-full overflow-hidden">
                        <ControlPanelCard />
                        <FutureCompromissesCard />
                    </div>
                </div>
            </div>

            {/* Transaction Form Modal */}
            <TransactionForm
                isOpen={isTransactionFormOpen}
                onClose={() => setIsTransactionFormOpen(false)}
                movementId={selectedMovementId}
            />

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onConfirm={(data) => {
                    console.log('Payment confirmed:', data);
                    // Add backend call logic later
                    setIsPaymentModalOpen(false);
                }}
                movement={{
                    title: selectedPaymentItem?.title,
                    value: selectedPaymentItem?.amount ? parseFloat(selectedPaymentItem.amount.replace(/[^\d,-]/g, '').replace(',', '.')) : 0,
                    date: selectedPaymentItem?.data ? selectedPaymentItem.data.split('T')[0] : ''
                }}
                installment={null}
                transaction={null}
                userBanks={userBanks}
                paymentMethods={paymentMethods}
            />
        </div>
    );
};

export default Extrato;
