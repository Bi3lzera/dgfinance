import { useState, useEffect } from 'react';
import { getAllAvailableBanksApi } from '../../services/pageServices/accountActions';

export interface UserAccount {
    idAccount: number;
    idUser: number;
    idBank: number;
    accountNumber: string;
    accountAlias: string;
    bankName: string;
    balance?: number;
    status?: string;
    logoUrl?: string;
}

export const useAccountsData = () => {
    const [accounts, setAccounts] = useState<UserAccount[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccounts = async () => {
        setIsLoading(true);
        try {
            const data = await getAllAvailableBanksApi();
            setAccounts(data as unknown as UserAccount[]);
            setError(null);
        } catch (err) {
            setError('Failed to fetch accounts');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return { accounts, isLoading, error, refetch: fetchAccounts };
};
