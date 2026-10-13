import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Landmark, Hash, CreditCard, AlignLeft, Wallet, Globe, ChevronDown, Search, Check, X } from 'lucide-react';

interface AccountInfoProps {
    accountAlias: string;
    setAccountAlias: (alias: string) => void;
    idBank: string | number;
    setIdBank: (id: string | number) => void;
    accountType: string;
    setAccountType: (type: string) => void;
    initialValue: string;
    handleInitialValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    agencyNumber: string;
    setAgencyNumber: (agency: string) => void;
    accountNumber: string;
    setAccountNumber: (account: string) => void;
    notes: string;
    setNotes: (notes: string) => void;
    banks?: { idBank: number; name: string; codeCOMPE: string }[];
    isOpenFinance?: boolean;
    setIsOpenFinance?: (isOpen: boolean) => void;
}

const AccountInfo = ({
    accountAlias, setAccountAlias,
    idBank, setIdBank,
    accountType, setAccountType,
    initialValue, handleInitialValueChange,
    agencyNumber, setAgencyNumber,
    accountNumber, setAccountNumber,
    notes, setNotes,
    banks = [],
    isOpenFinance = false,
    setIsOpenFinance = () => { }
}: AccountInfoProps) => {
    const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
    const [bankSearch, setBankSearch] = useState('');
    const bankDropdownRef = useRef<HTMLDivElement>(null);

    const selectedBank = useMemo(() => {
        return banks.find(b => String(b.idBank) === String(idBank));
    }, [banks, idBank]);

    const filteredBanks = useMemo(() => {
        if (!bankSearch.trim()) return banks;
        const term = bankSearch.toLowerCase();
        return banks.filter(b =>
            (b.name && b.name.toLowerCase().includes(term)) ||
            (b.codeCOMPE && b.codeCOMPE.toLowerCase().includes(term))
        );
    }, [banks, bankSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (bankDropdownRef.current && !bankDropdownRef.current.contains(event.target as Node)) {
                setIsBankDropdownOpen(false);
            }
        };

        if (isBankDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isBankDropdownOpen]);

    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <Landmark size={13} className="text-blue-500" strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Informações da Conta</span>
            </div>
            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4 flex flex-col gap-4">

                {/* Apelido e Valor Inicial */}
                <div className="grid grid-cols-[1fr_180px] gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Apelido da Conta</label>
                        <input
                            value={accountAlias}
                            onChange={e => setAccountAlias(e.target.value)}
                            placeholder="Ex: Conta Corrente Itaú"
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Saldo Inicial (R$)</label>
                        <input
                            value={initialValue ? `R$ ${initialValue}` : ''}
                            onChange={handleInitialValueChange}
                            placeholder="R$ 0,00"
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-emerald-600 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                        />
                    </div>
                </div>

                {/* Instituição, Tipo, Agência e Conta */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Instituição</label>
                        <div className="relative" ref={bankDropdownRef}>
                            <Landmark size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                            <button
                                type="button"
                                onClick={() => setIsBankDropdownOpen(prev => !prev)}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-8 py-2.5 text-sm text-left text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition flex items-center justify-between cursor-pointer"
                            >
                                <span className="truncate block">
                                    {selectedBank ? `${selectedBank.codeCOMPE} - ${selectedBank.name}` : 'Selecionar...'}
                                </span>
                                <ChevronDown size={14} className={`text-gray-400 absolute right-3 transition-transform duration-200 pointer-events-none ${isBankDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Caixa de seleção com tamanho limitado em altura e largura, abrindo somente para o lado inferior */}
                            {isBankDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1.5 w-[320px] max-w-[calc(100vw-3rem)] max-h-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
                                    <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50/80">
                                        <Search size={13} className="text-gray-400 ml-1 shrink-0" />
                                        <input
                                            type="text"
                                            value={bankSearch}
                                            onChange={e => setBankSearch(e.target.value)}
                                            placeholder="Buscar banco ou código COMPE..."
                                            className="w-full bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
                                            autoFocus
                                            onClick={e => e.stopPropagation()}
                                        />
                                        {bankSearch && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setBankSearch('');
                                                }}
                                                className="p-0.5 text-gray-400 hover:text-gray-600 rounded"
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="overflow-y-auto max-h-48 p-1 scrollbar-hide flex flex-col gap-0.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIdBank('');
                                                setIsBankDropdownOpen(false);
                                                setBankSearch('');
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs rounded-lg transition flex items-center justify-between ${
                                                !idBank ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span>Selecionar...</span>
                                            {!idBank && <Check size={12} className="text-blue-600" />}
                                        </button>

                                        {filteredBanks.length === 0 ? (
                                            <div className="px-3 py-4 text-center text-xs text-gray-400">
                                                Nenhum banco encontrado
                                            </div>
                                        ) : (
                                            filteredBanks.map(b => {
                                                const isSelected = String(b.idBank) === String(idBank);
                                                return (
                                                    <button
                                                        key={b.idBank}
                                                        type="button"
                                                        onClick={() => {
                                                            setIdBank(b.idBank);
                                                            setIsBankDropdownOpen(false);
                                                            setBankSearch('');
                                                        }}
                                                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition flex items-center justify-between gap-2 ${
                                                            isSelected 
                                                                ? 'bg-blue-50 text-blue-700 font-bold' 
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        <span className="truncate">
                                                            <span className="font-semibold text-gray-400 mr-1.5">{b.codeCOMPE}</span>
                                                            {b.name}
                                                        </span>
                                                        {isSelected && <Check size={12} className="text-blue-600 shrink-0" />}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Tipo de Conta</label>
                        <div className="relative">
                            <Wallet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={accountType}
                                onChange={e => setAccountType(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            >
                                <option value="CORRENTE">Corrente</option>
                                <option value="POUPANCA">Poupança</option>
                                <option value="INVESTIMENTO">Investimento</option>
                                <option value="CARTEIRA">Carteira</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Agência</label>
                        <div className="relative">
                            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={agencyNumber}
                                onChange={e => setAgencyNumber(e.target.value)}
                                placeholder="0000"
                                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Número da Conta</label>
                        <div className="relative">
                            <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={e => setAccountNumber(e.target.value)}
                                placeholder="000000-0"
                                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Integração Open Finance */}
                <div
                    onClick={() => setIsOpenFinance(!isOpenFinance)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${isOpenFinance
                        ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isOpenFinance
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                            : 'bg-gray-100 text-gray-400'
                            }`}>
                            <Globe size={18} strokeWidth={2.2} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                                    Vincular ao Open Finance
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${isOpenFinance
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                                    }`}>
                                    {isOpenFinance ? 'Sim' : 'Não'}
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                                {isOpenFinance
                                    ? 'Conta selecionada para integração automática via Open Finance.'
                                    : 'Habilite para vincular e integrar esta conta automaticamente.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-bold transition-colors ${isOpenFinance ? 'text-blue-600' : 'text-gray-400'
                            }`}>
                            {isOpenFinance ? 'Sim' : 'Não'}
                        </span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isOpenFinance}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpenFinance(!isOpenFinance);
                            }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${isOpenFinance ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${isOpenFinance ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Notas/Descrição */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Observações (Opcional)</label>
                    <div className="relative">
                        <AlignLeft size={14} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Adicione notas ou observações sobre esta conta..."
                            rows={3}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition resize-none"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AccountInfo;
