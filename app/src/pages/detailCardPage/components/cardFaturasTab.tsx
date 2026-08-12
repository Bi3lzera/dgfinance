import { useState } from 'react';
import { Receipt, ArrowUpRight, RefreshCw, CheckCircle2, Clock, AlertTriangle, ChevronRight, Download, FileText } from 'lucide-react';
import type { Invoice, InvoiceTransaction } from '../detailCardActions';
import { mockInvoices } from '../detailCardActions';

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// ─── Status helpers ───────────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; icon: React.ReactNode; dot: string; badge: string; pill: string }> = {
    Aberta: {
        label: 'Aberta',
        icon: <Clock className="w-3.5 h-3.5" />,
        dot: 'bg-blue-500',
        badge: 'bg-blue-50 text-blue-600 border-blue-100',
        pill: 'text-blue-600',
    },
    Fechada: {
        label: 'Fechada',
        icon: <FileText className="w-3.5 h-3.5" />,
        dot: 'bg-gray-400',
        badge: 'bg-gray-100 text-gray-600 border-gray-200',
        pill: 'text-gray-600',
    },
    Paga: {
        label: 'Paga',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        dot: 'bg-green-500',
        badge: 'bg-green-50 text-green-600 border-green-100',
        pill: 'text-green-600',
    },
    Vencida: {
        label: 'Vencida',
        icon: <AlertTriangle className="w-3.5 h-3.5" />,
        dot: 'bg-red-500',
        badge: 'bg-red-50 text-red-600 border-red-100',
        pill: 'text-red-600',
    },
    Futura: {
        label: 'Futura',
        icon: <Clock className="w-3.5 h-3.5" />,
        dot: 'bg-gray-300',
        badge: 'bg-gray-50 text-gray-400 border-gray-100',
        pill: 'text-gray-400',
    },
};

// ─── Transaction row in invoice detail ───────────────────────────────────────

const typeIconBg: Record<string, string> = {
    compra: 'bg-gray-100 text-gray-500',
    estorno: 'bg-teal-50 text-teal-600',
    pagamento: 'bg-blue-50 text-blue-600',
    parcelamento: 'bg-purple-50 text-purple-600',
    juros: 'bg-red-50 text-red-500',
    anuidade: 'bg-gray-100 text-gray-500',
};

