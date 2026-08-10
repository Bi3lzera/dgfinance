import { Info, ChevronDown, Filter, Search } from "lucide-react";
import { useState } from "react";

const Filters = () => {
    const [filterTab, setFilterTab] = useState('Geral');
    return (
        <>
            <div className="flex items-center gap-4 mb-4" >
                {/* Search Field */}
                < div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm" >
                    <Search size={18} strokeWidth={2} className="text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Busque por beneficiário, banco, categoria ou valor..."
                        className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    />
                </div >

                {/* Filtros Button */}
                < button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-bold text-[13px] text-gray-800 tracking-wide hover:bg-slate-50 transition shadow-sm" >
                    <Filter size={16} strokeWidth={2.5} className="text-blue-600" />
                    FILTROS
                </button >

                {/* Tabs (Geral, Receitas, Despesas) */}
                < div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm" >
                    {
                        ['Geral', 'Receitas', 'Despesas'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilterTab(tab)}
                                className={`px-6 py-2 rounded-lg text-xs font-bold transition ${filterTab === tab
                                    ? tab === 'Geral' ? 'text-blue-600 bg-blue-50/50'
                                        : tab === 'Receitas' ? 'text-gray-900 bg-gray-50'
                                            : 'text-red-500 bg-red-50/50'
                                    : 'text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div >
            </div >
            <div className="flex items-center gap-6 mb-8 mt-2 px-2">
                <div className="flex items-center gap-2 text-gray-400">
                    <Info size={16} strokeWidth={2} />
                    <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">Contexto Atual</span>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-indigo-50/70 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-indigo-100 transition">
                        Banco: Todos
                        <ChevronDown size={14} strokeWidth={2.5} />
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-50 transition shadow-sm">
                        Status: Efetivado
                        <ChevronDown size={14} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="h-4 w-[1px] bg-gray-300"></div>

                <button className="text-[11px] font-bold tracking-wide text-gray-800 hover:text-red-600 hover:underline transition">
                    Remover Todos
                </button>
            </div>
        </>
    )
}

export default Filters;