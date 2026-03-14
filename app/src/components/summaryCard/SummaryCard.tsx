import React from 'react';
import { ArrowUp, ArrowDown, Wallet } from 'lucide-react';

export type SummaryType = 'income' | 'expense' | 'balance';

interface SummaryCardProps {
    title: string;
    amount: number;
    type: SummaryType;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
    let Icon = ArrowUp;
    let iconClass = '';

    if (type === 'income') {
        Icon = ArrowUp;
        iconClass = 'text-gray-900 border border-gray-300 bg-white';
    } else if (type === 'expense') {
        Icon = ArrowDown;
        iconClass = 'text-red-500 bg-red-50';
    } else if (type === 'balance') {
        Icon = Wallet;
        iconClass = 'text-indigo-600 bg-indigo-50';
    }

    return (
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-50 flex-1">
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</span>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconClass}`}>
                <Icon size={20} strokeWidth={2} />
            </div>
        </div>
    );
};

export default SummaryCard;
