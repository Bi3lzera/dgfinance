import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Plus } from 'lucide-react';
import NewTransaction from '../../pages/newTransaction/NewTransaction';

type TopBarProps = {
    pageDescription: string;
    mes: string;
    setMes: (mes: string) => void;
    ano: number;
    setAno: (ano: number) => void;
};

const formatMonth = (m: string) => {
    const map: Record<string, string> = {
        janeiro: 'Janeiro', fevereiro: 'Fevereiro', marco: 'Março',
        abril: 'Abril', maio: 'Maio', junho: 'Junho', julho: 'Julho',
        agosto: 'Agosto', setembro: 'Setembro', outubro: 'Outubro',
        novembro: 'Novembro', dezembro: 'Dezembro'
    };
    return map[m] || m;
};

const mesesArr = [
    { value: 'janeiro', label: 'Jan' },
    { value: 'fevereiro', label: 'Fev' },
    { value: 'marco', label: 'Mar' },
    { value: 'abril', label: 'Abr' },
    { value: 'maio', label: 'Mai' },
    { value: 'junho', label: 'Jun' },
    { value: 'julho', label: 'Jul' },
    { value: 'agosto', label: 'Ago' },
    { value: 'setembro', label: 'Set' },
    { value: 'outubro', label: 'Out' },
    { value: 'novembro', label: 'Nov' },
    { value: 'dezembro', label: 'Dez' }
];

const TopBar: React.FC<TopBarProps> = ({ mes, setMes, ano, setAno }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
    const [pickerYear, setPickerYear] = useState(ano);
    const pickerRef = useRef<HTMLDivElement>(null);

    const mesesValues = mesesArr.map(m => m.value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsPickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePrevMonth = () => {
        const idx = mesesValues.indexOf(mes);
        if (idx === 0) {
            setMes('dezembro');
            setAno(ano - 1);
        } else {
            setMes(mesesValues[idx - 1]);
        }
    };

    const handleNextMonth = () => {
        const idx = mesesValues.indexOf(mes);
        if (idx === 11) {
            setMes('janeiro');
            setAno(ano + 1);
        } else {
            setMes(mesesValues[idx + 1]);
        }
    };

    const handleOpenPicker = () => {
        setPickerYear(ano);
        setIsPickerOpen(!isPickerOpen);
    };

    const handleMonthSelect = (month: string) => {
        setMes(month);
        setAno(pickerYear);
        setIsPickerOpen(false);
    };

    return (
        <>
            <div className="w-full max-w-[86vw] bg-white px-8 py-2 flex items-center justify-between shadow-sm border-b border-gray-100 z-50">
            {/* Seleção de Mês/Ano */}
            <div className="relative" ref={pickerRef}>
                <div className="flex items-center bg-slate-50/70 rounded-2xl px-3 py-2 text-sm gap-8 border border-slate-100/50">
                    <button
                        onClick={handlePrevMonth}
                        className="text-gray-500 hover:text-gray-800 transition p-1 rounded-md hover:bg-slate-200/50"
                        title="Mês anterior"
                    >
                        <ChevronLeft size={16} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={handleOpenPicker}
                        className="flex items-baseline gap-1.5 w-24 justify-center hover:opacity-75 transition cursor-pointer"
                        title="Selecionar período"
                    >
                        <span className="font-bold tracking-wide text-gray-800">{formatMonth(mes)}</span>
                        <span className="text-gray-400 font-medium">{ano}</span>
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="text-gray-500 hover:text-gray-800 transition p-1 rounded-md hover:bg-slate-200/50"
                        title="Próximo mês"
                    >
                        <ChevronRight size={16} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Popup Date Picker */}
                {isPickerOpen && (
                    <div className="absolute top-full mt-3 left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Seletor do Ano */}
                        <div className="flex items-center justify-between mb-4 bg-slate-50/70 rounded-xl px-2 py-1">
                            <button
                                onClick={() => setPickerYear(y => y - 1)}
                                className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded-lg transition"
                            >
                                <ChevronLeft size={16} strokeWidth={2.5} />
                            </button>
                            <span className="font-bold text-gray-800 tracking-wide">{pickerYear}</span>
                            <button
                                onClick={() => setPickerYear(y => y + 1)}
                                className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded-lg transition"
                            >
                                <ChevronRight size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                        {/* Grid de Meses */}
                        <div className="grid grid-cols-3 gap-2">
                            {mesesArr.map(m => {
                                const isSelected = m.value === mes && pickerYear === ano;
                                return (
                                    <button
                                        key={m.value}
                                        onClick={() => handleMonthSelect(m.value)}
                                        className={`py-2.5 rounded-xl text-sm font-medium transition duration-150 ${isSelected
                                            ? 'bg-[#3f64f7] text-white shadow-md shadow-blue-500/20'
                                            : 'text-gray-600 hover:bg-slate-100 hover:text-gray-900 border border-transparent'
                                            }`}
                                    >
                                        {m.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Ações */}
            <div className="flex items-center gap-4">
                {/* Input de Busca */}
                <div className="flex items-center bg-slate-50/70 border border-slate-100/50 rounded-xl px-3 py-2 text-gray-400 focus-within:ring-1 focus-within:ring-[#3f64f7]/30 focus-within:border-[#3f64f7]/30 transition w-64 shadow-sm">
                    <Search size={16} strokeWidth={2} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        className="bg-transparent border-none outline-none ml-2 text-sm text-gray-700 placeholder-gray-400 w-full"
                    />
                </div>

                {/* Botão de Filtro */}
                <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-slate-50 hover:text-gray-800 transition bg-white shadow-sm flex items-center justify-center h-full">
                    <Filter size={18} strokeWidth={2} />
                </button>

                {/* Botão Novo Lançamento */}
                <button
                    onClick={() => setIsNewTransactionOpen(true)}
                    className="flex items-center gap-2 bg-[#3f64f7] hover:bg-[#3251c8] text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-md shadow-blue-500/20"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    Novo Lançamento
                </button>
            </div>
        </div>

            <NewTransaction isOpen={isNewTransactionOpen} onClose={() => setIsNewTransactionOpen(false)} />
        </>
    );
};

export default TopBar;