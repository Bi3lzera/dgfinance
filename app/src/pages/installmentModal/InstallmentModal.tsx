import React, { useState, useEffect } from 'react';
import {
    CreditCard,
    X,
    Calendar,
    DollarSign,
    CheckCircle2,
    Pencil,
    Trash2
} from 'lucide-react';
import { getInstallmentsApi } from '../../services/pageServices/transactionActions';

interface InstallmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    movementTitle?: string;
    movementId?: number;
}

const InstallmentModal: React.FC<InstallmentModalProps> = ({ isOpen, onClose, movementTitle = "##COLOCAR AQUI O TITULO DA MOVIMENTAÇÃO##", movementId }) => {
    const [installments, setInstallments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && movementId) {
            const fetchInstallments = async () => {
                setIsLoading(true);
                try {
                    const data = await getInstallmentsApi(movementId);
                    if (data) {
                        setInstallments(data);
                    }
                } catch (error) {
                    console.error("Erro ao buscar parcelas:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchInstallments();
        } else {
            setInstallments([]);
        }
    }, [isOpen, movementId]);

    const totalPago = installments
        .filter(i => i.status === 'Efetivado' || i.status === 'Pago')
        .reduce((acc, curr) => acc + Number(curr.expectedValue || 0), 0);

    const totalRestante = installments
        .filter(i => i.status !== 'Efetivado' && i.status !== 'Pago')
        .reduce((acc, curr) => acc + Number(curr.expectedValue || 0), 0);

    const quantidade = installments.length;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Efetivado":
            case "Pago":
                return "bg-green-50 border border-gray-200 text-green-800";
            case "Atrasado":
                return "bg-[#e53e3e] text-white border border-transparent";
            case "Pendente":
                return "bg-yellow-100 text-gray-800 border border-transparent";
            default:
                return "bg-gray-100 text-gray-800 border border-transparent";
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-[fadeIn_0.15s_ease]">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[1000px] max-h-[90vh] flex flex-col overflow-hidden relative">

                {isLoading && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-gray-500 mt-4 tracking-wider uppercase">Carregando parcelas...</span>
                    </div>
                )}

                {/* Header Top */}
                <div className="p-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-gray-900 tracking-wide uppercase">Parcelas</h2>
                            <p className="text-[14px] text-gray-500 mt-0.5">
                                Detalhamento de movimentação: {movementTitle}
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

                {/* Header Summary */}
                <div className="grid grid-cols-3 bg-gray-50/50">
                    <div className="p-6 border-r border-gray-100">
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Pago</p>
                        <p className="text-[20px] font-bold text-gray-900">R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-6 border-r border-gray-100">
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Restante</p>
                        <p className="text-[20px] font-bold text-[#e53e3e]">R$ {totalRestante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-6">
                        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Quantidade</p>
                        <p className="text-[20px] font-bold text-gray-900">{String(quantidade).padStart(2, '0')} Parcelas</p>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Table Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto min-h-[300px]">
                    {installments.length === 0 && !isLoading ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Nenhuma parcela encontrada.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[10%]">Nº</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[20%]">Valor</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[20%]">Vencimento</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[15%]">Status</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[20%]">Método Pagamento</th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-[15%] text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {installments.map((inst: any) => (
                                    <tr key={inst.idInstallment} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5 text-[15px] font-medium text-gray-700">
                                            {String(inst.installmentNumber).padStart(2, '0')}/{String(inst.totalPaymentCount || quantidade).padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-5 text-[15px] font-bold text-gray-900">
                                            R$ {Number(inst.expectedValue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-[14px] text-gray-600">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {inst.plannedDate ? new Date(inst.plannedDate).toLocaleDateString('pt-BR') : '--'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold tracking-wide ${getStatusStyle(inst.status || "Pendente")}`}>
                                                {inst.status || "Pendente"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            {inst.paymentMethod ? (
                                                <div className="flex items-center gap-2 text-[13px] font-bold text-gray-600 tracking-wide">
                                                    <DollarSign className="w-4 h-4 text-blue-500" />
                                                    {inst.paymentMethod}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-[14px]">--</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-3">
                                                {inst.status !== "Efetivado" && inst.status !== "Pago" && (
                                                    <button className="text-gray-300 hover:text-green-500 transition-colors" title="Marcar como pago">
                                                        <CheckCircle2 className="w-[18px] h-[18px]" />
                                                    </button>
                                                )}
                                                <button className="text-gray-300 hover:text-blue-500 transition-colors" title="Editar parcela">
                                                    <Pencil className="w-[18px] h-[18px]" />
                                                </button>
                                                <button className="text-gray-300 hover:text-red-500 transition-colors" title="Excluir parcela">
                                                    <Trash2 className="w-[18px] h-[18px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <hr className="border-gray-100" />

                {/* Footer */}
                <div className="p-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full border border-gray-200 text-[14px] font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InstallmentModal;
