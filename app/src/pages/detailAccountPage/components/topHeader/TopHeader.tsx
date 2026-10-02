import { ArrowLeft, Wallet } from 'lucide-react';
import { UserAccount } from '../../../accountsPage/accounts';

interface TopHeaderProps {
    account: UserAccount;
    onBack: () => void;
}

const TopHeader = ({ account, onBack }: TopHeaderProps) => {

    return (
        <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-white shrink-0 animate-fade-in-down" style={{ animationDelay: '0ms' }}>
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                {account.logoUrl ? (
                    <img src={account.logoUrl} alt={account.bankName} className="w-full h-full object-contain p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                ) : (
                    <Wallet className="w-6 h-6 text-purple-500" />
                )}
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">{account.accountAlias} <span className="text-[10px] ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">{account.status || 'ATIVA'}</span></h2>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{account.bankName} • CONTA CORRENTE</p>
            </div>
        </div>
    )
}

export default TopHeader;