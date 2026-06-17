import { Paperclip, Inbox, CheckCircle2 } from "lucide-react";
import { ExtratoModel } from "../../../types/extratoModel";

interface TransactionsProps {
    extrato: ExtratoModel[];
    isLoading?: boolean;
    onDoubleClick?: (id: number) => void;
    onConfirmPaymentClick?: (item: ExtratoModel) => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return { dayMonth: '', year: '' };

    // Safety against time parts like '2025-09-02T10:00:00Z' or "2025-09-02 10:00"
    const rawDate = dateString.split('T')[0].split(' ')[0];
    const parts = rawDate.split('-');

    if (parts.length !== 3) return { dayMonth: rawDate, year: '' };

    const [year, month, day] = parts;
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthName = months[parseInt(month, 10) - 1] || '';

    return {
        dayMonth: `${day} ${monthName}`,
        year: year
    };
};

const Transactions = ({ extrato, isLoading, onDoubleClick, onConfirmPaymentClick }: TransactionsProps) => {
    return (
        <div className="flex-1 h-full bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden flex flex-col relative">
            {/* List Header */}
            <div className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_40px] gap-4 px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Data</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Descrição & Tag</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Instituição</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Valor Líquido</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase text-center">Status</span>
                <span></span>
            </div>

            {/* List Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-gray-500 mt-4 tracking-wider uppercase">Carregando transações...</span>
                    </div>
                ) : extrato.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-slate-50 text-indigo-500/80 rounded-2xl flex items-center justify-center mb-4 border border-indigo-50/50 shadow-sm">
                            <Inbox size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-base font-bold text-gray-800 tracking-tight">Nenhum lançamento encontrado</h3>
                        <p className="text-xs text-gray-400 max-w-[280px] mt-2 leading-relaxed font-medium">
                            Não há nenhuma transação registrada para o período selecionado.
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col animate-fade-in">
                        {extrato.map((item, id) => {
                            const formattedDate = formatDate(item.data);

                            return (
                                <div
                                    key={item.id + id}
                                    onDoubleClick={() => onDoubleClick && onDoubleClick(Number(item.id))}
                                    className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_40px] gap-4 px-6 py-5 border-b border-gray-50 items-center hover:bg-slate-50/50 transition cursor-pointer animate-scale-in"
                                    style={{ animationDelay: `${id * 30}ms` }}
                                >
                                    {/* Data */}
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-sm text-gray-900">{formattedDate.dayMonth}</span>
                                        <span className="text-[11px] text-gray-400 font-medium">{formattedDate.year}</span>
                                    </div>

                                    {/* Descrição & Tag */}
                                    <div className="flex flex-col gap-1.5 justify-center max-w-[18vw]">
                                        <span className="font-bold text-sm text-gray-900 break-words whitespace-normal">{item.title}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100/50 whitespace-nowrap">
                                                {item.tag}
                                            </span>
                                            <Paperclip size={12} strokeWidth={2.5} className="text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Instituição */}
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.institutionDot}`}></div>
                                        <span className="text-xs font-semibold text-gray-500 truncate">{item.institution}</span>
                                    </div>

                                    {/* Valor Líquido */}
                                    <div className="flex flex-col justify-center">
                                        <span className={`font-bold text-[15px] whitespace-nowrap ${item.transactionType == 'Despesa' ? 'text-red-600' : 'text-green-700'}`}>
                                            {item.amount}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-0.5">
                                            {item.paymentType}
                                        </span>

                                    </div>

                                    {/* Status */}
                                    <div className="flex justify-center">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-[11px] font-bold text-gray-800 bg-white whitespace-nowrap shadow-sm">
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Ações */}
                                    <div className="flex items-center justify-end">
                                        <button 
                                            className="text-gray-400 hover:text-green-600 transition p-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onConfirmPaymentClick && onConfirmPaymentClick(item);
                                            }}
                                            title="Confirmar Pagamento"
                                        >
                                            <CheckCircle2 size={16} strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        {/* Loading state indicator for infinite scroll simulation */}
                        <div className="py-6 flex justify-center items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Fim dos lançamentos do período
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Transactions;