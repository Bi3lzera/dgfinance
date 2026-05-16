import { Check, RefreshCw, CreditCard, Hash } from 'lucide-react';

const formasPagamento = [
    'Cartão de Crédito', 'Cartão de Débito', 'Pix', 'TED/DOC', 'Dinheiro', 'Boleto'
];

interface PaymentInfoProps {
    formaPagamento: string;
    setFormaPagamento: (value: string) => void;
    parcelas: string;
    setParcelas: (value: string) => void;
    repetir: boolean;
    setRepetir: (value: boolean) => void;
    agendado: boolean;
    setAgendado: (value: boolean) => void;
}

const paymentInfo = ({ formaPagamento, setFormaPagamento, parcelas, setParcelas, repetir, setRepetir, agendado, setAgendado }: PaymentInfoProps) => {
    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <CreditCard size={13} className="text-blue-500" strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Detalhes de Pagamento</span>
            </div>
            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4 flex flex-col gap-4">
                <div className="grid grid-cols-[1.3fr_100px_1.2fr_1.2fr] gap-4 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Forma de Pagamento</label>
                        <div className="relative">
                            <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={formaPagamento}
                                onChange={e => setFormaPagamento(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            >
                                <option value="">Selecionar...</option>
                                {formasPagamento.map(f => <option key={f}>{f}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Parcelas</label>
                        <div className="relative">
                            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={parcelas}
                                onChange={e => setParcelas(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            >
                                {Array.from({ length: 12 }, (_, i) => `${i + 1}/${i + 1}`).map(p => <option key={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    {/* Repetir toggle */}
                    <button
                        onClick={() => setRepetir(!repetir)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition text-sm font-semibold text-left ${repetir
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${repetir ? 'bg-blue-600' : 'bg-white border-2 border-gray-300'}`}>
                            {repetir && <Check size={10} strokeWidth={3} className="text-white" />}
                        </div>
                        <div>
                            <div className="text-sm font-bold leading-tight">Repetir Mensalmente</div>
                            <div className="text-[10px] font-medium text-gray-400 leading-tight">Agendar lançamento fixo</div>
                        </div>
                    </button>

                    {/* Agendado toggle */}
                    <button
                        type="button"
                        onClick={() => setAgendado(!agendado)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition text-sm font-semibold text-left ${agendado
                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${agendado ? 'bg-amber-600' : 'bg-white border-2 border-gray-300'}`}>
                            {agendado && <Check size={10} strokeWidth={3} className="text-white" />}
                        </div>
                        <div>
                            <div className="text-sm font-bold leading-tight">Agendado</div>
                            <div className="text-[10px] font-medium text-gray-400 leading-tight">Transação futura</div>
                        </div>
                    </button>
                </div>
                {/* Configurações de Recorrência */}
                {repetir && (
                    <div className="flex items-center justify-between bg-blue-50/70 border border-blue-100 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                            <RefreshCw size={16} className="text-blue-500" strokeWidth={2} />
                            <div>
                                <p className="text-sm font-bold text-gray-800">Configurações de Recorrência</p>
                                <p className="text-[11px] text-gray-500">Este lançamento será criado automaticamente todo mês.</p>
                            </div>
                        </div>
                        <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition whitespace-nowrap">
                            Alterar Regra
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default paymentInfo;
