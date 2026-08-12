import { Wallet } from 'lucide-react';
import { UserAccount } from '../accounts';

interface AccountsSectionProps {
    accounts: UserAccount[];
    isLoading: boolean;
    onAccountDoubleClick?: (account: UserAccount) => void;
}

const formatCurrency = (value?: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
};

const SkeletonCard = () => (
    <div className="border border-gray-100 rounded-2xl p-6 bg-white flex flex-col h-full relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-100 animate-pulse" />
            <div className="flex flex-col gap-2">
                <div className="h-3.5 w-28 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-2.5 w-16 bg-gray-100 rounded-full animate-pulse" />
            </div>
        </div>

        {/* Balance */}
        <div className="mb-6 flex flex-col gap-2">
            <div className="h-2.5 w-20 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-6 w-32 bg-gray-100 rounded-full animate-pulse" />
        </div>

        {/* Footer */}
        <div className="mt-auto">
            <div className="h-px bg-gray-100 w-16 mb-4" />
            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1.5">
                    <div className="h-3 w-8 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-2.5 w-10 bg-gray-100 rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
            </div>
        </div>
    </div>
);

const AccountsSection = ({ accounts, isLoading, onAccountDoubleClick }: AccountsSectionProps) => {
    return (
        <div className="px-8 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {isLoading ? (
                    // Render 4 skeleton placeholders
                    Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                ) : accounts.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center py-12 text-gray-500">
                        Nenhuma conta encontrada.
                    </div>
                ) : (
                    accounts.map((account, index) => (
                        <div
                            key={account.idAccount}
                            onDoubleClick={() => onAccountDoubleClick && onAccountDoubleClick(account)}
                            className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white flex flex-col h-full relative cursor-pointer opacity-0 animate-[fadeSlideIn_0.4s_ease-out_forwards]"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                                    {account.logoUrl ? (
                                        <img src={account.logoUrl} alt={account.bankName} className="w-full h-full object-contain p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                    ) : (
                                        <Wallet className="w-6 h-6 text-purple-500" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{account.accountAlias}</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{account.bankName}</p>
                                </div>
                            </div>

                            {/* Card Balance */}
                            <div className="mb-6">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Saldo Atual</p>
                                <p className="text-xl font-extrabold text-gray-900">{formatCurrency(account.balance)}</p>
                            </div>

                            <div className="mt-auto">
                                <div className="h-px bg-gray-100 w-16 mb-4"></div>
                                {/* Card Footer */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-gray-400 leading-none">••••</p>
                                        <p className="text-xs font-bold text-gray-500 mt-1">{String(account.accountNumber).slice(-4)}</p>
                                        <div className="text-[10px] text-gray-400 mt-2 leading-tight">
                                            <p>Sinc.</p>
                                            <p>Hoje</p>
                                            <p>09:12</p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${(account.status || 'ativo') === 'ativo' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-orange-50 text-orange-500 border border-orange-100'}`}>
                                        {account.status || 'ativo'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AccountsSection;