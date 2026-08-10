import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Style from './components/Style';
import AccountInfo from './components/AccountInfo';
import { useNewAccountFormFuncs } from './useNewAccountFormFuncs';
// import { createBankAccountApi } from '../../../services/pageServices/accountActions'; 
// import { getAllAvailableBanks } from '../../../services/pageServices/accountActions';

interface NewAccountFormProps {
    isOpen: boolean;
    onClose: () => void;
    accountId?: number;
}

const NewAccountForm: React.FC<NewAccountFormProps> = ({ isOpen, onClose, accountId }) => {
    const formState = useNewAccountFormFuncs();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Carregando...');
    const [banks, setBanks] = useState<{ idBank: number, name: string }[]>([]);

    useEffect(() => {
        if (isOpen) {
            // Simulando fetch de bancos por enquanto (descomentar quando o service for implementado)
            /*
            getAllAvailableBanks().then(res => {
                setBanks(res);
            });
            */
            setBanks([
                { idBank: 1, name: 'Itaú' },
                { idBank: 2, name: 'Nubank' },
                { idBank: 3, name: 'Bradesco' },
                { idBank: 4, name: 'Banco do Brasil' },
                { idBank: 5, name: 'Caixa Econômica' },
            ]);
        }
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    const handleSaveAndNew = () => {
        // Implementar lógica de salvar e manter aberto
        console.log("Salvar e Novo clicado. FormState: ", formState);
    };

    const handleSaveAndClose = () => {
        // Implementar lógica de salvar e fechar
        console.log("Salvar e Fechar clicado. FormState: ", formState);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.15s ease' }}
        >
            <Style />

            <div className={`modal-slide flex gap-4 w-full max-w-[800px] max-h-[92vh] px-4 ${isLoading ? 'pointer-events-none select-none' : ''}`}>
                <div className="flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden min-w-0 relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-gray-500 mt-4 tracking-wider uppercase">{loadingText}</span>
                        </div>
                    )}

                    <Header
                        onClose={onClose}
                        isEditing={!!accountId}
                    />

                    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 flex flex-col gap-5">
                        <AccountInfo
                            accountAlias={formState.accountAlias}
                            setAccountAlias={formState.setAccountAlias}
                            idBank={formState.idBank}
                            setIdBank={formState.setIdBank}
                            accountType={formState.accountType}
                            setAccountType={formState.setAccountType}
                            initialValue={formState.initialValue}
                            handleInitialValueChange={formState.handleInitialValueChange}
                            agencyNumber={formState.agencyNumber}
                            setAgencyNumber={formState.setAgencyNumber}
                            accountNumber={formState.accountNumber}
                            setAccountNumber={formState.setAccountNumber}
                            notes={formState.notes}
                            setNotes={formState.setNotes}
                            banks={banks}
                        />
                    </div>

                    <Footer
                        onClose={onClose}
                        handleSaveAndNew={handleSaveAndNew}
                        handleSaveAndClose={handleSaveAndClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewAccountForm;
