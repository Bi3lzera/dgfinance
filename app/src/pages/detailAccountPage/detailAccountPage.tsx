import { useState } from 'react';
import { ArrowLeft, Wallet, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { UserAccount } from '../accountsPage/accounts';
import TransacoesTab from './components/transacoesTab';
import ResumeTab from './components/resumeTab';
import SettingsTab from './components/settingsTab';

interface DetailAccountPageProps {
    account: UserAccount;
    onBack: () => void;
}

type TabType = 'resumo' | 'transacoes' | 'configuracoes' | 'conciliacao';

const DetailAccountPage = ({ account, onBack }: DetailAccountPageProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('resumo');

    return (
        <div className="flex flex-col w-full h-full bg-gray-50/50">
            {/* Top Header */}
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

            <div className="flex flex-col 2xl:flex-row flex-1 p-4 gap-4 overflow-y-auto 2xl:overflow-hidden min-h-0">
                {/* Left Sidebar - Account Summary */}
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

                    {/* Entradas (Mês) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Entradas (Mês)</p>
                            <h4 className="text-base font-bold text-green-600">+ R$ 15.200,00</h4>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-sm">
                            <ArrowDownLeft className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Saídas (Mês) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saídas (Mês)</p>
                            <h4 className="text-base font-bold text-red-500">- R$ 8.750,40</h4>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Transações Pendentes */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Transações Pendentes</p>
                            <h4 className="text-base font-bold text-gray-900">03 itens</h4>
                        </div>
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Right Main Content area */}
                <div className="flex-none 2xl:flex-1 flex flex-col gap-6 overflow-visible 2xl:overflow-hidden min-h-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    {/* Tabs */}
                    <div className="flex justify-center shrink-0">
                    <div className="relative flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-full overflow-x-auto custom-scrollbar 2xl:w-fit 2xl:min-w-[500px] 2xl:overflow-visible">
                        {/* Active Tab Background Slider */}
                        <div
                            className="absolute top-1 bottom-1 bg-gray-50 border border-gray-100 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
                            style={{
                                width: 'calc((100% - 8px) / 4)',
                                left: '4px',
                                transform: `translateX(${['resumo', 'transacoes', 'configuracoes', 'conciliacao'].indexOf(activeTab) * 100}%)`
                            }}
                        />

                        {(['resumo', 'transacoes', 'configuracoes', 'conciliacao'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {tab === 'resumo' && 'Resumo'}
                                {tab === 'transacoes' && 'Transações'}
                                {tab === 'configuracoes' && 'Configurações'}
                                {tab === 'conciliacao' && 'Conciliação'}
                            </button>
                        ))}
                    </div>
                    </div>{/* end centering wrapper */}

                    {/* Sliding Content Area */}
                    <div className="flex-none 2xl:flex-1 overflow-x-hidden overflow-y-visible 2xl:overflow-hidden relative min-h-0">
                        <div
                            className="flex w-full h-auto 2xl:h-full transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${['resumo', 'transacoes', 'configuracoes', 'conciliacao'].indexOf(activeTab) * 100}%)` }}
                        >
                            {/* Resumo Tab */}
                            <div className="min-w-full h-auto 2xl:h-full flex flex-col min-h-0">
                                <ResumeTab />
                            </div>

                            {/* Transações Tab */}
                            <div className="min-w-full h-auto 2xl:h-full flex flex-col min-h-0">
                                <TransacoesTab />
                            </div>

                            {/* Configurações Tab */}
                            <div className="min-w-full h-auto 2xl:h-full flex flex-col min-h-0">
                                <SettingsTab />
                            </div>

                            {/* Conciliação Tab */}
                            <div className="min-w-full h-auto 2xl:h-full flex flex-col min-h-0">
                                <div className="flex-1 flex items-center justify-center text-gray-400 bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[400px] 2xl:min-h-0">
                                    Conteúdo de Conciliação em breve...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailAccountPage;
