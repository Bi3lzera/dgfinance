import React, { useState } from 'react';
import { createCompleteTransactionApi, updateCompleteTransactionApi } from '../../services/pageServices/transactionActions';
import { useTransactionFormFetch } from './useTransactionFormFetch';
import { useTransactionFormFuncs } from './useTransactionFormFuncs';

export type TransactionType = 'receita' | 'despesa';

export interface UseTransactionFormActionsProps {
    isOpen: boolean;
    onClose?: () => void;
    movementId?: number;
    formState: ReturnType<typeof useTransactionFormFuncs>;
    fetchState: ReturnType<typeof useTransactionFormFetch>;
}

export function useTransactionFormActions({ onClose = () => { }, movementId, formState, fetchState }: UseTransactionFormActionsProps) {
    const { title, valor, setValor, setArquivo, setIsDragging, resetForm, titleInputRef } = formState;
    const { buildLancamentoPayload, isLoading, setIsLoading, setLoadingText, overlayRef } = fetchState;

    const [alertDialog, setAlertDialog] = useState<{
        isOpen: boolean;
        message: string;
        title?: string;
        type?: 'info' | 'success' | 'warning' | 'error';
    }>({
        isOpen: false,
        message: ''
    });

    const triggerAlert = (message: string, title?: string, type: 'info' | 'success' | 'warning' | 'error' = 'warning') => {
        setAlertDialog({
            isOpen: true,
            message,
            title,
            type
        });
    };

    const closeAlertDialog = () => {
        setAlertDialog(prev => ({ ...prev, isOpen: false }));
    };


    const handleSaveAndNew = async () => {
        if (!title || !valor) {
            triggerAlert('Preencha a descrição e o valor.', 'Campos Obrigatórios', 'warning');
            return;
        }
        const payload = buildLancamentoPayload();
        const callback = () => {
            resetForm();
            window.dispatchEvent(new Event('transaction-saved'));
            setTimeout(() => {
                titleInputRef.current?.focus();
            }, 50);
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
        if (!title || !valor) {
            triggerAlert('Preencha a descrição breve e o valor.', 'Campos Obrigatórios', 'warning');
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

    return {
        handleSaveAndNew,
        handleSaveAndClose,
        handleValorChange,
        handleDrop,
        handleFileInput,
        handleOverlayClick,
        alertDialog,
        closeAlertDialog
    }
}
