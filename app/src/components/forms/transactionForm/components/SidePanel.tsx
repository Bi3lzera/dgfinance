import { Save, Copy, Clock, Archive, HelpCircle } from "lucide-react";

const SidePanel = () => {
    return (
        <div className="w-[220px] flex-shrink-0 flex flex-col gap-3">
            {/* Ações Rápidas */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Ações Rápidas</span>
                </div>
                <div className="flex flex-col divide-y divide-gray-50">
                    {[
                        { icon: Save, label: 'Salvar Rascunho', desc: 'Mantém as alterações sem finalizar.' },
                        { icon: Copy, label: 'Duplicar', desc: 'Cria uma cópia idêntica deste lançamento.' },
                        { icon: Clock, label: 'Ver Histórico', desc: 'Veja quem e quando alterou este item.' },
                        { icon: Archive, label: 'Arquivar', desc: 'Oculta dos relatórios sem deletar.' },
                    ].map(({ icon: Icon, label, desc }) => (
                        <button key={label} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition text-left w-full">
                            <Icon size={15} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                            <div>
                                <p className="text-sm font-bold text-gray-800 leading-tight">{label}</p>
                                <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Ajuda Contextual */}
            <div className="bg-blue-50/80 rounded-2xl border border-blue-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                    <HelpCircle size={14} className="text-blue-500" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-gray-800">Ajuda Contextual</span>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                    Lançamentos marcados como <strong>Repetir</strong> aparecem na aba "Agendados" até a data de confirmação.
                </p>
                <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 mt-2 transition">
                    Saiba mais sobre recorrência
                </button>
            </div>

            {/* Atalhos */}
            <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2 text-center">Atalhos do Teclado</p>
                <div className="flex items-center justify-center gap-1">
                    <kbd className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md border border-gray-200">CTRL</kbd>
                    <span className="text-gray-400 text-xs font-bold">+</span>
                    <kbd className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md border border-gray-200">S</kbd>
                </div>
            </div>
        </div>
    )
}

export default SidePanel