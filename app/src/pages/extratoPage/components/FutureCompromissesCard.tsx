import { Calendar } from "lucide-react";

const mockFutureCommitments = [
    { title: 'Aluguel', time: '05/04/2024', amount: 'R$ 1.500,00', isCritical: true },
    { title: 'Conta de Luz', time: '10/04/2024', amount: 'R$ 150,00', isCritical: false },
    { title: 'Internet', time: '15/04/2024', amount: 'R$ 100,00', isCritical: false },
    { title: 'Parcela Carro', time: '20/04/2024', amount: 'R$ 800,00', isCritical: true },
];

const FutureCompromissesCard = () => {
    return (
        <div className="mt-1 flex-1 min-h-0 flex flex-col bg-[#f8f9ff] rounded-2xl p-4 border border-indigo-50/50 shadow-[inset_0_2px_10px_rgba(255,255,255,1)] relative overflow-hidden">
            {/* Background Calendar Icon */}
            <div className="absolute -right-2 top-4 opacity-5 pointer-events-none transform rotate-12">
                <Calendar size={120} strokeWidth={1.5} />
            </div>

            <div className="flex-shrink-0 flex items-center gap-2 mb-3 relative z-10">
                <h3 className="text-[12px] font-bold tracking-widest text-gray-800 uppercase">Compromissos Futuros</h3>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 relative z-10">
                {mockFutureCommitments.map((item, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-white flex-shrink-0">
                        <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-gray-900 truncate max-w-[150px]">{item.title}</span>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500 mt-0.5">{item.time}</span>
                        </div>
                        <span className={`font-bold text-sm ${item.isCritical ? 'text-red-600' : 'text-gray-900'}`}>{item.amount}</span>
                    </div>
                ))}
            </div>

            <button className="flex-shrink-0 w-full mt-3 bg-white border border-indigo-100 text-blue-600 font-bold text-[13px] py-2.5 rounded-xl hover:bg-slate-50 transition shadow-sm relative z-10">
                Acessar Calendário
            </button>
        </div>
    )
}

export default FutureCompromissesCard;