import React, { useState, useEffect, useRef } from 'react';
import { getCategories, getUserBanks, getPaymentMethods } from '../../services/pageServices/miscelaneous';
import { CategoryModel } from '../../types/miscelaneousModels';
import { createCompleteTransactionApi, getTransactionDetails } from '../../services/pageServices/transactionActions';
import NotationNReceipt from './components/bodyComponents/NotationNReceipt';
import BasicInfo from './components/bodyComponents/TransactionInfo';
import PaymentDetails from './components/bodyComponents/PaymentInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import Style from './components/Style';
import SidePanel from './components/SidePanel';

type TransactionType = 'receita' | 'despesa';

interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    movementId?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, movementId }) => {
    const [tipo, setTipo] = useState<TransactionType>('despesa');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [parcelas, setParcelas] = useState('1/1');
    const [repetir, setRepetir] = useState(false);
    const [agendado, setAgendado] = useState(false);
    const [notas, setNotas] = useState('');
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [userBanks, setUserBanks] = useState<any[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Format valor as currency on blur
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d,]/g, '');
        setValor(raw);
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
        if (e.target === overlayRef.current) {
            resetForm();
            onClose();
        }
    };

    useEffect(() => {
        const fetchDependencies = async () => {
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
            }
        };
        fetchDependencies();
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            if (isOpen && movementId) {
                try {
                    const data = await getTransactionDetails(movementId);
                    if (data) {
                        setTipo(data.type === 'Credito' ? 'receita' : 'despesa');
                        setDescricao(data.title || data.transactionDescription || '');

                        let formattedValue = '';
                        if (data.value !== undefined && data.value !== null) {
                            formattedValue = Number(data.value).toFixed(2).replace('.', ',');
                        }
                        setValor(formattedValue);

                        setData(data.date ? data.date.split('T')[0] : '');
                        setCategoria(data.idCategory?.toString() || '');
                        setConta(data.idBankAccount?.toString() || '');
                        setFormaPagamento(data.idPaymentMethod?.toString() || '');
                        setParcelas(`${data.installmentNumber || 1}/${data.totalPaymentCount || 1}`);
                        setAgendado(data.status === 'Pendente');
                        setNotas(data.description || '');
                    }
                } catch (error) {
                    console.error("Erro ao buscar detalhes:", error);
                }
            } else if (isOpen && !movementId) {
                resetForm();
            }
        };

        fetchDetails();
    }, [isOpen, movementId]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // save handler
            }
        };
        if (isOpen) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!data) return;
        // Adjust for local timezone by creating a date at local midnight
        const now = new Date();
        const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        if (data > today) {
            setAgendado(true);
        } else {
            setAgendado(false);
        }
    }, [data]);

    const resetForm = () => {
        setTipo('despesa');
        setDescricao('');
        setValor('');
        setData(new Date().toISOString().split('T')[0]);
        setCategoria('');
        setConta('');
        setFormaPagamento('');
        setParcelas('1/1');
        setRepetir(false);
        setAgendado(false);
        setNotas('');
        setArquivo(null);
    };

    const buildLancamentoPayload = () => {
        const parsedValor = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
        return {
            title: descricao,
            description: notas || descricao,
            initialValue: parsedValor,
            type: tipo === 'receita' ? 'Credito' : 'Debito',
            totalPaymentCount: parseInt(parcelas.split('/')[0]) || 1,
            idCategory: parseInt(categoria) || 1,
            date: data,
            plannedDate: data,
            expectedValue: parsedValor,
            installmentNumber: 1,
            status: agendado ? 'Pendente' : 'Efetivado',
            transactionDescription: descricao,
            value: parsedValor,
            idBankAccount: parseInt(conta) || null,
            idPaymentMethod: parseInt(formaPagamento) || null,
            idPaymentCard: null
        };
    };

    const handleSaveAndNew = async () => {
        if (!descricao || !valor) {
            alert('Preencha a descrição e o valor.');
            return;
        }
        const payload = buildLancamentoPayload();
        await createCompleteTransactionApi(payload, () => {
            resetForm();
        });
    };

    const handleSaveAndClose = async () => {
        if (!descricao || !valor) {
            alert('Preencha a descrição e o valor.');
            return;
        }
        const payload = buildLancamentoPayload();
        await createCompleteTransactionApi(payload, () => {
            resetForm();
            onClose();
        });
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

            <div className="modal-slide flex gap-4 w-full max-w-[900px] max-h-[92vh] px-4">
                {/* ── Main Form ── */}
                <div className="flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden min-w-0">

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
                            descricao={descricao}
                            setDescricao={setDescricao}
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
                            repetir={repetir}
                            setRepetir={setRepetir}
                            agendado={agendado}
                            setAgendado={setAgendado}
                        />

                        {/* ── Seção: Anotações e Comprovantes ── */}
                        <NotationNReceipt
                            notas={notas}
                            setNotas={setNotas}
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
        </div>
    );
};

export default TransactionForm;