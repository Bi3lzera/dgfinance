import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Style from './components/Style';
import AccountInfo from './components/AccountInfo';
import { useNewAccountFormFuncs } from './useNewAccountFormFuncs';
import { createBankAccountApi } from '../../../services/pageServices/accountActions';
import { getBanks } from '../../../services/pageServices/miscelaneous';

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
            getBanks().then((res: any) => {
                setBanks(res);
            });
        }
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    const getPayload = () => {
        const numericInitialValue = formState.initialValue
            ? parseFloat(formState.initialValue.replace(/\./g, '').replace(',', '.'))
            : 0;

        return {
            idBank: formState.idBank,
            accountAlias: formState.accountAlias,
            accountType: formState.accountType,
            initialValue: numericInitialValue,
            agencyNumber: formState.agencyNumber,
            accountNumber: formState.accountNumber,
            notes: formState.notes,
        };
    };

    const handleSaveAndNew = async () => {
        setIsLoading(true);
        setLoadingText('Salvando...');
        try {
            await createBankAccountApi(getPayload());
            formState.setAccountAlias('');
            formState.setInitialValue('');
            formState.setAgencyNumber('');
            formState.setAccountNumber('');
            formState.setNotes('');
            formState.setIdBank('');
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar a conta");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAndClose = async () => {
        setIsLoading(true);
        setLoadingText('Salvando...');
        try {
            await createBankAccountApi(getPayload());
            onClose();
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar a conta");
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
