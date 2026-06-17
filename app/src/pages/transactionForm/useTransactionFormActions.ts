import React, { useState } from 'react';
import { createCompleteTransactionApi, createMovementWithInstallments, updateCompleteTransactionApi } from '../../services/pageServices/transactionActions';
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
    const { title, valor, setValor, setArquivo, setIsDragging, resetForm, titleInputRef, calculateInstallments, hasCalculatedInstallments, paymentRecurrencyMethod, installmentData } = formState;
    const { buildLancamentoPayload, buildMovementWithInstallmentsPayload, isLoading, setIsLoading, setLoadingText, overlayRef } = fetchState;

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

        // Auto-calcula parcelas antes de salvar se ainda não foi calculado
        const isParcelavel = paymentRecurrencyMethod === 'P' || paymentRecurrencyMethod === 'R';
        if (isParcelavel && !hasCalculatedInstallments) {
            calculateInstallments();
        }

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
                const payload = buildLancamentoPayload();
                await updateCompleteTransactionApi(payload, callback);
            } else if (isParcelavel && installmentData.length > 0) {
                // Usa o endpoint com parcelas separadas
                const payload = buildMovementWithInstallmentsPayload();
                await createMovementWithInstallments(payload.movement, payload.installments, callback);
            } else {
                const payload = buildLancamentoPayload();
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

        // Auto-calcula parcelas antes de salvar se ainda não foi calculado
        const isParcelavel = paymentRecurrencyMethod === 'P' || paymentRecurrencyMethod === 'R';
        if (isParcelavel && !hasCalculatedInstallments) {
            calculateInstallments();
        }

        const callback = () => {
            resetForm();
            window.dispatchEvent(new Event('transaction-saved'));
            onClose();
        };

        setLoadingText('Salvando...');
        setIsLoading(true);
        try {
            if (movementId) {
                const payload = buildLancamentoPayload();
                await updateCompleteTransactionApi(payload, callback);
            } else if (isParcelavel && installmentData.length > 0) {
                // Usa o endpoint com parcelas separadas
                const payload = buildMovementWithInstallmentsPayload();
                console.log(payload)
                await createMovementWithInstallments(payload.movement, payload.installments, callback);
            } else {
                const payload = buildLancamentoPayload();
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
