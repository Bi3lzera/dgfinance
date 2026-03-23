import { Edit2, Paperclip } from "lucide-react";
import { ExtratoModel } from "../../../types/extratoModel";

interface TransactionsProps {
    extrato: ExtratoModel[];
}

const Transactions = ({ extrato }: TransactionsProps) => {
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
            <div className="flex-1 overflow-y-auto">
                {extrato.map((item, id) => (
                    <div key={item.id + id} className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_40px] gap-4 px-6 py-5 border-b border-gray-50 items-center hover:bg-slate-50/50 transition cursor-pointer">
                        {/* Data */}
                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm text-gray-900">{item.day}</span>
                            <span className="text-[11px] text-gray-400 font-medium">{item.year}</span>
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
                            <span className={`font-bold text-[15px] whitespace-nowrap ${item.isExpense ? 'text-red-600' : 'text-gray-900'}`}>
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
                            <button className="text-gray-400 hover:text-gray-700 transition p-1">
                                <Edit2 size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                ))}
                {/* Loading state indicator for infinite scroll simulation */}
                <div className="py-6 flex justify-center items-center text-xs font-semibold text-gray-400">
                    Carregando mais transações...
                </div>
            </div>
        </div>
    )
}

export default Transactions;