import React, { useState, useEffect } from 'react';
import {
    CreditCard,
    X,
    Calendar,
    Building2,
    CheckCircle2,
    Info
} from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
    movement: any;
    installment: any;
    transaction: any | null;
    userBanks: any[];
    paymentMethods: any[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    movement,
    installment,
    transaction,
    userBanks,
    paymentMethods
}) => {
    const [localData, setLocalData] = useState({
        value: '',
        date: '',
        idBankAccount: '',
        idPaymentMethod: ''
    });

    useEffect(() => {
        if (!isOpen) return;

        const initialValue = transaction?.value 
            ? transaction.value 
            : (installment?.expectedValue || movement?.value || 0);

        const initialDate = transaction?.date 
            ? transaction.date 
            : (installment?.plannedDate || movement?.date || new Date().toISOString().split('T')[0]);

        setLocalData({
            value: Number(initialValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            date: initialDate,
            idBankAccount: transaction?.idBankAccount ? String(transaction.idBankAccount) : '',
            idPaymentMethod: transaction?.idPaymentMethod ? String(transaction.idPaymentMethod) : ''
        });
    }, [isOpen, transaction, installment, movement]);

    const handleValueChange = (newValue: string) => {
        // Allow formatting (e.g., 1.500,00)
        setLocalData(prev => ({ ...prev, value: newValue }));
    };

    const handleConfirm = () => {
        // Parse value back to number
        const parsedValue = parseFloat(localData.value.replace(/\./g, '').replace(',', '.')) || 0;
        
        onConfirm({
            ...localData,
            value: parsedValue
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-[fadeIn_0.15s_ease]">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden relative">

                {/* Header Top */}
                <div className="p-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-gray-900 tracking-wide uppercase">Confirmar Pagamento</h2>
                            <p className="text-[14px] text-gray-500 mt-0.5">
                                Verifique e confirme os dados da transação
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <hr className="border-gray-100" />

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Resumo da Movimentação / Parcela */}
                    <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-3 text-blue-800">
                            <Info className="w-4 h-4" />
                            <span className="text-[12px] font-bold uppercase tracking-wider">Informações Originais</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase">Movimentação</p>
                                <p className="text-[14px] font-medium text-gray-800">{movement?.title || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase">Parcela</p>
                                <p className="text-[14px] font-medium text-gray-800">
                                    {installment?.installmentNumber ? `${String(installment.installmentNumber).padStart(2, '0')}/${String(installment.totalPaymentCount || 1).padStart(2, '0')}` : 'Única'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase">Valor Planejado</p>
                                <p className="text-[14px] font-medium text-gray-800">
                                    R$ {Number(installment?.expectedValue || movement?.value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase">Data Planejada</p>
                                <p className="text-[14px] font-medium text-gray-800">
                                    {installment?.plannedDate || movement?.date ? new Date((installment?.plannedDate || movement?.date) + 'T12:00:00').toLocaleDateString('pt-BR') : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formulário de Confirmação */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Valor Efetivo (R$)</label>
                                <input
                                    type="text"
                                    value={localData.value}
                                    onChange={(e) => handleValueChange(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Data Efetiva</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={localData.date}
                                        onChange={(e) => setLocalData({ ...localData, date: e.target.value })}
                                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Conta / Banco</label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={localData.idBankAccount}
                                        onChange={(e) => setLocalData({ ...localData, idBankAccount: e.target.value })}
                                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                    >
                                        <option value="">Selecionar...</option>
                                        {userBanks.map(b => (
                                            <option key={b.idAccount} value={b.idAccount}>
                                                {b.bankName} {b.accountAlias ? `(${b.accountAlias})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Forma de Pagamento</label>
                                <div className="relative">
                                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={localData.idPaymentMethod}
                                        onChange={(e) => setLocalData({ ...localData, idPaymentMethod: e.target.value })}
                                        className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                    >
                                        <option value="">Selecionar...</option>
                                        {paymentMethods.map(p => (
                                            <option key={p.idPaymentMethod} value={p.idPaymentMethod}>
                                                {p.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Footer */}
                <div className="p-6 flex items-center justify-between bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full border border-gray-200 text-[14px] font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!localData.value || !localData.date || !localData.idBankAccount || !localData.idPaymentMethod}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirmar Pagamento
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentModal;
