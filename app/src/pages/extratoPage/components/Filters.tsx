import React from "react";
import { Info, ChevronDown, Filter, Search, X, RefreshCw } from "lucide-react";

interface FiltersProps {
    searchTerm?: string;
    onSearchChange?: (term: string) => void;
    filterTab?: string;
    onFilterTabChange?: (tab: string) => void;
    onResetFilters?: () => void;
    onRefresh?: () => void;
    isLoading?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
    searchTerm = '',
    onSearchChange,
    filterTab = 'Todos',
    onFilterTabChange,
    onResetFilters,
    onRefresh,
    isLoading = false
}) => {
    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                {/* Search Field */}
                <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition">
                    <Search size={18} strokeWidth={2} className="text-gray-400 mr-3 shrink-0" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => onSearchChange?.(e.target.value)}
                        placeholder="Busque por beneficiário, banco, categoria ou valor..."
                        className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => onSearchChange?.('')}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition shrink-0"
                            title="Limpar busca"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Filtros Button */}
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-bold text-[13px] text-gray-800 tracking-wide hover:bg-slate-50 transition shadow-sm">
                    <Filter size={16} strokeWidth={2.5} className="text-blue-600" />
                    FILTROS
                </button>

                {/* Tabs (Todos, Receitas, Despesas) */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                    {
                        ['Todos', 'Receitas', 'Despesas'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => onFilterTabChange?.(tab)}
                                className={`px-6 py-2 rounded-lg text-xs font-bold transition ${filterTab === tab
                                    ? tab === 'Todos' ? 'text-blue-600 bg-blue-50/50'
                                        : tab === 'Receitas' ? 'text-green-600 bg-green-50'
                                            : 'text-red-500 bg-red-50/50'
                                    : 'text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div>
            </div>
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

                <button
                    type="button"
                    onClick={onResetFilters}
                    className="text-[11px] font-bold tracking-wide text-gray-800 hover:text-red-600 hover:underline transition"
                >
                    Remover Todos
                </button>

                <div className="flex items-center justify-end flex-1">
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-300 text-gray-700 text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        title="Atualizar extrato buscando dados da API"
                    >
                        <RefreshCw size={13} className={`text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>{isLoading ? 'Atualizando...' : 'Atualizar Extrato'}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Filters;