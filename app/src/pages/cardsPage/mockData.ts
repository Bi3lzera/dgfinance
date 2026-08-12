export type InvoiceStatus = 'Aberta' | 'Paga' | 'Fechada' | 'Vencida';

export interface CardInfo {
  id: string;
  name: string;
  bankName: string;
  invoiceAmount: number;
  status: InvoiceStatus;
  limitUsedPercent: number;
  limitUsedAmount: number;
  totalLimit: number;
  lastDigits: string;
  transactionsCount: number;
  lastUpdate: string;
  iconBgColor: string;
}

export const mockCards: CardInfo[] = [
  {
    id: '1',
    name: 'BTG Corporate',
    bankName: 'BTG PACTUAL',
    invoiceAmount: 1540.30,
    status: 'Aberta',
    limitUsedPercent: 30,
    limitUsedAmount: 4500,
    totalLimit: 15000,
    lastDigits: '9928',
    transactionsCount: 24,
    lastUpdate: '13/07/2026 13:15',
    iconBgColor: 'bg-orange-100',
  },
  {
    id: '2',
    name: 'Nubank Principal',
    bankName: 'NUBANK S.A.',
    invoiceAmount: 12450.60,
    status: 'Aberta',
    limitUsedPercent: 50,
    limitUsedAmount: 12450.60,
    totalLimit: 25000,
    lastDigits: '4592',
    transactionsCount: 56,
    lastUpdate: 'Hoje 09:12',
    iconBgColor: 'bg-purple-100',
  },
  {
    id: '3',
    name: 'Investimentos XP',
    bankName: 'XP INVESTIMENTOS',
    invoiceAmount: 85200.00,
    status: 'Paga',
    limitUsedPercent: 0,
    limitUsedAmount: 0,
    totalLimit: 150000,
    lastDigits: '8821',
    transactionsCount: 12,
    lastUpdate: 'Hoje 09:12',
    iconBgColor: 'bg-blue-100',
  },
  {
    id: '4',
    name: 'Viagem Platinum',
    bankName: 'BRADESCO',
    invoiceAmount: 2500.00,
    status: 'Fechada',
    limitUsedPercent: 21,
    limitUsedAmount: 2500,
    totalLimit: 12000,
    lastDigits: '0001',
    transactionsCount: 8,
    lastUpdate: 'Hoje 09:12',
    iconBgColor: 'bg-red-100',
  },
  {
    id: '5',
    name: 'Cofre Emergência',
    bankName: 'INTER',
    invoiceAmount: 0.00,
    status: 'Paga',
    limitUsedPercent: 0,
    limitUsedAmount: 0,
    totalLimit: 5000,
    lastDigits: '3341',
    transactionsCount: 0,
    lastUpdate: 'Hoje 09:12',
    iconBgColor: 'bg-orange-50',
  },
  {
    id: '6',
    name: 'Compras Online',
    bankName: 'ITAÚ UNIBANCO',
    invoiceAmount: 420.12,
    status: 'Vencida',
    limitUsedPercent: 21,
    limitUsedAmount: 420.12,
    totalLimit: 2000,
    lastDigits: '7762',
    transactionsCount: 3,
    lastUpdate: 'Hoje 09:12',
    iconBgColor: 'bg-teal-100',
  }
];
