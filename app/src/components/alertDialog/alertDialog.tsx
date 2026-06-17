import React, { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    confirmLabel?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    isOpen,
    onClose,
    title,
    message,
    type = 'warning',
    confirmLabel = 'OK'
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const confirmButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) {
            confirmButtonRef.current?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    // Estilo com base no tipo de alerta
    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                    iconBg: 'bg-green-50',
                    buttonBg: 'bg-green-600 hover:bg-green-700 shadow-green-500/20',
                    defaultTitle: 'Sucesso',
                };
            case 'error':
                return {
                    icon: <XCircle className="w-6 h-6 text-red-600" />,
                    iconBg: 'bg-red-50',
                    buttonBg: 'bg-red-600 hover:bg-red-700 shadow-red-500/20',
                    defaultTitle: 'Erro',
                };
            case 'info':
                return {
                    icon: <Info className="w-6 h-6 text-blue-600" />,
                    iconBg: 'bg-blue-50',
                    buttonBg: 'bg-[#3f64f7] hover:bg-[#3251c8] shadow-blue-500/20',
                    defaultTitle: 'Informação',
                };
            case 'warning':
            default:
                return {
                    icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
                    iconBg: 'bg-amber-50',
                    buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20',
                    defaultTitle: 'Atenção',
                };
        }
    };

    const styles = getTypeStyles();
    const displayTitle = title || styles.defaultTitle;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            style={{ animation: 'fadeIn 0.15s ease' }}
        >
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .alert-modal-slide { animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
            `}} />

            <div className="alert-modal-slide bg-white rounded-2xl shadow-2xl w-full max-w-[420px] flex flex-col overflow-hidden relative border border-gray-100">
                <div className="p-6 flex flex-col items-center text-center">
                    {/* Ícone */}
                    <div className={`w-14 h-14 rounded-full ${styles.iconBg} flex items-center justify-center mb-4 flex-shrink-0`}>
                        {styles.icon}
                    </div>

                    {/* Título */}
                    <h3 className="text-[18px] font-bold text-gray-900 mb-2 tracking-wide uppercase">
                        {displayTitle}
                    </h3>

                    {/* Mensagem */}
                    <p className="text-sm text-gray-500 leading-relaxed break-words whitespace-pre-line px-2">
                        {message}
                    </p>
                </div>

                {/* Linha divisória fina */}
                <hr className="border-gray-100" />

                {/* Footer/Ações */}
                <div className="p-4 bg-gray-50/50 flex justify-center">
                    <button
                        ref={confirmButtonRef}
                        onClick={onClose}
                        className={`w-full max-w-[200px] py-2.5 px-5 text-sm font-bold text-white rounded-xl transition shadow-md ${styles.buttonBg} cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog;