const TransactionRow = ({ t }: { t: InvoiceTransaction }) => (
    <div className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors rounded-xl group cursor-pointer">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeIconBg[t.type]}`}>
            {t.type === 'pagamento' || t.type === 'estorno' ? (
                <RefreshCw className="w-4 h-4" />
            ) : (
                <ArrowUpRight className="w-4 h-4" />
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                        {t.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-500 font-semibold">{t.date}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${t.categoryColor}`}>{t.category}</span>
                        {t.installment && (
                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">{t.installment}</span>
                        )}
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            t.status === 'efetivado' ? 'text-green-600' :
                            t.status === 'pendente' ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                            {t.status === 'efetivado' ? '● Efetivado' : t.status === 'pendente' ? '● Pendente' : '● Estornado'}
                        </span>
                    </div>
                </div>
                <p className={`text-sm font-bold shrink-0 ${t.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {t.isPositive ? '+' : '-'} {formatCurrency(t.amount)}
                </p>
            </div>
        </div>
    </div>
);

// ─── Invoice detail panel ─────────────────────────────────────────────────────
const InvoiceDetailPanel = ({ invoice }: { invoice: Invoice }) => {
    const cfg = statusConfig[invoice.status];
    const charges = invoice.transactions.filter(t => !t.isPositive);
    const credits = invoice.transactions.filter(t => t.isPositive);
    const totalCharges = charges.reduce((s, t) => s + t.amount, 0);
    const totalCredits = credits.reduce((s, t) => s + t.amount, 0);

    if (invoice.status === 'Futura') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-sm font-bold text-gray-500">Fatura futura</p>
                <p className="text-xs text-gray-400 max-w-[200px]">Esta fatura ainda não possui lançamentos. Os gastos aparecerão aqui após o fechamento da fatura anterior.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Invoice header */}
            <div className="p-5 border-b border-gray-100 shrink-0">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{invoice.reference}</p>
                        <h3 className="text-xl font-extrabold text-gray-900">{formatCurrency(invoice.totalAmount)}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${cfg.badge}`}>
                            {cfg.icon} {cfg.label}
                        </span>
                        <button className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                            PDF
                        </button>
                    </div>
                </div>

                {/* Invoice meta */}
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: 'Fechamento', value: invoice.closeDate },
                        { label: 'Vencimento', value: invoice.dueDate },
                        ...(invoice.paymentDate ? [{ label: 'Pago em', value: invoice.paymentDate }] : []),
                        { label: 'Lançamentos', value: `${invoice.transactionCount} itens` },
                    ].map((info, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-2.5">
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{info.label}</p>
                            <p className="text-xs font-bold text-gray-900 mt-0.5">{info.value}</p>
                        </div>
                    ))}
                </div>

                {/* Mini totals */}
                <div className="flex gap-3 mt-3">
                    <div className="flex-1 bg-red-50 rounded-xl px-3 py-2">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Débitos</p>
                        <p className="text-xs font-bold text-red-500 mt-0.5">- {formatCurrency(totalCharges)}</p>
                    </div>
                    <div className="flex-1 bg-green-50 rounded-xl px-3 py-2">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Créditos</p>
                        <p className="text-xs font-bold text-green-600 mt-0.5">+ {formatCurrency(totalCredits)}</p>
                    </div>
                </div>

                {/* Pay button for open/overdue invoices */}
                {(invoice.status === 'Aberta' || invoice.status === 'Vencida') && (
                    <button className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${
                        invoice.status === 'Vencida' ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
                    }`}>
                        {invoice.status === 'Vencida' ? '⚠ Pagar Fatura Vencida' : 'Pagar Fatura'}
                    </button>
                )}
            </div>

            {/* Transactions list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
                {invoice.transactions.length === 0 ? (
                    <div className="flex items-center justify-center h-24 text-gray-400 text-sm">
                        Nenhum lançamento encontrado.
                    </div>
                ) : (
                    <div className="p-3">
                        {/* Group by type: payments first */}
                        {credits.length > 0 && (
                            <div className="mb-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-2">Pagamentos e créditos</p>
                                {credits.map(t => <TransactionRow key={t.id} t={t} />)}
                            </div>
                        )}
                        {charges.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-2">Débitos</p>
                                {charges.map(t => <TransactionRow key={t.id} t={t} />)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Main tab ─────────────────────────────────────────────────────────────────
const CardFaturasTab = () => {
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice>(mockInvoices[1]); // default: Aberta

    return (
        <div className="flex gap-4 h-full min-h-0">
            {/* Left sidebar — invoice list */}
            <div className="w-[260px] shrink-0 flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 shrink-0">
                    <h3 className="text-sm font-bold text-gray-900">Faturas</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{mockInvoices.length} faturas disponíveis</p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 p-2">
                    {mockInvoices.map(invoice => {
                        const cfg = statusConfig[invoice.status];
                        const isSelected = selectedInvoice.id === invoice.id;
                        return (
                            <button
                                key={invoice.id}
                                onClick={() => setSelectedInvoice(invoice)}
                                className={`w-full text-left p-3 rounded-xl mb-1 transition-all group ${
                                    isSelected
                                        ? 'bg-purple-50 border border-purple-200'
                                        : 'hover:bg-gray-50 border border-transparent'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className={`text-xs font-bold ${isSelected ? 'text-purple-700' : 'text-gray-900'}`}>
                                        {invoice.reference}
                                    </span>
                                    <ChevronRight className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-purple-500' : 'text-gray-300 group-hover:text-gray-500'}`} />
                                </div>

                                <div className="flex items-center justify-between mb-1.5">
                                    <span className={`text-sm font-extrabold ${
                                        invoice.status === 'Futura' ? 'text-gray-400' : 'text-gray-900'
                                    }`}>
                                        {invoice.status === 'Futura' ? '—' : formatCurrency(invoice.totalAmount)}
                                    </span>
                                    <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${cfg.pill}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                        {cfg.label}
                                    </span>
                                </div>

                                <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                                    <span>Venc. {invoice.dueDate}</span>
                                    {invoice.status !== 'Futura' && (
                                        <span>{invoice.transactionCount} lançamentos</span>
                                    )}
                                </div>

                                {invoice.status === 'Paga' && invoice.paymentDate && (
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                                        <span className="text-[9px] text-green-600 font-semibold">Pago em {invoice.paymentDate}</span>
                                    </div>
                                )}

                                {invoice.status === 'Vencida' && (
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <AlertTriangle className="w-3 h-3 text-red-500" />
                                        <span className="text-[9px] text-red-500 font-semibold">Fatura em atraso</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Summary footer */}
                <div className="p-3 border-t border-gray-100 shrink-0 space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                        <span className="text-gray-400 font-semibold uppercase tracking-wider">Total pago (12m)</span>
                        <span className="font-bold text-gray-900">{formatCurrency(20450.30)}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                        <span className="text-gray-400 font-semibold uppercase tracking-wider">Média mensal</span>
                        <span className="font-bold text-gray-900">{formatCurrency(7216.67)}</span>
                    </div>
                </div>
            </div>

            {/* Right panel — invoice detail */}
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-0">
                {selectedInvoice ? (
                    <InvoiceDetailPanel invoice={selectedInvoice} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-8">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <Receipt className="w-7 h-7 text-gray-400" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">Selecione uma fatura</p>
                        <p className="text-xs text-gray-400">Clique em uma fatura à esquerda para ver seus detalhes e lançamentos.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardFaturasTab;
