import { useState, useRef, useCallback } from 'react';

export type TransactionType = 'receita' | 'despesa';

export interface InstallmentItem {
    installmentNumber: number;
    expectedValue: number;
    plannedDate: string;
    status: string;
    paymentMethod?: string;
    totalPaymentCount: number;
}

export function useTransactionFormFuncs() {
    const [tipo, setTipo] = useState<TransactionType>('despesa');
    const [title, setTitle] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [credor, setCredor] = useState('');
    const [parcelas, setParcelas] = useState('1');
    const [paymentRecurrencyMethod, setPaymentRecurrencyMethod] = useState('');
    const [notas, setNotas] = useState('');
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [idTransaction, setIdTransaction] = useState<number | null>(null);
    const [idInstallment, setIdInstallment] = useState<number | null>(null);
    const [idMovement, setIdMovement] = useState<number | null>(null);
    const [installmentData, setInstallmentData] = useState<InstallmentItem[]>([]);
    const [hasCalculatedInstallments, setHasCalculatedInstallments] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);


    const resetForm = () => {
        setTipo('despesa');
        setTitle('');
        setDescricao('');
        setValor('');
        setData(new Date().toISOString().split('T')[0]);
        setCategoria('');
        setConta('');
        setFormaPagamento('');
        setCredor('');
        setParcelas('1');
        setPaymentRecurrencyMethod('');
        setNotas('');
        setArquivo(null);
        setIdTransaction(null);
        setIdInstallment(null);
        setIdMovement(null);
        setInstallmentData([]);
        setHasCalculatedInstallments(false);
    };

    /**
     * Calcula as parcelas dividindo o valor total pelo número de parcelas.
     * Distribui os centavos restantes nas primeiras parcelas.
     * Só é executado automaticamente uma vez (hasCalculatedInstallments controla isso).
     * @param forceRecalculate - Se true, recalcula mesmo que já tenha sido calculado.
     * @returns O array de parcelas calculado.
     */
    const calculateInstallments = useCallback((forceRecalculate = false): InstallmentItem[] => {
        console.log('[calculateInstallments] called', { forceRecalculate, hasCalculatedInstallments, valor, parcelas, data });
        
        // Se já foi calculado automaticamente e não é recalculo forçado, retorna os dados existentes
        if (hasCalculatedInstallments && !forceRecalculate) {
            console.log('[calculateInstallments] already calculated, returning existing data:', installmentData);
            return installmentData;
        }

        const parsedValor = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
        const numParcelas = parseInt(parcelas) || 1;
        const baseDate = data || new Date().toISOString().split('T')[0];

        console.log('[calculateInstallments] parsed values:', { parsedValor, numParcelas, baseDate });

        if (numParcelas <= 0 || parsedValor <= 0) {
            console.log('[calculateInstallments] invalid values, returning empty');
            const empty: InstallmentItem[] = [];
            setInstallmentData(empty);
            setHasCalculatedInstallments(true);
            return empty;
        }

        // Valor base de cada parcela (em centavos para evitar erros de ponto flutuante)
        const totalCentavos = Math.round(parsedValor * 100);
        const baseCentavos = Math.floor(totalCentavos / numParcelas);
        const remainder = totalCentavos - (baseCentavos * numParcelas);

        const items: InstallmentItem[] = [];

        for (let i = 0; i < numParcelas; i++) {
            // Distribui os centavos restantes nas primeiras parcelas
            const centavos = baseCentavos + (i < remainder ? 1 : 0);
            const value = centavos / 100;

            // Calcula a data de vencimento (incrementa mês a mês)
            const dateObj = new Date(baseDate + 'T12:00:00');
            dateObj.setMonth(dateObj.getMonth() + i);
            const plannedDate = dateObj.toISOString().split('T')[0];

            items.push({
                installmentNumber: i + 1,
                expectedValue: value,
                plannedDate,
                status: 'Pendente',
                totalPaymentCount: numParcelas,
            });
        }

        console.log('[calculateInstallments] calculated items:', items);
        setInstallmentData(items);
        setHasCalculatedInstallments(true);
        return items;
    }, [valor, parcelas, data, hasCalculatedInstallments, installmentData]);

    return {
        resetForm,

        tipo,
        title,
        descricao,
        valor,
        data,
        categoria,
        conta,
        formaPagamento,
        credor,
        parcelas,
        paymentRecurrencyMethod,
        notas,
        arquivo,
        isDragging,
        idTransaction,
        idInstallment,
        idMovement,
        installmentData,
        hasCalculatedInstallments,
        titleInputRef,

        setTipo,
        setTitle,
        setDescricao,
        setValor,
        setData,
        setCategoria,
        setConta,
        setFormaPagamento,
        setCredor,
        setParcelas,
        setPaymentRecurrencyMethod,
        setNotas,
        setArquivo,
        setIsDragging,
        setIdTransaction,
        setIdInstallment,
        setIdMovement,
        setInstallmentData,
        setHasCalculatedInstallments,
        calculateInstallments,
    }
}