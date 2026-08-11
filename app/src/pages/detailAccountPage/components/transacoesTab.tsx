import { Download, Search, Calendar, Filter, Upload, ArrowUpRight, ArrowDownLeft, FileText, ArrowLeft } from 'lucide-react';

const TransacoesTab = () => {
    return (
        <>
            {/* Transactions Panel */}
            <div className="bg-white border border-gray-200 rounded-2xl flex flex-col shadow-sm flex-1 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Histórico de Transações</h3>
                            <p className="text-sm text-gray-500 mt-1">Visualize e gerencie todos os movimentos da sua conta.</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            Exportar
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Buscar por descrição, categoria ou valor..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Calendar className="w-4 h-4" />
                            Este Mês
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
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
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">25/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/60">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Supermercado Pão de Açúcar</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Alimentação</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-red-500">- R$ 450,25</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">24/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                                            <ArrowDownLeft className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Transferência Recebida - Pix</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Transferência</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-blue-600">+ R$ 1.200,00</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">23/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/60">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Posto Shell - Combustível</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Transporte</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-red-500">- R$ 280,00</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">22/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/60">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Restaurante Sabor & Arte</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Alimentação</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-red-500">- R$ 85,50</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">22/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/60">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Conta de Luz - Enel</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Contas Fixas</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">Pendente</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-red-500">- R$ 195,40</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">21/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/60">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Starbucks Coffee</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Lazer</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-red-500">- R$ 24,90</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">20/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/60">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Assinatura Netflix</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Entretenimento</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-red-500">- R$ 55,90</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                            <tr className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-xs font-semibold text-gray-500">19/03/2024</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                                            <ArrowDownLeft className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Rendimento de Investimento</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-semibold">Investimento</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">Efetivado</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-sm font-bold text-blue-600">+ R$ 342,15</p>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Cartão final 4592</p>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Mostrando <strong className="text-gray-900">8</strong> de <strong className="text-gray-900">142</strong> transações</span>
                    <div className="flex gap-1 items-center text-sm font-semibold">
                        <button className="px-3 py-1 text-gray-400 hover:text-gray-900 transition-colors">Anterior</button>
                        <button className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">1</button>
                        <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">2</button>
                        <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">3</button>
                        <button className="px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors">Próximo</button>
                    </div>
                </div>
            </div>

            {/* Bottom Cards Row */}
            <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Comprovantes</p>
                            <h4 className="text-lg font-bold text-gray-900">12 pendentes</h4>
                        </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saída Média</p>
                            <h4 className="text-lg font-bold text-gray-900">R$ 145,20</h4>
                        </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                            <ArrowDownLeft className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Projeção Mês</p>
                            <h4 className="text-lg font-bold text-gray-900">+ R$ 4.200</h4>
                        </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </div>
            </div>
        </>
    );
};

export default TransacoesTab;
