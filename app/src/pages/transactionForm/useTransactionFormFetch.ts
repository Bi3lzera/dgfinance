import { useState, useEffect, useRef } from 'react';
import { getCategories, getUserBanks, getPaymentMethods } from '../../services/pageServices/miscelaneous';
import { CategoryModel } from '../../types/miscelaneousModels';
import { useTransactionFormFuncs } from './useTransactionFormFuncs';
import { getTransactionDetails } from '../../services/pageServices/transactionActions';

export type TransactionType = 'receita' | 'despesa';

export interface UseTransactionFormProps {
    isOpen?: boolean;
    movementId?: number;
    formState: ReturnType<typeof useTransactionFormFuncs>;
}

export function useTransactionFormFetch({ isOpen = false, movementId, formState }: UseTransactionFormProps) {
    const {
        tipo, setTipo, title, setTitle, descricao, setDescricao,
        valor, setValor, data, setData, categoria, setCategoria,
        conta, setConta, formaPagamento, setFormaPagamento,
        parcelas, setParcelas, paymentRecurrencyMethod, setPaymentRecurrencyMethod,
        notas, setNotas,
        idTransaction, setIdTransaction, idInstallment, setIdInstallment,
        idMovement, setIdMovement, resetForm,
        installmentData
    } = formState;

    const repetir = paymentRecurrencyMethod === 'R';
    const agendado = paymentRecurrencyMethod === 'A';
    const parcelado = paymentRecurrencyMethod === 'P';

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [userBanks, setUserBanks] = useState<any[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Carregando...');
    const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    //Carrega as dependencias necessarias para o formulário
    //Categorias, Contas e Formas de Pagamento
    useEffect(() => {
        const fetchDependencies = async () => {
            setLoadingText('Carregando...');
            setIsLoading(true);
            try {
                const categoriesRes = await getCategories();
                setCategories(categoriesRes);
            } catch (error) {
                console.error("Erro ao carregar categories: ", error);
            }

            try {
                const banksRes = await getUserBanks();
                setUserBanks(banksRes);
            } catch (error) {
                console.error("Erro ao carregar banks: ", error);
            }

            try {
                const pmRes = await getPaymentMethods();
                setPaymentMethods(pmRes);
            } catch (error) {
                console.error("Erro ao carregar payment methods: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDependencies();
    }, []);

    //Busca os detalhes da transação, quando aberta a modal para edição.
    useEffect(() => {
        const fetchDetails = async () => {
            if (isOpen && movementId) {
                setLoadingText('Carregando detalhes...');
                setIsLoading(true);
                try {
                    const data = await getTransactionDetails(movementId);
                    if (data) {
                        setTipo(data.type === 'Credito' ? 'receita' : 'despesa');
                        setTitle(data.title || '')
                        setDescricao(data.transactionDescription || '');

                        let formattedValue = '';
                        if (data.value !== undefined && data.value !== null) {
                            formattedValue = new Intl.NumberFormat('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(Number(data.value));
                        }
                        setValor(formattedValue);

                        setData(data.date ? data.date.split('T')[0] : '');
                        setCategoria(data.idCategory?.toString() || '');
                        setConta(data.idBankAccount?.toString() || '');
                        setFormaPagamento(data.idPaymentMethod?.toString() || '');
                        let recurrencyMethod = data.paymentRecurrencyMethod || '';
                        if (!recurrencyMethod) {
                            if (data.status === 'Pendente') {
                                recurrencyMethod = 'A';
                            } else if (data.totalPaymentCount > 1) {
                                recurrencyMethod = 'P';
                            }
                        }
                        setPaymentRecurrencyMethod(recurrencyMethod);
                        setParcelas(`${data.installmentNumber || 1}/${data.totalPaymentCount || 1}`);
                        setNotas(data.description || '');

                        setIdTransaction(data.idTransaction || null);
                        setIdInstallment(data.idInstallment || null);
                        setIdMovement(data.idMovement || null);
                    }
                } catch (error) {
                    console.error("Erro ao buscar detalhes:", error);
                } finally {
                    setIsLoading(false);
                }
            } else if (isOpen && !movementId) {
                resetForm();
            }
        };

        fetchDetails();
    }, [isOpen, movementId]);

    const prevDataRef = useRef(data);

    useEffect(() => {
        if (data === prevDataRef.current) return;
        prevDataRef.current = data;

        if (!data || movementId) return;
        // Adjust for local timezone by creating a date at local midnight
        const now = new Date();
        const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        if (data > today) {
            if (paymentRecurrencyMethod !== 'R' && paymentRecurrencyMethod !== 'P') {
                setPaymentRecurrencyMethod('A');
            }
        } else {
            if (paymentRecurrencyMethod === 'A') {
                setPaymentRecurrencyMethod('');
            }
        }
    }, [data, movementId, paymentRecurrencyMethod]);

    const buildLancamentoPayload = () => {
        const parsedValor = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;

        let totalCount = 1;
        let instNum = 1;
        if (parcelado || repetir) {
            if (parcelas.includes('/')) {
                const parts = parcelas.split('/');
                instNum = parseInt(parts[0]) || 1;
                totalCount = parseInt(parts[1]) || 1;
            } else {
                totalCount = parseInt(parcelas) || 1;
                instNum = 1;
            }
        }

        const payload: any = {
            title: title,
            description: notas || descricao,
            initialValue: parsedValor,
            type: tipo === 'receita' ? 'Credito' : 'Debito',
            totalPaymentCount: totalCount,
            idCategory: parseInt(categoria) || 1,
            date: data,
            plannedDate: data,
            expectedValue: parsedValor,
            installmentNumber: instNum,
            status: agendado ? 'Pendente' : 'Efetivado',
            paymentRecurrencyMethod: paymentRecurrencyMethod || null,
            transactionDescription: descricao,
            value: parsedValor,
            idBankAccount: parseInt(conta) || null,
            idPaymentMethod: parseInt(formaPagamento) || null,
            idPaymentCard: null
        };

        if (movementId) {
            payload.idTransaction = idTransaction;
            payload.idInstallment = idInstallment;
            payload.idMovement = idMovement;
        }

        return payload;
    };

    /**
     * Constrói o payload estruturado para criação de movimentação com parcelas.
     * Formato: { movement: {...}, installments: [...] }
     * Campos do movement seguem o fillable do Model Movement.
     * Campos de cada installment seguem o fillable do Model Installment.
     */
    const buildMovementWithInstallmentsPayload = () => {
        const parsedValor = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;

        let totalCount = 1;
        if (parcelado || repetir) {
            if (parcelas.includes('/')) {
                const parts = parcelas.split('/');
                totalCount = parseInt(parts[1]) || 1;
            } else {
                totalCount = parseInt(parcelas) || 1;
            }
        }

        // Movement — campos do Model Movement ($fillable)
        const movement = {
            title: title,
            description: notas || descricao,
            initialValue: parsedValor,
            type: tipo === 'receita' ? 'Credito' : 'Debito',
            totalPaymentCount: totalCount,
            idCategory: parseInt(categoria) || 1,
            date: data,
            paymentRecurrencyMethod: paymentRecurrencyMethod || null,
            idBankAccount: parseInt(conta) || null,
            idPaymentMethod: parseInt(formaPagamento) || null,
            transactionDescription: descricao,
        };

        // Installments — campos do Model Installment ($fillable)
        // Usa os dados calculados/editados do installmentData
        const installments = installmentData.map(inst => ({
            plannedDate: inst.plannedDate,
            expectedValue: inst.expectedValue,
            installmentNumber: inst.installmentNumber,
            status: inst.status || 'Pendente',
        }));

        return { movement, installments };
    };

    return {
        categories, setCategories,
        userBanks, setUserBanks,
        paymentMethods, setPaymentMethods,
        isLoading, setIsLoading,
        loadingText, setLoadingText,
        isInstallmentModalOpen, setIsInstallmentModalOpen,
        fileInputRef,
        overlayRef,
        buildLancamentoPayload,
        buildMovementWithInstallmentsPayload,
    }
}