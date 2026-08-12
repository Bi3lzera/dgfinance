import { TrendingUp, CreditCard, Repeat, Calendar, AlertCircle } from 'lucide-react';
import type { CardDetail, SpendingCategory } from '../detailCardActions';
import { mockSpendingCategories } from '../detailCardActions';

interface CardResumeTabProps {
    card: CardDetail;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Mini Donut chart for spending categories (SVG)
const DonutChart = ({ categories }: { categories: SpendingCategory[] }) => {
    const size = 110;
    const radius = 40;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;
    const slices = categories.map((cat) => {
        const dash = (cat.percentage / 100) * circumference;
        const gap = circumference - dash;
        const slice = { ...cat, dash, gap, offset };
        offset += dash;
        return slice;
    });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth="16" />
            {slices.map((s, i) => (
                <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="16"
                    strokeDasharray={`${s.dash} ${s.gap}`}
                    strokeDashoffset={-s.offset + circumference / 4}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
                />
            ))}
            <text x={cx} y={cy - 4} textAnchor="middle" className="text-[9px] font-bold fill-gray-500" fontSize="7">TOTAL</text>
            <text x={cx} y={cy + 6} textAnchor="middle" className="text-xs font-extrabold fill-gray-900" fontSize="8">R$ 3.680</text>
        </svg>
    );
};

const CardResumeTab = ({ card }: CardResumeTabProps) => {
    const usedPercent = Math.round((card.usedLimit / card.totalLimit) * 100);

    // Spending by week - mock points
    const weekPoints = [
        { x: 0, y: 40 }, { x: 16.66, y: 55 }, { x: 33.33, y: 35 },
        { x: 50, y: 70 }, { x: 66.66, y: 60 }, { x: 83.33, y: 75 }, { x: 100, y: 65 }
    ];

    const generatePath = (pts: { x: number; y: number }[]) => {
        let d = `M 0,${100 - pts[0].y} `;
        for (let i = 0; i < pts.length - 1; i++) {
            const p1 = pts[i], p2 = pts[i + 1];
            const cx = (p1.x + p2.x) / 2;
            d += `C ${cx},${100 - p1.y} ${cx},${100 - p2.y} ${p2.x},${100 - p2.y} `;
        }
        return d;
    };

    const linePath = generatePath(weekPoints);
    const fillPath = `${linePath} L 100,100 L 0,100 Z`;

    return (
        <div className="flex flex-col 2xl:flex-row w-full gap-4 h-full">
            {/* Left Column */}
            <div className="w-full 2xl:w-2/3 flex flex-col gap-3 min-h-[400px] 2xl:min-h-0 shrink-0">

                {/* Limit Utilization */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Limite do Cartão</p>
                            <h3 className="text-2xl font-extrabold text-gray-900">{formatCurrency(card.totalLimit)}</h3>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            usedPercent > 80 ? 'bg-red-50 text-red-600' :
                            usedPercent > 50 ? 'bg-amber-50 text-amber-600' :
                            'bg-green-50 text-green-600'
                        }`}>{usedPercent}% utilizado</span>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Utilizado</p>
                            <p className="text-sm font-bold text-red-500">{formatCurrency(card.usedLimit)}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Disponível</p>
                            <p className="text-sm font-bold text-green-600">{formatCurrency(card.availableLimit)}</p>
                        </div>
                    </div>

                    <div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    usedPercent > 80 ? 'bg-red-500' : usedPercent > 50 ? 'bg-amber-400' : 'bg-blue-500'
                                }`}
                                style={{ width: `${usedPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Spending chart */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col flex-1 min-h-0">
                    <div className="flex justify-between items-center mb-3 shrink-0">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Gastos do Mês</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Evolução por semana — Agosto 2026</p>
                        </div>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button className="px-2 py-0.5 text-[10px] font-bold text-gray-900 bg-white rounded-md shadow-sm">30D</button>
                            <button className="px-2 py-0.5 text-[10px] font-bold text-gray-500 hover:text-gray-900 transition-colors">90D</button>
                            <button className="px-2 py-0.5 text-[10px] font-bold text-gray-500 hover:text-gray-900 transition-colors">1A</button>
                        </div>
                    </div>

                    <div className="flex-1 relative min-h-[80px] mb-5">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="2" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="2" />
                            <line x1="0" y1="80" x2="100" y2="80" stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="2" />
                            <path d={fillPath} fill="url(#cardGradient)" />
                            <path d={linePath} fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between transform translate-y-5">
                            {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'].map((l, i) => (
                                <span key={i} className="text-[10px] font-semibold text-gray-400">{l}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Installments in progress */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <Repeat className="w-4 h-4 text-purple-600" />
                        <h3 className="text-xs font-bold text-gray-900">Parcelamentos em andamento</h3>
                        <span className="ml-auto text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{card.installmentsPending} parcelas</span>
                    </div>
                    <div className="space-y-2">
                        {[
                            { name: 'iPhone 16 Pro', total: 7000, parcel: '6/12', monthly: 583.33, remaining: 3499.98 },
                            { name: 'Tênis Adidas — ML', total: 1000, parcel: '3/6', monthly: 166.67, remaining: 666.68 },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                                    <CreditCard className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between">
                                        <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md ml-2 shrink-0">{item.parcel}</span>
                                    </div>
                                    <div className="flex justify-between mt-0.5">
                                        <p className="text-[10px] text-gray-500 font-semibold">{formatCurrency(item.monthly)}/mês</p>
                                        <p className="text-[10px] text-gray-500 font-semibold">Restam {formatCurrency(item.remaining)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full 2xl:w-1/3 flex flex-col gap-3 min-h-[400px] 2xl:min-h-0 shrink-0">

                {/* Invoice info */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900">Informações da Fatura</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: 'Fatura atual', value: formatCurrency(card.currentInvoiceAmount), color: 'text-gray-900' },
                            { label: 'Vencimento', value: card.currentInvoiceDueDate, color: 'text-red-500' },
                            { label: 'Fechamento', value: card.currentInvoiceCloseDate, color: 'text-gray-900' },
                            { label: 'Melhor dia de compra', value: `Dia ${card.bestPurchaseDay}`, color: 'text-green-600' },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">{item.label}</span>
                                <span className={`font-bold ${item.color}`}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Spending by category */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col flex-1 min-h-0">
                    <div className="flex items-center gap-2 mb-4 shrink-0">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900">Gastos por categoria</h3>
                    </div>

                    <div className="flex items-center gap-4 mb-4 shrink-0">
                        <DonutChart categories={mockSpendingCategories} />
                        <div className="flex flex-col gap-1.5 flex-1">
                            {mockSpendingCategories.map((cat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                    <span className="text-[10px] text-gray-600 font-semibold flex-1 truncate">{cat.name}</span>
                                    <span className="text-[10px] font-bold text-gray-900">{cat.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar pr-1 min-h-0">
                        {mockSpendingCategories.map((cat, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-full bg-gray-100 rounded-full h-1.5 flex-1">
                                    <div className="h-1.5 rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-900 w-16 text-right shrink-0">{formatCurrency(cat.amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-amber-700">Vencimento próximo</p>
                        <p className="text-[11px] text-amber-600 mt-0.5">Fatura de {formatCurrency(card.currentInvoiceAmount)} vence em <strong>{card.currentInvoiceDueDate}</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardResumeTab;
