// ─────────────────────────────────────────────────────────────────────────────
// detailCardActions.ts
// Mock data + type definitions for the DetailCardPage.
// This file is ready to receive real service functions once the API is built.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardNetwork = 'Visa' | 'Mastercard' | 'Elo' | 'Amex' | 'Hipercard';
export type CardTier = 'Standard' | 'Gold' | 'Platinum' | 'Black' | 'Infinite' | 'Signature';
export type CardStatus = 'Ativo' | 'Bloqueado' | 'Cancelado' | 'Suspenso';
export type InvoiceStatus = 'Aberta' | 'Fechada' | 'Paga' | 'Vencida' | 'Futura';
export type TransactionType = 'compra' | 'estorno' | 'pagamento' | 'parcelamento' | 'juros' | 'anuidade';

export interface CardDetail {
    id: string;
    name: string;
    bankName: string;
    lastDigits: string;
    network: CardNetwork;
    tier: CardTier;
    status: CardStatus;
    // Limits
    totalLimit: number;
    availableLimit: number;
    usedLimit: number;
    // Current invoice
    currentInvoiceAmount: number;
    currentInvoiceDueDate: string;
    currentInvoiceCloseDate: string;
    // Additional info
    holderName: string;
    expiryDate: string;
    bestPurchaseDay: number; // dia do mês com maior prazo
    statementClosingDay: number;
    statementDueDay: number;
    // Stats
    transactionsThisMonth: number;
    installmentsTotal: number;
    installmentsPending: number;
    iconBgColor: string;
    logoUrl?: string;
}

export interface InvoiceTransaction {
    id: string;
    date: string;
    description: string;
    category: string;
    categoryColor: string;
    type: TransactionType;
    amount: number;
    installment?: string; // e.g. "2/12"
    establishment?: string;
    status: 'efetivado' | 'pendente' | 'estornado';
    isPositive: boolean; // true = crédito (estorno, pagamento)
}

export interface Invoice {
    id: string;
    reference: string; // e.g. "Julho 2026"
    closeDate: string;
    dueDate: string;
    status: InvoiceStatus;
    totalAmount: number;
    paidAmount?: number;
    paymentDate?: string;
    transactionCount: number;
    transactions: InvoiceTransaction[];
}

export interface SpendingCategory {
    name: string;
    amount: number;
    percentage: number;
    color: string;
}

// ─── Mock Card Detail ─────────────────────────────────────────────────────────

export const mockCardDetail: CardDetail = {
    id: '2',
    name: 'Nubank Principal',
    bankName: 'NUBANK S.A.',
    lastDigits: '4592',
    network: 'Mastercard',
    tier: 'Platinum',
    status: 'Ativo',
    totalLimit: 25000,
    availableLimit: 12549.40,
    usedLimit: 12450.60,
    currentInvoiceAmount: 12450.60,
    currentInvoiceDueDate: '10/08/2026',
    currentInvoiceCloseDate: '01/08/2026',
    holderName: 'GABRIEL BIEL FERREIRA',
    expiryDate: '05/2029',
    bestPurchaseDay: 2,
    statementClosingDay: 1,
    statementDueDay: 10,
    transactionsThisMonth: 24,
    installmentsTotal: 8,
    installmentsPending: 6,
    iconBgColor: 'bg-purple-100',
};

// ─── Mock Invoices ────────────────────────────────────────────────────────────

