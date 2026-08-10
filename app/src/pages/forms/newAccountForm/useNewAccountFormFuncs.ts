import { useState } from 'react';

export const useNewAccountFormFuncs = () => {
    const [accountAlias, setAccountAlias] = useState('');
    const [idBank, setIdBank] = useState<string | number>('');
    const [accountType, setAccountType] = useState('CORRENTE');
    const [initialValue, setInitialValue] = useState('');
    const [agencyNumber, setAgencyNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [notes, setNotes] = useState('');

    const handleInitialValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = (parseInt(value, 10) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        setInitialValue(value);
    };

    return {
        accountAlias, setAccountAlias,
        idBank, setIdBank,
        accountType, setAccountType,
        initialValue, setInitialValue,
        agencyNumber, setAgencyNumber,
        accountNumber, setAccountNumber,
        notes, setNotes,
        handleInitialValueChange
    };
};
