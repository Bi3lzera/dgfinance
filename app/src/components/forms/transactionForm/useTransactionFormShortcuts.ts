import { useEffect } from "react";

export interface UseTransactionFormShortcutsProps {
    isOpen: boolean;
    onClose?: () => void;
    movementId?: number;
    isLoading?: boolean;
    handleSaveAndClose?: () => Promise<void>;
    handleSaveAndNew?: () => Promise<void>;
}


export function useTransactionFormShortcuts({ isOpen, onClose, isLoading, handleSaveAndClose, handleSaveAndNew }: UseTransactionFormShortcutsProps) {
    // Gerencia eventos de teclado para o formulário
    // ESC fecha o modal
    // Ctrl+S ou Cmd+S salva o formulário
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (isLoading) return;
            if (e.key === 'Escape') onClose?.();
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSaveAndClose?.();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                e.preventDefault();
                handleSaveAndNew?.();
            }
        };
        if (isOpen) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose, isLoading, handleSaveAndClose, handleSaveAndNew]);
}