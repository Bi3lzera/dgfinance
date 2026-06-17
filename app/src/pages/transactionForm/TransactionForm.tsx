import React from 'react';
import NotationNReceipt from './components/bodyComponents/NotationNReceipt';
import BasicInfo from './components/bodyComponents/TransactionInfo';
import PaymentDetails from './components/bodyComponents/PaymentInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import Style from './components/Style';
import SidePanel from './components/SidePanel';
import InstallmentModal from '../installmentModal/InstallmentModal';
import AlertDialog from '../../components/alertDialog/alertDialog';
import { useTransactionFormFetch } from './useTransactionFormFetch';
import { useTransactionFormActions } from './useTransactionFormActions';
import { useTransactionFormFuncs } from './useTransactionFormFuncs';
import { useTransactionFormShortcuts } from './useTransactionFormShortcuts';


interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    movementId?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, movementId }) => {
    const formState = useTransactionFormFuncs();
    const {
        tipo, setTipo,
        title, setTitle,
        descricao, setDescricao,
        valor,
        data, setData,
        categoria, setCategoria,
        conta, setConta,
        formaPagamento, setFormaPagamento,
        credor, setCredor,
        parcelas, setParcelas,
        paymentRecurrencyMethod, setPaymentRecurrencyMethod,
        arquivo, setArquivo,
        isDragging, setIsDragging,
        idMovement,
        titleInputRef
    } = formState;

    const fetchState = useTransactionFormFetch({ isOpen, movementId, formState });
    const {
        categories,
        userBanks,
        paymentMethods,
        isLoading,
        loadingText,
        isInstallmentModalOpen, setIsInstallmentModalOpen,
        fileInputRef,
        overlayRef,
    } = fetchState;

    const {
        handleValorChange,
        handleDrop,
        handleFileInput,
        handleOverlayClick,
        handleSaveAndNew,
        handleSaveAndClose,
        alertDialog,
        closeAlertDialog
    } = useTransactionFormActions({ isOpen, onClose, movementId, formState, fetchState });

    useTransactionFormShortcuts({ isOpen, onClose, movementId, handleSaveAndClose, handleSaveAndNew });

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
                        isEditing={!!movementId}
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
                            credor={credor}
                            setCredor={setCredor}
                            tipo={tipo}
                            titleInputRef={titleInputRef}
                        />

                        {/* ── Seção: Detalhes de Pagamento ── */}
                        <PaymentDetails
                            conta={conta}
                            setConta={setConta}
                            userBanks={userBanks}
                            formaPagamento={formaPagamento}
                            setFormaPagamento={setFormaPagamento}
                            paymentMethods={paymentMethods}
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

            <AlertDialog
                isOpen={alertDialog.isOpen}
                onClose={closeAlertDialog}
                title={alertDialog.title}
                message={alertDialog.message}
                type={alertDialog.type}
            />
        </div>
    );
};

export default TransactionForm;