import React, { useState, useEffect, useRef } from 'react';
import { getCategories, getUserBanks, getPaymentMethods } from '../../services/pageServices/miscelaneous';
import { CategoryModel } from '../../types/miscelaneousModels';
import { createCompleteTransactionApi, updateCompleteTransactionApi, getTransactionDetails } from '../../services/pageServices/transactionActions';
import NotationNReceipt from './components/bodyComponents/NotationNReceipt';
import BasicInfo from './components/bodyComponents/TransactionInfo';
import PaymentDetails from './components/bodyComponents/PaymentInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import Style from './components/Style';
import SidePanel from './components/SidePanel';
import InstallmentModal from '../installmentModal/InstallmentModal';

type TransactionType = 'receita' | 'despesa';

interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    movementId?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, movementId }) => {
    const [tipo, setTipo] = useState<TransactionType>('despesa');
    const [title, setTitle] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [parcelas, setParcelas] = useState('1/1');
    const [paymentRecurrencyMethod, setPaymentRecurrencyMethod] = useState<string>('');
    const repetir = paymentRecurrencyMethod === 'R';
    const agendado = paymentRecurrencyMethod === 'A';
    const parcelado = paymentRecurrencyMethod === 'P';


    const [notas, setNotas] = useState('');
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [userBanks, setUserBanks] = useState<any[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [idTransaction, setIdTransaction] = useState<number | null>(null);
    const [idInstallment, setIdInstallment] = useState<number | null>(null);
    const [idMovement, setIdMovement] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Carregando...');
    const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Format valor as currency in real time
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanValue = e.target.value.replace(/\D/g, "");
        if (cleanValue === "") {
            setValor("");
            return;
        }
        const cents = parseInt(cleanValue, 10);
        const formatted = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(cents / 100);
        setValor(formatted);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setArquivo(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setArquivo(file);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (isLoading) return;
        if (e.target === overlayRef.current) {
            resetForm();
            onClose();
        }
    };

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

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (isLoading) return;
            if (e.key === 'Escape') onClose();
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // save handler
            }
        };
        if (isOpen) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose, isLoading]);

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

    const resetForm = () => {
        setTipo('despesa');
        setTitle('');
        setDescricao('');
        setValor('');
        setData(new Date().toISOString().split('T')[0]);
        setCategoria('');
        setConta('');
        setFormaPagamento('');
        setParcelas('1');
        setPaymentRecurrencyMethod('');
        setNotas('');
        setArquivo(null);
        setIdTransaction(null);
        setIdInstallment(null);
        setIdMovement(null);
    };

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

    const handleSaveAndNew = async () => {
        if (!descricao || !valor) {
            alert('Preencha a descrição e o valor.');
            return;
        }
        const payload = buildLancamentoPayload();
        const callback = () => {
            resetForm();
            window.dispatchEvent(new Event('transaction-saved'));
        };

        setLoadingText('Salvando...');
        setIsLoading(true);
        try {
            if (movementId) {
                await updateCompleteTransactionApi(payload, callback);
            } else {
                await createCompleteTransactionApi(payload, callback);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAndClose = async () => {
        if (!descricao || !valor) {
            alert('Preencha a descrição e o valor.');
            return;
        }
        const payload = buildLancamentoPayload();
        const callback = () => {
            resetForm();
            window.dispatchEvent(new Event('transaction-saved'));
            onClose();
        };

        setLoadingText('Salvando...');
        setIsLoading(true);
        try {
            if (movementId) {
                await updateCompleteTransactionApi(payload, callback);
            } else {
                await createCompleteTransactionApi(payload, callback);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.15s ease' }}
        >

            {/* Estiliza o componente */}
            <Style />

            <div className={`modal-slide flex gap-4 w-full max-w-[900px] max-h-[92vh] px-4 ${isLoading ? 'pointer-events-none select-none' : ''}`}>
                {/* ── Main Form ── */}
                <div className="flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden min-w-0 relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-gray-500 mt-4 tracking-wider uppercase">{loadingText}</span>
                        </div>
                    )}

                    {/* Header */}
                    <Header
                        tipo={tipo}
                        setTipo={setTipo}
                        onClose={onClose}
                    />

                    {/* Body — scrollable */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 flex flex-col gap-5">

                        {/* ── Seção: Informações Básicas ── */}
                        <BasicInfo
                            title={title}
                            setTitle={setTitle}
                            valor={valor}
                            handleValorChange={handleValorChange}
                            data={data}
                            setData={setData}
                            categoria={categoria}
                            setCategoria={setCategoria}
                            categorias={categories}
                            formaPagamento={formaPagamento}
                            setFormaPagamento={setFormaPagamento}
                            paymentMethods={paymentMethods}
                            tipo={tipo}
                        />

                        {/* ── Seção: Detalhes de Pagamento ── */}
                        <PaymentDetails
                            conta={conta}
                            setConta={setConta}
                            userBanks={userBanks}
                            parcelas={parcelas}
                            setParcelas={setParcelas}
                            recurrencyMethod={paymentRecurrencyMethod}
                            setRecurrencyMethod={setPaymentRecurrencyMethod}
                            movementId={movementId}
                            onOpenInstallments={() => setIsInstallmentModalOpen(true)}
                        />

                        {/* ── Seção: Anotações e Comprovantes ── */}
                        <NotationNReceipt
                            description={descricao}
                            setDescription={setDescricao}
                            arquivo={arquivo}
                            setArquivo={setArquivo}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            fileInputRef={fileInputRef}
                            handleDrop={handleDrop}
                            handleFileInput={handleFileInput}
                        />
                    </div>

                    {/* Footer */}
                    <Footer
                        onClose={onClose}
                        handleSaveAndNew={handleSaveAndNew}
                        handleSaveAndClose={handleSaveAndClose}
                    />
                </div>

                {/* ── Painel Lateral: Ações Rápidas ── */}
                <SidePanel />
            </div>

            <InstallmentModal
                isOpen={isInstallmentModalOpen}
                onClose={() => setIsInstallmentModalOpen(false)}
                movementTitle={descricao}
                movementId={idMovement ?? undefined}
            />
        </div>
    );
};

export default TransactionForm;