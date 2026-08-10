import React from 'react';
import { Landmark, Hash, CreditCard, AlignLeft, Wallet } from 'lucide-react';

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
    banks?: { idBank: number; name: string }[];
}

const AccountInfo = ({
    accountAlias, setAccountAlias,
    idBank, setIdBank,
    accountType, setAccountType,
    initialValue, handleInitialValueChange,
    agencyNumber, setAgencyNumber,
    accountNumber, setAccountNumber,
    notes, setNotes,
    banks = []
}: AccountInfoProps) => {

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
                        <div className="relative">
                            <Landmark size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={idBank}
                                onChange={e => setIdBank(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            >
                                <option value="">Selecionar...</option>
                                {banks.map(b => <option key={b.idBank} value={b.idBank}>{b.name}</option>)}
                            </select>
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
