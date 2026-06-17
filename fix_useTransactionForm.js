const fs = require('fs');

const path = 'app/src/pages/transactionForm/useTransactionForm.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  "export function useTransactionForm() {",
  `export type TransactionType = 'receita' | 'despesa';

export interface UseTransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    movementId?: number;
}

export function useTransactionForm({ isOpen, onClose, movementId }: UseTransactionFormProps) {`
);

code = code.replace(
  "    return {\n        handleValorChange,\n        handleDrop,\n        handleFileInput,\n        handleOverlayClick,\n        handleSaveAndNew,\n        handleSaveAndClose\n    }",
  `    return {
        tipo, setTipo,
        title, setTitle,
        descricao, setDescricao,
        valor, setValor,
        data, setData,
        categoria, setCategoria,
        conta, setConta,
        formaPagamento, setFormaPagamento,
        credor, setCredor,
        parcelas, setParcelas,
        paymentRecurrencyMethod, setPaymentRecurrencyMethod,
        notas, setNotas,
        arquivo, setArquivo,
        isDragging, setIsDragging,
        categories, setCategories,
        userBanks, setUserBanks,
        paymentMethods, setPaymentMethods,
        idTransaction, setIdTransaction,
        idInstallment, setIdInstallment,
        idMovement, setIdMovement,
        isLoading, setIsLoading,
        loadingText, setLoadingText,
        isInstallmentModalOpen, setIsInstallmentModalOpen,
        fileInputRef,
        overlayRef,
        handleValorChange,
        handleDrop,
        handleFileInput,
        handleOverlayClick,
        handleSaveAndNew,
        handleSaveAndClose
    }`
);

fs.writeFileSync(path, code);