export const mockInvoices: Invoice[] = [
    {
        id: 'inv-future-2',
        reference: 'Setembro 2026',
        closeDate: '01/09/2026',
        dueDate: '10/09/2026',
        status: 'Futura',
        totalAmount: 0,
        transactionCount: 0,
        transactions: [],
    },
    {
        id: 'inv-future-1',
        reference: 'Agosto 2026',
        closeDate: '01/08/2026',
        dueDate: '10/08/2026',
        status: 'Aberta',
        totalAmount: 12450.60,
        transactionCount: 24,
        transactions: [
            {
                id: 't1',
                date: '25/07/2026',
                description: 'Supermercado Pão de Açúcar',
                category: 'Alimentação',
                categoryColor: 'bg-green-100 text-green-700',
                type: 'compra',
                amount: 450.25,
                establishment: 'PÃO DE AÇÚCAR SP',
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 't2',
                date: '24/07/2026',
                description: 'Posto Shell - Combustível',
                category: 'Transporte',
                categoryColor: 'bg-blue-100 text-blue-700',
                type: 'compra',
                amount: 280.00,
                establishment: 'SHELL POSTO 442 SP',
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 't3',
                date: '22/07/2026',
                description: 'Assinatura Netflix',
                category: 'Entretenimento',
                categoryColor: 'bg-red-100 text-red-700',
                type: 'compra',
                amount: 55.90,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 't4',
                date: '21/07/2026',
                description: 'Amazon Prime Video',
                category: 'Entretenimento',
                categoryColor: 'bg-red-100 text-red-700',
                type: 'compra',
                amount: 19.90,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 't5',
                date: '20/07/2026',
                description: 'iPhone 16 Pro - 6/12',
                category: 'Eletrônicos',
                categoryColor: 'bg-purple-100 text-purple-700',
                type: 'parcelamento',
                amount: 583.33,
                installment: '6/12',
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 't6',
                date: '19/07/2026',
                description: 'Restaurante Outback',
                category: 'Alimentação',
                categoryColor: 'bg-green-100 text-green-700',
                type: 'compra',
                amount: 189.50,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 't7',
                date: '18/07/2026',
                description: 'Estorno - Loja X',
                category: 'Estorno',
                categoryColor: 'bg-teal-100 text-teal-700',
                type: 'estorno',
                amount: 120.00,
                status: 'efetivado',
                isPositive: true,
            },
            {
                id: 't8',
                date: '15/07/2026',
                description: 'Farmácia Raia',
                category: 'Saúde',
                categoryColor: 'bg-orange-100 text-orange-700',
                type: 'compra',
                amount: 87.40,
                status: 'pendente',
                isPositive: false,
            },
        ],
    },
    {
        id: 'inv-jul-2026',
        reference: 'Julho 2026',
        closeDate: '01/07/2026',
        dueDate: '10/07/2026',
        status: 'Paga',
        totalAmount: 9850.30,
        paidAmount: 9850.30,
        paymentDate: '08/07/2026',
        transactionCount: 18,
        transactions: [
            {
                id: 'tj1',
                date: '28/06/2026',
                description: 'Pagamento de Fatura',
                category: 'Pagamento',
                categoryColor: 'bg-blue-100 text-blue-700',
                type: 'pagamento',
                amount: 9850.30,
                status: 'efetivado',
                isPositive: true,
            },
            {
                id: 'tj2',
                date: '25/06/2026',
                description: 'Mercado Livre - Tênis Adidas 3/6',
                category: 'Vestuário',
                categoryColor: 'bg-indigo-100 text-indigo-700',
                type: 'parcelamento',
                amount: 166.67,
                installment: '3/6',
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 'tj3',
                date: '22/06/2026',
                description: 'Conta de Luz - Enel',
                category: 'Contas Fixas',
                categoryColor: 'bg-yellow-100 text-yellow-700',
                type: 'compra',
                amount: 195.40,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 'tj4',
                date: '20/06/2026',
                description: 'Starbucks Coffee',
                category: 'Lazer',
                categoryColor: 'bg-amber-100 text-amber-700',
                type: 'compra',
                amount: 24.90,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 'tj5',
                date: '18/06/2026',
                description: 'Anuidade Mastercard Platinum',
                category: 'Anuidade',
                categoryColor: 'bg-gray-100 text-gray-700',
                type: 'anuidade',
                amount: 650.00,
                status: 'efetivado',
                isPositive: false,
            },
        ],
    },
    {
        id: 'inv-jun-2026',
        reference: 'Junho 2026',
        closeDate: '01/06/2026',
        dueDate: '10/06/2026',
        status: 'Paga',
        totalAmount: 7200.00,
        paidAmount: 7200.00,
        paymentDate: '09/06/2026',
        transactionCount: 14,
        transactions: [
            {
                id: 'tj6',
                date: '28/05/2026',
                description: 'Pagamento de Fatura',
                category: 'Pagamento',
                categoryColor: 'bg-blue-100 text-blue-700',
                type: 'pagamento',
                amount: 7200.00,
                status: 'efetivado',
                isPositive: true,
            },
            {
                id: 'tj7',
                date: '24/05/2026',
                description: 'Viagem para São Paulo - Aérea',
                category: 'Viagem',
                categoryColor: 'bg-sky-100 text-sky-700',
                type: 'compra',
                amount: 1850.00,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 'tj8',
                date: '22/05/2026',
                description: 'Hotel Ibis - 3 noites',
                category: 'Viagem',
                categoryColor: 'bg-sky-100 text-sky-700',
                type: 'compra',
                amount: 750.00,
                status: 'efetivado',
                isPositive: false,
            },
        ],
    },
    {
        id: 'inv-mai-2026',
        reference: 'Maio 2026',
        closeDate: '01/05/2026',
        dueDate: '10/05/2026',
        status: 'Vencida',
        totalAmount: 3400.50,
        transactionCount: 9,
        transactions: [
            {
                id: 'tj9',
                date: '25/04/2026',
                description: 'Supermercado Extra',
                category: 'Alimentação',
                categoryColor: 'bg-green-100 text-green-700',
                type: 'compra',
                amount: 380.00,
                status: 'efetivado',
                isPositive: false,
            },
            {
                id: 'tj10',
                date: '20/04/2026',
                description: 'Juros de atraso',
                category: 'Juros',
                categoryColor: 'bg-red-100 text-red-700',
                type: 'juros',
                amount: 204.03,
                status: 'efetivado',
                isPositive: false,
            },
        ],
    },
];

