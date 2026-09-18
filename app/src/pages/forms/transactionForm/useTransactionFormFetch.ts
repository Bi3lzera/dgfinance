import { useState, useEffect, useRef } from 'react';
import { getCategories, getUserAccounts, getPaymentMethods } from '../../../services/pageServices/miscelaneous';
import { CategoryModel } from '../../../types/miscelaneousModels';
import { 
    CreateMovementWithInstallmentsDTO, 
    CreateInstallmentDTO, 
    CreateTransactionWithInstallmentsDTO 
} from '../../../types';
import { useTransactionFormFuncs } from './useTransactionFormFuncs';
import { getTransactionDetails } from '../../../services/pageServices/transactionActions';
import { formatCurrencyToBRL } from '../../../utils/formats';

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

    /*
    Carrega as dependencias necessarias para o formulário, ao abrir:
    - Categorias
    - Contas
    - Formas de Pagamento
    */
    useEffect(() => {
        const fetchDependencies = async () => {
            setLoadingText('Carregando...');
            setIsLoading(true);

            //Faz a tentativa de buscar os dados das CATEGORIAS cadastrados.
            try {
                const categoriesRes = await getCategories();
                setCategories(categoriesRes);
            } catch (error) {
                console.error("Erro ao carregar categories: ", error);
            }

            //Faz a tentativa de buscar os dados das CONTAS bancárias cadastrados do usuário logado.
            try {
                const banksRes = await getUserAccounts();
                setUserBanks(banksRes);
            } catch (error) {
                console.error("Erro ao carregar contas bancárias: ", error);
            }

            //Faz a tentativa de buscar os métodos de pagamentos cadastrados para a conta selecionada no passo acima. (TODO)
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

    /*
    Faz a busca dos detalhes da transação, quando aberta a modal para edição usando os dois cliques no lancamento.
    */
    useEffect(() => {
        const fetchDetails = async () => {
            if (isOpen && movementId) {
                setLoadingText('Carregando detalhes...');
                setIsLoading(true);

                //Faz a tentativa de buscar os detalhes da transação clicada.
                try {
                    //Usa o service para buscar os dados na API usando a movementId.
                    const data = await getTransactionDetails(movementId);

                    //Verifica se há dados e se sim continua.
                    if (data) {
                        //Preenche os dados do formulário com os dados entregues pela API.
                        setTipo(data.type === 'Credito' ? 'receita' : 'despesa');
                        setTitle(data.title || '')
                        setDescricao(data.transactionDescription || '');
                        setValor(formatCurrencyToBRL(data.value, false));

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

        const payload: CreateTransactionWithInstallmentsDTO = {
            title: title,
            description: descricao || notas || title,
            totalValue: parsedValor,
            type: tipo === 'receita' ? 'Credito' : 'Debito',
            totalPaymentCount: totalCount,
            totalInstallments: totalCount,
            idCategory: categoria || null,
            date: data,
            plannedDate: data,
            expectedValue: parsedValor,
            installmentNumber: instNum,
            status: agendado ? 'Pendente' : 'Efetivado',
            paymentRecurrencyMethod: paymentRecurrencyMethod || null,
            transactionDescription: descricao || title,
            value: parsedValor,
            idBankAccount: parseInt(conta) || null,
            idPaymentMethod: parseInt(formaPagamento) || null,
            idPaymentCard: null
        };

        if (movementId) {
            payload.idTransaction = idTransaction;
            payload.idInstallment = idInstallment;
            payload.idMovement = idMovement || movementId;
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
        const movement: CreateMovementWithInstallmentsDTO = {
            title: title,
            description: descricao || notas || title,
            totalValue: parsedValor,
            type: tipo === 'receita' ? 'Credito' : 'Debito',
            totalInstallments: totalCount,
            idCategory: categoria || null,
            date: data,
            paymentRecurrencyMethod: paymentRecurrencyMethod || null,
            idBankAccount: parseInt(conta) || null,
            idPaymentMethod: parseInt(formaPagamento) || null,
            transactionDescription: descricao || title,
        };

        // Installments — campos do Model Installment ($fillable)
        // Usa os dados calculados/editados do installmentData
        const installments: CreateInstallmentDTO[] = installmentData.map(inst => ({
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