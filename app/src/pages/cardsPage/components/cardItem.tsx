import { CreditCard, Calendar, ArrowUpRight } from 'lucide-react';
import { CardInfo } from '../mockData';

interface CardItemProps {
  card: CardInfo;
  onDoubleClick?: () => void;
}

const CardItem = ({ card, onDoubleClick }: CardItemProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Aberta':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Paga':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Fechada':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Vencida':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-blue-600';
      case 'Paga': return 'bg-green-500';
      case 'Fechada': return 'bg-blue-600'; // Defaulting to blue for fechada limit
      case 'Vencida': return 'bg-blue-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div onDoubleClick={onDoubleClick} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Top Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-lg ${card.iconBgColor} flex items-center justify-center shrink-0`}>
           <CreditCard className="w-6 h-6 text-gray-700 opacity-60" />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold text-gray-900 leading-tight">{card.name}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase">{card.bankName}</p>
        </div>
      </div>

      {/* Invoice Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fatura Atual</p>
          <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-bold border ${getStatusStyles(card.status)} flex items-center gap-1 uppercase tracking-wider`}>
            {card.status === 'Paga' && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            )}
            {card.status === 'Aberta' && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            {card.status === 'Vencida' && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            {card.status === 'Fechada' && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            )}
            {card.status}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{formatCurrency(card.invoiceAmount)}</h2>
      </div>

      {/* Limit Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 font-semibold">Limite Utilizado</p>
          <p className="text-xs font-bold text-gray-900">{card.limitUsedPercent}%</p>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full rounded-full ${getProgressBarColor(card.status)}`}
            style={{ width: `${card.limitUsedPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[0.65rem] font-semibold text-gray-400">
          <p>{formatCurrency(card.limitUsedAmount)}</p>
          <p>{formatCurrency(card.totalLimit)}</p>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded">
            <CreditCard className="w-3.5 h-3.5 text-gray-400" />
            <span>**** {card.lastDigits}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded">
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            <span>{card.transactionsCount} Transações</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-gray-400 mt-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Última atualização: {card.lastUpdate}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