// ─── Mock Spending Categories ─────────────────────────────────────────────────

export const mockSpendingCategories: SpendingCategory[] = [
    { name: 'Alimentação', amount: 1250.50, percentage: 34, color: '#22c55e' },
    { name: 'Eletrônicos', amount: 583.33, percentage: 16, color: '#a855f7' },
    { name: 'Transporte', amount: 520.00, percentage: 14, color: '#3b82f6' },
    { name: 'Entretenimento', amount: 420.00, percentage: 11, color: '#ef4444' },
    { name: 'Saúde', amount: 320.40, percentage: 9, color: '#f97316' },
    { name: 'Outros', amount: 586.37, percentage: 16, color: '#9ca3af' },
];

// ─── Service Stubs (ready for API integration) ────────────────────────────────
// These functions will be implemented once the backend API is ready.

/**
 * Fetches the detailed information for a specific card.
 * @param cardId - The ID of the card to fetch.
 */
export const fetchCardDetail = async (_cardId: string): Promise<CardDetail> => {
    // TODO: Replace with actual API call
    // return api.get(`/cards/${cardId}`);
    return Promise.resolve(mockCardDetail);
};

/**
 * Fetches all invoices for a specific card.
 * @param cardId - The ID of the card.
 */
export const fetchCardInvoices = async (_cardId: string): Promise<Invoice[]> => {
    // TODO: Replace with actual API call
    // return api.get(`/cards/${cardId}/invoices`);
    return Promise.resolve(mockInvoices);
};

/**
 * Fetches transactions for a specific invoice.
 * @param invoiceId - The ID of the invoice.
 */
export const fetchInvoiceTransactions = async (_invoiceId: string): Promise<InvoiceTransaction[]> => {
    // TODO: Replace with actual API call
    // return api.get(`/invoices/${invoiceId}/transactions`);
    const invoice = mockInvoices.find(inv => inv.id === _invoiceId);
    return Promise.resolve(invoice?.transactions ?? []);
};

/**
 * Fetches spending categories for the current month.
 * @param cardId - The ID of the card.
 */
export const fetchSpendingCategories = async (_cardId: string): Promise<SpendingCategory[]> => {
    // TODO: Replace with actual API call
    // return api.get(`/cards/${cardId}/spending-categories`);
    return Promise.resolve(mockSpendingCategories);
};

/**
 * Blocks or unblocks a card.
 * @param cardId - The ID of the card.
 * @param blocked - True to block, false to unblock.
 */
export const toggleCardBlock = async (_cardId: string, _blocked: boolean): Promise<void> => {
    // TODO: Replace with actual API call
    // return api.patch(`/cards/${cardId}`, { blocked });
    return Promise.resolve();
};

/**
 * Updates card settings (alias, notifications, etc.).
 * @param cardId - The ID of the card.
 * @param data - Partial card settings to update.
 */
export const updateCardSettings = async (_cardId: string, _data: Partial<CardDetail>): Promise<void> => {
    // TODO: Replace with actual API call
    // return api.put(`/cards/${cardId}/settings`, data);
    return Promise.resolve();
};

/**
 * Requests a virtual card number for online purchases.
 * @param cardId - The ID of the card.
 */
export const generateVirtualCard = async (_cardId: string): Promise<string> => {
    // TODO: Replace with actual API call
    // return api.post(`/cards/${cardId}/virtual`);
    return Promise.resolve('5275 **** **** 9999');
};

/**
 * Requests payment of an invoice.
 * @param invoiceId - The ID of the invoice to pay.
 * @param amount - The amount to pay.
 */
export const payInvoice = async (_invoiceId: string, _amount: number): Promise<void> => {
    // TODO: Replace with actual API call
    // return api.post(`/invoices/${invoiceId}/pay`, { amount });
    return Promise.resolve();
};
