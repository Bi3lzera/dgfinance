import { useState } from 'react';
import { ArrowLeft, CreditCard, AlertTriangle } from 'lucide-react';
import type { CardInfo } from '../cardsPage/mockData';
import { mockCardDetail } from './detailCardActions';
import CardResumeTab from './components/cardResumeTab';
import CardTransacoesTab from './components/cardTransacoesTab';
import CardFaturasTab from './components/cardFaturasTab';
import CardSettingsTab from './components/cardSettingsTab';

interface DetailCardPageProps {
    card: CardInfo;
    onBack: () => void;
}

type TabType = 'resumo' | 'transacoes' | 'faturas' | 'configuracoes';

const tabs: { id: TabType; label: string }[] = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'transacoes', label: 'Transações' },
    { id: 'faturas', label: 'Faturas' },
    { id: 'configuracoes', label: 'Configurações' },
];

const statusColor: Record<string, string> = {
    Ativo: 'bg-green-50 text-green-600',
    Bloqueado: 'bg-red-50 text-red-600',
    Suspenso: 'bg-amber-50 text-amber-600',
    Cancelado: 'bg-gray-100 text-gray-500',
};

const invoiceStatusColor: Record<string, string> = {
    Aberta: 'bg-blue-50 text-blue-600',
    Fechada: 'bg-gray-100 text-gray-600',
    Paga: 'bg-green-50 text-green-600',
    Vencida: 'bg-red-50 text-red-600',
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const DetailCardPage = ({ card, onBack }: DetailCardPageProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('resumo');

    // Use detailed mock data (will come from API later)
    const detail = mockCardDetail;
    const usedPercent = Math.round((card.limitUsedPercent));

    return (
        <div className="flex flex-col w-full h-full bg-gray-50/50">
            {/* ── Top Header ──────────────────────────────────────────── */}
            <div
                className="flex items-center gap-4 p-6 border-b border-gray-200 bg-white shrink-0 animate-fade-in-down"
                style={{ animationDelay: '0ms' }}
            >
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>

                {/* Card icon */}
                <div className={`w-12 h-12 rounded-xl ${card.iconBgColor} flex items-center justify-center border border-gray-100`}>
                    <CreditCard className="w-6 h-6 text-gray-600" />
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900">{card.name}</h2>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${statusColor[detail.status] ?? 'bg-gray-100 text-gray-500'}`}>
                            {detail.status}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        {card.bankName} • {detail.network} {detail.tier} • Final {card.lastDigits}
                    </p>
                </div>

                {/* Vencida badge */}
                {card.status === 'Vencida' && (
                    <div className="ml-auto flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-bold text-red-600">Fatura em atraso</span>
                    </div>
                )}
            </div>

            {/* ── Main layout ─────────────────────────────────────────── */}
            <div className="flex flex-col 2xl:flex-row flex-1 p-4 gap-4 overflow-y-auto 2xl:overflow-hidden min-h-0">

                {/* Left Sidebar */}
                <div
                    className="w-full 2xl:w-[360px] shrink-0 flex flex-col gap-3 2xl:min-h-0 overflow-visible 2xl:overflow-y-auto custom-scrollbar pr-2 pb-2 animate-fade-in-up"
                    style={{ animationDelay: '100ms' }}
                >
                    {/* Limit card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col min-h-[200px] 2xl:min-h-0">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Resumo do Cartão</h3>

                        <div className="mb-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Limite Disponível</p>
                            <h2 className="text-2xl font-extrabold text-gray-900">{formatCurrency(detail.availableLimit)}</h2>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-xs">Limite total</span>
                                <span className="font-bold text-gray-900 text-xs">{formatCurrency(card.totalLimit)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-xs">Utilizado</span>
                                <span className="font-bold text-red-500 text-xs">{formatCurrency(card.limitUsedAmount)}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Utilização do limite</span>
                                <span className={`text-[10px] font-bold ${usedPercent > 80 ? 'text-red-500' : usedPercent > 50 ? 'text-amber-500' : 'text-blue-500'}`}>{usedPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full ${usedPercent > 80 ? 'bg-red-500' : usedPercent > 50 ? 'bg-amber-400' : 'bg-purple-500'}`}
                                    style={{ width: `${usedPercent}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                            {[
                                { label: 'Bandeira', value: `${detail.network} ${detail.tier}` },
                                { label: 'Final do cartão', value: `**** ${detail.lastDigits}` },
                                { label: 'Validade', value: detail.expiryDate },
                                { label: 'Titular', value: detail.holderName },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">{item.label}</span>
                                    <span className="font-bold text-gray-900 text-right max-w-[55%] truncate">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current invoice */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Fatura Atual</p>
                        <div className="flex items-end justify-between mb-3">
                            <div>
                                <h4 className="text-xl font-extrabold text-gray-900">{formatCurrency(card.invoiceAmount)}</h4>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                                    Vence em {detail.currentInvoiceDueDate}
                                </p>
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${invoiceStatusColor[card.status] ?? 'bg-gray-100 text-gray-500'}`}>
                                {card.status}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex justify-between">
                                <span>Fechamento</span>
                                <span className="font-bold text-gray-700">{detail.currentInvoiceCloseDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Melhor dia de compra</span>
                                <span className="font-bold text-green-600">Dia {detail.bestPurchaseDay}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats quick view */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Transações (mês)</p>
                            <h4 className="text-base font-bold text-gray-900">{card.transactionsCount} compras</h4>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                            <CreditCard className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Parcelamentos Ativos</p>
                            <h4 className="text-base font-bold text-gray-900">{detail.installmentsPending} parcelas pendentes</h4>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                            <CreditCard className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Right: tabs + content */}
                <div
                    className="flex-none 2xl:flex-1 flex flex-col gap-4 overflow-visible 2xl:overflow-hidden min-h-0 animate-fade-in-up"
                    style={{ animationDelay: '200ms' }}
                >
                    {/* Tab bar */}
                    <div className="flex justify-center shrink-0">
                        <div className="relative flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-full overflow-x-auto custom-scrollbar 2xl:w-fit 2xl:min-w-[540px] 2xl:overflow-visible">
                            {/* Slider background */}
                            <div
                                className="absolute top-1 bottom-1 bg-gray-50 border border-gray-100 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
                                style={{
                                    width: `calc((100% - 8px) / ${tabs.length})`,
                                    left: '4px',
                                    transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)`,
                                }}
                            />
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sliding content */}
                    <div className="flex-none 2xl:flex-1 overflow-x-hidden overflow-y-visible 2xl:overflow-hidden relative min-h-0">
                        <div
                            className="flex h-auto 2xl:h-full transition-transform duration-500 ease-in-out"
                            style={{
                                width: `${tabs.length * 100}%`,
                                transform: `translateX(-${tabs.findIndex(t => t.id === activeTab) * (100 / tabs.length)}%)`,
                            }}
                        >
                            {/* Resumo */}
                            <div className="h-auto 2xl:h-full flex flex-col min-h-0" style={{ width: `${100 / tabs.length}%` }}>
                                <CardResumeTab card={detail} />
                            </div>

                            {/* Transações */}
                            <div className="h-auto ml-10 2xl:h-full flex flex-col min-h-0" style={{ width: `${100 / tabs.length}%` }}>
                                <CardTransacoesTab />
                            </div>

                            {/* Faturas */}
                            <div className="h-auto mr-10 2xl:h-full flex flex-col min-h-0" style={{ width: `${100 / tabs.length}%` }}>
                                <CardFaturasTab />
                            </div>

                            {/* Configurações */}
                            <div className="h-auto 2xl:h-full flex flex-col min-h-0" style={{ width: `${100 / tabs.length}%` }}>
                                <CardSettingsTab card={detail} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCardPage;
