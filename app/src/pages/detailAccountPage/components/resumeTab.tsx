import { TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react';

const mockData = {
    historicoSaldo: {
        labels: ['05/03', '10/03', '15/03', '20/03', '25/03'],
        // Normalized data for the SVG path (0-100 range)
        points: [
            { x: 0, y: 60 },
            { x: 25, y: 55 },
            { x: 50, y: 70 },
            { x: 75, y: 65 },
            { x: 100, y: 80 }
        ]
    },
    investimentos: [
        { id: 1, title: 'CDB Pós-fixado 100% CDI', profitability: '-2.4%', dueDate: '12/05/2029', amount: 12450.60, isPositive: false },
        { id: 2, title: 'CDB Diário 105% CDI', profitability: '+10.4%', dueDate: 'Diário', amount: 2500.00, isPositive: true }
    ],
    emprestimos: [
        { id: 1, title: 'Carro Virtus 1.0 TSI', type: 'Financiamento', status: 'PAGO', dueDate: '12/05/2026', amount: 4250.00, statusColor: 'text-green-600 bg-green-50' },
        { id: 2, title: 'Consórcio de Serviço', type: 'Consórcio', status: 'PENDENTE', dueDate: '12/05/2026', amount: 250.00, statusColor: 'text-blue-600 bg-blue-50' },
        { id: 3, title: 'Pagamento de Contas', type: 'Empréstimo', status: 'VENCIDO', dueDate: '12/05/2026', amount: 250.00, statusColor: 'text-red-600 bg-red-50' }
    ],
    cartoes: [
        { id: 1, name: 'Nubank Ultravioleta', details: 'Final 1234 • Mastercard Black', amount: 4250.00 },
        { id: 2, name: 'Nubank Gold', details: 'Final 5678 • Mastercard Gold', amount: 850.00 }
    ],
    totals: {
        investimentos: 5520.00,
        emprestimos: 4500.00,
        cartoes: 5520.00
    }
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const ResumeTab = () => {
    // Generate a smooth SVG curve path based on points
    const generatePath = (points: {x: number, y: number}[]) => {
        if (points.length === 0) return '';
        let d = `M 0,${100 - points[0].y} `;
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            // Smooth cubic bezier
            const cx = (p1.x + p2.x) / 2;
            d += `C ${cx},${100 - p1.y} ${cx},${100 - p2.y} ${p2.x},${100 - p2.y} `;
        }
        return d;
    };

    const linePath = generatePath(mockData.historicoSaldo.points);
    const fillPath = `${linePath} L 100,100 L 0,100 Z`;

    return (
        <div className="flex flex-col 2xl:flex-row w-full gap-4 h-full">
            {/* Left Column (larger) */}
            <div className="w-full 2xl:w-2/3 flex flex-col gap-3 min-h-[400px] 2xl:min-h-0 shrink-0">
                
                {/* Histórico de Saldo Chart */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col flex-[2] min-h-0">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Histórico de Saldo</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Evolução financeira</p>
                        </div>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button className="px-2 py-0.5 text-[10px] font-bold text-gray-900 bg-white rounded-md shadow-sm">30D</button>
                            <button className="px-2 py-0.5 text-[10px] font-bold text-gray-500 hover:text-gray-900 transition-colors">90D</button>
                            <button className="px-2 py-0.5 text-[10px] font-bold text-gray-500 hover:text-gray-900 transition-colors">1A</button>
                        </div>
                    </div>

                    <div className="flex-1 relative min-h-0 mb-5">
                        {/* SVG Chart */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="2" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="2" />
                            <line x1="0" y1="80" x2="100" y2="80" stroke="#f3f4f6" strokeWidth="0.5" strokeDasharray="2" />
                            
                            {/* Area fill */}
                            <path d={fillPath} fill="url(#gradientFill)" />
                            {/* Line */}
                            <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        {/* X Axis Labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between transform translate-y-5">
                            {mockData.historicoSaldo.labels.map((label, idx) => (
                                <span key={idx} className="text-[10px] font-semibold text-gray-400">{label}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Investimentos e aplicações vinculadas */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col flex-[3] min-h-0">
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900">Investimentos e aplicações vinculadas</h3>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0">
                        {mockData.investimentos.map((inv) => (
                            <div key={inv.id} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors shrink-0">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-900">{inv.title}</h4>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                            Rentabilidade: <span className={inv.isPositive ? 'text-green-600' : 'text-red-500'}>{inv.profitability}</span>
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                            Venc.: {inv.dueDate}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{formatCurrency(inv.amount)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 shrink-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total de Investimentos</span>
                        <div className="flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                            + {formatCurrency(mockData.totals.investimentos)}
                            <div className="w-4 h-4 bg-green-500 rounded-md flex items-center justify-center text-white ml-1">
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Right Column (smaller) */}
            <div className="w-full 2xl:w-1/3 flex flex-col gap-3 min-h-[400px] 2xl:min-h-0 shrink-0">
                
                {/* Empréstimos, Consórcios e Financiamentos */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col flex-1 min-h-0">
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900">Empréstimos, Consórcios e Financiamentos</h3>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0">
                        {mockData.emprestimos.map((emp) => (
                            <div key={emp.id} className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className="text-xs font-bold text-gray-900 truncate pr-2">{emp.title}</h4>
                                        <span className="text-xs font-bold text-gray-900 shrink-0">{formatCurrency(emp.amount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-gray-500 font-semibold">{emp.type}</span>
                                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${emp.statusColor}`}>{emp.status}</span>
                                        </div>
                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Venc.: {emp.dueDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 shrink-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total de Créditos Emprestados</span>
                        <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                            - {formatCurrency(mockData.totals.emprestimos)}
                            <div className="w-4 h-4 bg-red-500 rounded-md flex items-center justify-center text-white">
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cartões de crédito vinculados */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col flex-1 min-h-0">
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900">Cartões de crédito vinculados</h3>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0">
                        {mockData.cartoes.map((card) => (
                            <div key={card.id} className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className="text-xs font-bold text-gray-900 truncate pr-2">{card.name}</h4>
                                        <span className="text-xs font-bold text-gray-900 shrink-0">{formatCurrency(card.amount)}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-semibold">{card.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 shrink-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total de Cartões</span>
                        <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                            - {formatCurrency(mockData.totals.cartoes)}
                            <div className="w-4 h-4 bg-red-500 rounded-md flex items-center justify-center text-white">
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResumeTab;
