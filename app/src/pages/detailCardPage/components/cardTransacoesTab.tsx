import { useState } from 'react';
import { Download, Search, Calendar, Filter, ArrowUpRight, RefreshCw, Receipt } from 'lucide-react';
import type { InvoiceTransaction } from '../detailCardActions';

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const typeLabel: Record<string, string> = {
    compra: 'Compra',
    estorno: 'Estorno',
    pagamento: 'Pagamento',
    parcelamento: 'Parcelado',
    juros: 'Juros',
    anuidade: 'Anuidade',
};

const typeIcon: Record<string, JSX.Element> = {
    compra: <ArrowUpRight className="w-4 h-4" />,
    estorno: <RefreshCw className="w-4 h-4" />,
    pagamento: <Receipt className="w-4 h-4" />,
    parcelamento: <ArrowUpRight className="w-4 h-4" />,
    juros: <ArrowUpRight className="w-4 h-4" />,
    anuidade: <ArrowUpRight className="w-4 h-4" />,
};

const typeIconBg: Record<string, string> = {
    compra: 'bg-gray-100 text-gray-500 border-gray-200/60',
    estorno: 'bg-teal-50 text-teal-600 border-teal-100',
    pagamento: 'bg-blue-50 text-blue-600 border-blue-100',
    parcelamento: 'bg-purple-50 text-purple-600 border-purple-100',
    juros: 'bg-red-50 text-red-500 border-red-100',
    anuidade: 'bg-gray-100 text-gray-500 border-gray-200/60',
};

const mockTransactions: InvoiceTransaction[] = [
    { id: 't1', date: '25/07/2026', description: 'Supermercado Pão de Açúcar', category: 'Alimentação', categoryColor: 'bg-green-100 text-green-700', type: 'compra', amount: 450.25, establishment: 'PÃO DE AÇÚCAR SP', status: 'efetivado', isPositive: false },
    { id: 't2', date: '24/07/2026', description: 'Posto Shell - Combustível', category: 'Transporte', categoryColor: 'bg-blue-100 text-blue-700', type: 'compra', amount: 280.00, establishment: 'SHELL POSTO 442 SP', status: 'efetivado', isPositive: false },
    { id: 't3', date: '22/07/2026', description: 'Assinatura Netflix', category: 'Entretenimento', categoryColor: 'bg-red-100 text-red-700', type: 'compra', amount: 55.90, status: 'efetivado', isPositive: false },
    { id: 't4', date: '21/07/2026', description: 'Amazon Prime Video', category: 'Entretenimento', categoryColor: 'bg-red-100 text-red-700', type: 'compra', amount: 19.90, status: 'efetivado', isPositive: false },
    { id: 't5', date: '20/07/2026', description: 'iPhone 16 Pro', category: 'Eletrônicos', categoryColor: 'bg-purple-100 text-purple-700', type: 'parcelamento', amount: 583.33, installment: '6/12', status: 'efetivado', isPositive: false },
    { id: 't6', date: '19/07/2026', description: 'Restaurante Outback', category: 'Alimentação', categoryColor: 'bg-green-100 text-green-700', type: 'compra', amount: 189.50, status: 'efetivado', isPositive: false },
    { id: 't7', date: '18/07/2026', description: 'Estorno - Loja X', category: 'Estorno', categoryColor: 'bg-teal-100 text-teal-700', type: 'estorno', amount: 120.00, status: 'efetivado', isPositive: true },
    { id: 't8', date: '15/07/2026', description: 'Farmácia Raia', category: 'Saúde', categoryColor: 'bg-orange-100 text-orange-700', type: 'compra', amount: 87.40, status: 'pendente', isPositive: false },
];

const CardTransacoesTab = () => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState<string>('todos');

    const filtered = mockTransactions.filter(t => {
        const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.category.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === 'todos' || t.type === filterType;
        return matchSearch && matchType;
    });

    const totalCompras = mockTransactions.filter(t => !t.isPositive).reduce((s, t) => s + t.amount, 0);
    const totalCreditos = mockTransactions.filter(t => t.isPositive).reduce((s, t) => s + t.amount, 0);
    const totalParcelamentos = mockTransactions.filter(t => t.type === 'parcelamento').reduce((s, t) => s + t.amount, 0);

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-2xl flex flex-col shadow-sm flex-1 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Lançamentos da Fatura</h3>
                            <p className="text-sm text-gray-500 mt-1">Agosto 2026 — {mockTransactions.length} transações</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            Exportar
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3 flex-wrap">
                        <div className="flex-1 relative min-w-[200px]">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar por descrição, categoria..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Calendar className="w-4 h-4" />
                            Agosto 2026
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
                    </div>

                    {/* Type filters */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {['todos', 'compra', 'parcelamento', 'estorno', 'pagamento', 'juros'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider transition-colors ${
                                    filterType === type
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {type === 'todos' ? 'Todos' : typeLabel[type]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/90 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Data</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Descrição</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Categoria</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Tipo</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map(t => (
                                <tr key={t.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">{t.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${typeIconBg[t.type]}`}>
                                                {typeIcon[t.type]}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                    {t.description}
                                                </span>
                                                {t.establishment && (
                                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{t.establishment}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${t.categoryColor}`}>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-semibold text-gray-700">{typeLabel[t.type]}</span>
                                            {t.installment && (
                                                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">{t.installment}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[9px] font-bold uppercase tracking-wider ${
                                            t.status === 'efetivado' ? 'text-green-600' :
                                            t.status === 'pendente' ? 'text-blue-600' :
                                            'text-gray-400 line-through'
                                        }`}>
                                            {t.status === 'efetivado' ? 'Efetivado' : t.status === 'pendente' ? 'Pendente' : 'Estornado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className={`text-sm font-bold ${t.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                                            {t.isPositive ? '+ ' : '- '}{formatCurrency(t.amount)}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Mostrando <strong className="text-gray-900">{filtered.length}</strong> de <strong className="text-gray-900">{mockTransactions.length}</strong> lançamentos</span>
                    <div className="flex gap-1 items-center text-sm font-semibold">
                        <button className="px-3 py-1 text-gray-400 hover:text-gray-900 transition-colors">Anterior</button>
                        <button className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-sm">1</button>
                        <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">2</button>
                        <button className="px-3 py-1 text-purple-600 hover:text-purple-700 transition-colors">Próximo</button>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100 shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total de Compras</p>
                        <h4 className="text-base font-bold text-red-500">- {formatCurrency(totalCompras)}</h4>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Em Parcelamentos</p>
                        <h4 className="text-base font-bold text-gray-900">{formatCurrency(totalParcelamentos)}</h4>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
                        <RefreshCw className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Créditos / Estornos</p>
                        <h4 className="text-base font-bold text-green-600">+ {formatCurrency(totalCreditos)}</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardTransacoesTab;
