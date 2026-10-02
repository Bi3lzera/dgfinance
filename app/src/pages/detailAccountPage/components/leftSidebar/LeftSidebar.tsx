import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { UserAccount } from '../../../accountsPage/accounts';

interface LeftSideBarProps {
    account: UserAccount;
}

const LeftSideBar = ({ account }: LeftSideBarProps) => {

    return (
        <div className="w-full 2xl:w-[400px] shrink-0 flex flex-col gap-3 2xl:min-h-0 overflow-visible 2xl:overflow-y-auto custom-scrollbar pr-2 pb-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col flex-1 min-h-[350px] 2xl:min-h-0">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Resumo da Conta</h3>

                <div className="mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Saldo Atual</p>
                    <h2 className="text-2xl font-extrabold text-gray-900">R$ 12.450,60</h2>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 text-xs">Saldo a Receber</span>
                        <span className="font-bold text-gray-900 text-xs">R$ 12.450,60</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 text-xs">Saldo Comprometido</span>
                        <span className="font-bold text-gray-900 text-xs">R$ 1.400,60</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Relação de saldo comprometido x disponível</span>
                        <span className="text-[10px] font-bold text-blue-500">49.8%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '49.8%' }}></div>
                    </div>
                </div>

                <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="w-4 h-4 border border-gray-300 rounded-sm"></span>
                            <span>Número / IBAN</span>
                        </div>
                        <span className="font-bold text-gray-900">4592</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="w-4 h-4 border border-gray-300 rounded-sm"></span>
                            <span>Agência</span>
                        </div>
                        <span className="font-bold text-gray-900">0001</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="w-4 h-4 border border-gray-300 rounded-full"></span>
                            <span>Última Atualização</span>
                        </div>
                        <span className="font-bold text-gray-900">Hoje, 09:12</span>
                    </div>
                </div>
            </div>

            {/* Entradas Value Box */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Entradas (Mês)</p>
                    <h4 className="text-base font-bold text-green-600">+ R$ 15.200,00</h4>
                </div>
                <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-sm">
                    <ArrowDownLeft className="w-4 h-4" />
                </div>
            </div>

            {/* Saídas Value Box */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saídas (Mês)</p>
                    <h4 className="text-base font-bold text-red-500">- R$ 8.750,40</h4>
                </div>
                <div className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>

            {/* Transações Pendentes Box */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Transações Pendentes</p>
                    <h4 className="text-base font-bold text-gray-900">03 itens</h4>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    )
}

export default LeftSideBar;