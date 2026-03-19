import React, { useState } from 'react';
import { History } from 'lucide-react';
import SummaryCard from './components/SummaryCard';
import TransactionCard, { Transaction } from './components/TransactionCard';

const mockSummary = {
    income: 11826.64,
    expense: 5112.85,
    scheduled: 1245.90,
    balance: 6713.79
};

const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'income',
        title: 'Salário Mensal - TechCorp',
        date: '13/03/2026',
        bank: 'Itaú',
        amount: 9326.64,
        category: 'RENDA'
    },
    {
        id: '2',
        type: 'expense',
        title: 'Aluguel Apartamento',
        date: '14/03/2026',
        bank: 'Nubank',
        amount: 3420.13,
        category: 'MORADIA'
    },
    {
        id: '3',
        type: 'expense',
        title: 'Supermercado Pão de Açúcar',
        date: '15/03/2026',
        bank: 'Carteira',
        amount: 1177.31,
        category: 'ALIMENTAÇÃO'
    },
    {
        id: '4',
        type: 'income',
        title: 'Freelance Design UI',
        date: '16/03/2026',
        bank: 'Inter',
        amount: 2500.00,
        category: 'RENDA EXTRA'
    },
    {
        id: '5',
        type: 'expense',
        title: 'Assinatura Adobe Creative Cloud',
        date: '18/03/2026',
        bank: 'Inter',
        amount: 124.90,
        category: 'SOFTWARE'
    },
    {
        id: '6',
        type: 'expense',
        title: 'Restaurante Varanda',
        date: '20/03/2026',
        bank: 'Nubank',
        amount: 245.50,
        category: 'LAZER'
    }
];

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Lançamentos');

    return (
        <div className="h-full flex flex-col bg-[#fbfbfe] overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 max-w-[80vw] mx-auto w-full py-8">
                {/* Summary Cards */}
                <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <SummaryCard title="Receitas do Mês" amount={mockSummary.income} type="income" />
                    <SummaryCard title="Despesas do Mês" amount={mockSummary.expense} type="expense" />
                    <SummaryCard title="Agendamentos do Mês" amount={mockSummary.scheduled} type="scheduled" />
                    <SummaryCard title="Saldo Previsto" amount={mockSummary.balance} type="balance" />
                </div>

                {/* Tabs & Filters */}
                <div className="flex-shrink-0 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-xl border border-gray-100">
                        {['Lançamentos', 'Agendados'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">
                        Mostrando: <span className="font-bold text-gray-900">{mockTransactions.length} itens</span>
                    </div>
                </div>

                {/* List Title */}
                <div className="flex-shrink-0 flex items-center gap-2 mb-6">
                    <History className="text-blue-600" size={20} strokeWidth={2.5} />
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">Fluxo de Caixa Mensal</h2>
                </div>

                {/* Transaction List — scrollable */}
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 pb-4">
                    {mockTransactions.map(transaction => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
