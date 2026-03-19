import React from 'react';
import { ArrowUp, ArrowDown, Calendar, CreditCard, Wallet } from 'lucide-react';
import { formatCurrencyToBRL } from '../../../utils/formats';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    type: TransactionType;
    title: string;
    date: string;
    bank: string;
    amount: number;
    category: string;
}

interface TransactionCardProps {
    transaction: Transaction;
}

const formatCurrencyString = (value: number) => formatCurrencyToBRL(value);

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
    const isIncome = transaction.type === 'income';

    const Icon = isIncome ? ArrowUp : ArrowDown;
    const iconClass = isIncome
        ? 'text-gray-900 border border-gray-300 bg-white'
        : 'text-red-500 bg-red-50';

    const renderBankIcon = () => {
        if (transaction.bank.toLowerCase() === 'carteira') {
            return <Wallet size={12} className="text-gray-400" />;
        }
        return <CreditCard size={12} className="text-gray-400" />;
    };

    return (
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100/80 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconClass}`}>
                    <Icon size={18} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{transaction.title}</span>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-gray-400" />
                            {transaction.date}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <div className="flex items-center gap-1">
                            {renderBankIcon()}
                            {transaction.bank}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <span className="font-bold text-gray-900">
                    {isIncome ? '+ ' : '- '}{formatCurrencyString(transaction.amount)}
                </span>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mt-0.5 uppercase">
                    {transaction.category}
                </span>
            </div>
        </div>
    );
};

export default TransactionCard;
