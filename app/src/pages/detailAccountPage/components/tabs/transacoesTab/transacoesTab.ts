import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { getAllTransactionsByAccountApi } from '../../../../../services/pageServices/transactionTabServices/transactionTabServices';
import { DateContext } from '../../../../../contexts/DateContext';

export interface BankAccountTransaction {
    idAccount: number;
    idUser: number;
    idBank: number;
    accountNumber: string;
    accountAlias: string;
    bankName: string;
    idTransaction: number;
    date: string;
    transactionValue: number | string;
    transactionType: string;
    idMovement: number | null;
    movementTitle: string | null;
    movementCategory: string | null;
}

export const isIncomeTransaction = (type?: string): boolean => {
    if (!type) return false;
    const lower = type.trim().toLowerCase();
    return lower === 'receita' || lower === 'income' || lower === 'entrada' || lower === 'crédito' || lower === 'credito';
};

export const parseNumericValue = (value: number | string | undefined | null): number => {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;
    const parsed = parseFloat(String(value).replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
};

export const formatDateBR = (dateStr?: string): string => {
    if (!dateStr) return '-';
    try {
        const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.split(' ')[0];
        const parts = cleanDate.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        }
        return dateStr;
    } catch {
        return dateStr;
    }
};

export const useTransacoesTab = (idAccount?: number) => {
    const [transactions, setTransactions] = useState<BankAccountTransaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<'todos' | 'receita' | 'despesa'>('todos');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const { mes, ano } = useContext(DateContext);
    const itemsPerPage = 8;

    const monthMap: { [key: string]: number } = {
        "janeiro": 1, "fevereiro": 2, "marco": 3, "março": 3, "abril": 4,
        "maio": 5, "junho": 6, "julho": 7, "agosto": 8,
        "setembro": 9, "outubro": 10, "novembro": 11, "dezembro": 12
    };
    const monthNumber = monthMap[mes?.toLowerCase()] || 1;
    const formattedMonth = monthNumber.toString().padStart(2, '0');

    const initialDate = `${ano}-${formattedMonth}-01`;
    const lastDayOfMonth = new Date(ano, monthNumber, 0).getDate();
    const finalDate = `${ano}-${formattedMonth}-${lastDayOfMonth}`;

    useEffect(() => {
        const handleSaved = () => {
            setRefreshTrigger(prev => prev + 1);
        };
        window.addEventListener('transaction-saved', handleSaved);
        return () => {
            window.removeEventListener('transaction-saved', handleSaved);
        };
    }, []);

    const fetchTransactions = useCallback(async (signal?: AbortSignal) => {
        if (!idAccount) {
            setTransactions([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await getAllTransactionsByAccountApi(idAccount, initialDate, finalDate, signal);
            if (Array.isArray(data)) {
                setTransactions(data);
            } else {
                setTransactions([]);
            }
        } catch (err: any) {
            if (err?.name !== 'CanceledError' && err?.name !== 'AbortError' && err?.code !== 'ERR_CANCELED') {
                console.error('Erro ao carregar transações:', err);
                setError('Não foi possível carregar as transações desta conta.');
                setTransactions([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [idAccount, initialDate, finalDate]);

    useEffect(() => {
        const controller = new AbortController();
        fetchTransactions(controller.signal);

        return () => {
            controller.abort();
        };
    }, [fetchTransactions, refreshTrigger]);

    // Reset pagination when search, filter or date changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType, mes, ano]);

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        const filtered = transactions.filter((item) => {
            const isIncome = isIncomeTransaction(item.transactionType);
            if (filterType === 'receita' && !isIncome) return false;
            if (filterType === 'despesa' && isIncome) return false;

            if (!searchTerm.trim()) return true;

            const term = searchTerm.toLowerCase();
            const title = (item.movementTitle || '').toLowerCase();
            const category = (item.movementCategory || '').toLowerCase();
            const bank = (item.bankName || '').toLowerCase();
            const alias = (item.accountAlias || '').toLowerCase();
            const accountNum = (item.accountNumber || '').toLowerCase();
            const valStr = String(item.transactionValue || '');
            const dateBR = formatDateBR(item.date);

            return (
                title.includes(term) ||
                category.includes(term) ||
                bank.includes(term) ||
                alias.includes(term) ||
                accountNum.includes(term) ||
                valStr.includes(term) ||
                dateBR.includes(term)
            );
        });

        // Ordenar por data decrescente (mais recente primeiro)
        return filtered.sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });
    }, [transactions, searchTerm, filterType]);

    // Pagination calculations
    const totalItems = filteredTransactions.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredTransactions.slice(start, start + itemsPerPage);
    }, [filteredTransactions, currentPage, itemsPerPage]);

    // Financial summaries
    const metrics = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;
        let expenseCount = 0;
        let incomeCount = 0;

        transactions.forEach((tx) => {
            const val = Math.abs(parseNumericValue(tx.transactionValue));
            if (isIncomeTransaction(tx.transactionType)) {
                totalIncome += val;
                incomeCount++;
            } else {
                totalExpense += val;
                expenseCount++;
            }
        });

        const averageExpense = expenseCount > 0 ? totalExpense / expenseCount : 0;
        const balanceProjection = totalIncome - totalExpense;

        return {
            totalIncome,
            totalExpense,
            incomeCount,
            expenseCount,
            averageExpense,
            balanceProjection,
            totalCount: transactions.length
        };
    }, [transactions]);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return {
        transactions,
        filteredTransactions,
        paginatedTransactions,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        metrics,
        nextPage,
        prevPage,
        refetch: fetchTransactions
    };
};
