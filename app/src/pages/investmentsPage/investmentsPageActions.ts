// ============================================================
// investmentsPageActions.ts
// Mock data + TypeScript types + API-ready fetchers
// When API is ready, replace the mock returns with real HTTP calls
// ============================================================

// ─── Enums ────────────────────────────────────────────────────────────────────

export type InvestmentCategory =
  | 'Renda Fixa'
  | 'Renda Variável'
  | 'Fundos'
  | 'Poupança'
  | 'Criptomoedas'
  | 'Previdência';

export type InvestmentStatus = 'Ativo' | 'Encerrado' | 'Suspenso';

export type MovementType = 'Aporte' | 'Retirada' | 'Rendimento';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface InvestmentMovement {
  id: string;
  date: string;           // ISO date string "YYYY-MM-DD"
  type: MovementType;
  amount: number;
  description?: string;
}

export interface MonthlyClosing {
  id: string;
  investmentId: string;
  year: number;
  month: number;          // 1–12
  openingBalance: number;
  closingBalance: number;
  deposits: number;
  withdrawals: number;
  earnings: number;
  earningsPercent: number;
  closedAt: string;       // ISO date
  note?: string;
}

export interface Investment {
  id: string;
  name: string;
  institution: string;
  category: InvestmentCategory;
  status: InvestmentStatus;
  initialAmount: number;      // valor inicial aplicado
  currentBalance: number;     // saldo atual
  totalDeposited: number;     // total de aportes (inclui inicial)
  totalWithdrawn: number;     // total de retiradas
  totalEarnings: number;      // rendimento acumulado
  earningsPercent: number;    // % de rendimento acumulado
  monthlyRate?: number;       // taxa mensal esperada (%)
  yearlyRate?: number;        // taxa anual esperada (%)
  startDate: string;          // ISO date
  maturityDate?: string;      // data de vencimento (opcional)
  movements: InvestmentMovement[];
  monthlyClosings: MonthlyClosing[];
  iconBgColor: string;
  accentColor: string;
}

export interface InvestmentSummary {
  totalBalance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  totalEarnings: number;
  earningsPercent: number;
  monthEarnings: number;
  monthEarningsPercent: number;
  prevMonthEarnings: number;
  byCategory: {
    category: InvestmentCategory;
    balance: number;
    percent: number;
    color: string;
  }[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'CDB Nubank 110% CDI',
    institution: 'Nubank',
    category: 'Renda Fixa',
    status: 'Ativo',
    initialAmount: 20000,
    currentBalance: 23450.80,
    totalDeposited: 20000,
    totalWithdrawn: 0,
    totalEarnings: 3450.80,
    earningsPercent: 17.25,
    monthlyRate: 0.92,
    yearlyRate: 11.04,
    startDate: '2024-01-15',
    maturityDate: '2026-01-15',
    iconBgColor: 'bg-purple-100',
    accentColor: '#8b5cf6',
    movements: [
      { id: 'm1', date: '2024-01-15', type: 'Aporte', amount: 20000, description: 'Aplicação inicial' },
      { id: 'm2', date: '2024-07-31', type: 'Rendimento', amount: 1120.40, description: 'Rendimento 1º semestre' },
      { id: 'm3', date: '2025-01-31', type: 'Rendimento', amount: 2330.40, description: 'Rendimento 2024 acumulado' },
    ],
    monthlyClosings: [
      { id: 'mc1', investmentId: '1', year: 2025, month: 5, openingBalance: 22100, closingBalance: 22304.5, deposits: 0, withdrawals: 0, earnings: 204.5, earningsPercent: 0.925, closedAt: '2025-05-31' },
      { id: 'mc2', investmentId: '1', year: 2025, month: 6, openingBalance: 22304.5, closingBalance: 22510.5, deposits: 0, withdrawals: 0, earnings: 206.0, earningsPercent: 0.924, closedAt: '2025-06-30' },
      { id: 'mc3', investmentId: '1', year: 2025, month: 7, openingBalance: 22510.5, closingBalance: 22718.3, deposits: 0, withdrawals: 0, earnings: 207.8, earningsPercent: 0.923, closedAt: '2025-07-31' },
    ],
  },
  {
    id: '2',
    name: 'Tesouro Selic 2027',
    institution: 'Tesouro Nacional',
    category: 'Renda Fixa',
    status: 'Ativo',
    initialAmount: 15000,
    currentBalance: 17820.40,
    totalDeposited: 15000,
    totalWithdrawn: 0,
    totalEarnings: 2820.40,
    earningsPercent: 18.80,
    monthlyRate: 0.88,
    yearlyRate: 10.56,
    startDate: '2023-08-10',
    maturityDate: '2027-03-01',
    iconBgColor: 'bg-green-100',
    accentColor: '#10b981',
    movements: [
      { id: 'm4', date: '2023-08-10', type: 'Aporte', amount: 15000, description: 'Aplicação inicial' },
      { id: 'm5', date: '2024-08-10', type: 'Rendimento', amount: 1580.20, description: 'Rendimento anual 2024' },
    ],
    monthlyClosings: [
      { id: 'mc4', investmentId: '2', year: 2025, month: 5, openingBalance: 17350, closingBalance: 17502.8, deposits: 0, withdrawals: 0, earnings: 152.8, earningsPercent: 0.88, closedAt: '2025-05-31' },
      { id: 'mc5', investmentId: '2', year: 2025, month: 6, openingBalance: 17502.8, closingBalance: 17657.0, deposits: 0, withdrawals: 0, earnings: 154.2, earningsPercent: 0.88, closedAt: '2025-06-30' },
    ],
  },
  {
    id: '3',
    name: 'IVVB11 — S&P 500',
    institution: 'XP Investimentos',
    category: 'Renda Variável',
    status: 'Ativo',
    initialAmount: 30000,
    currentBalance: 41200.00,
    totalDeposited: 38000,
    totalWithdrawn: 5000,
    totalEarnings: 8200.00,
    earningsPercent: 21.58,
    startDate: '2023-03-01',
    iconBgColor: 'bg-blue-100',
    accentColor: '#3b82f6',
    movements: [
      { id: 'm6', date: '2023-03-01', type: 'Aporte', amount: 30000, description: 'Aplicação inicial' },
      { id: 'm7', date: '2024-01-10', type: 'Aporte', amount: 8000, description: 'Aporte adicional' },
      { id: 'm8', date: '2024-06-15', type: 'Retirada', amount: 5000, description: 'Resgate parcial' },
    ],
    monthlyClosings: [
      { id: 'mc6', investmentId: '3', year: 2025, month: 5, openingBalance: 39800, closingBalance: 40250, deposits: 0, withdrawals: 0, earnings: 450, earningsPercent: 1.13, closedAt: '2025-05-31' },
      { id: 'mc7', investmentId: '3', year: 2025, month: 6, openingBalance: 40250, closingBalance: 41200, deposits: 0, withdrawals: 0, earnings: 950, earningsPercent: 2.36, closedAt: '2025-06-30' },
    ],
  },
  {
    id: '4',
    name: 'Fundo Multimercado Verde',
    institution: 'BTG Pactual',
    category: 'Fundos',
    status: 'Ativo',
    initialAmount: 10000,
    currentBalance: 11340.50,
    totalDeposited: 10000,
    totalWithdrawn: 0,
    totalEarnings: 1340.50,
    earningsPercent: 13.41,
    monthlyRate: 0.75,
    yearlyRate: 9.0,
    startDate: '2024-03-20',
    iconBgColor: 'bg-amber-100',
    accentColor: '#f59e0b',
    movements: [
      { id: 'm9', date: '2024-03-20', type: 'Aporte', amount: 10000, description: 'Aplicação inicial' },
    ],
    monthlyClosings: [
      { id: 'mc8', investmentId: '4', year: 2025, month: 6, openingBalance: 11180, closingBalance: 11340.50, deposits: 0, withdrawals: 0, earnings: 160.50, earningsPercent: 1.44, closedAt: '2025-06-30' },
    ],
  },
  {
    id: '5',
    name: 'Poupança Emergência',
    institution: 'Banco do Brasil',
    category: 'Poupança',
    status: 'Ativo',
    initialAmount: 5000,
    currentBalance: 5620.30,
    totalDeposited: 6200,
    totalWithdrawn: 800,
    totalEarnings: 220.30,
    earningsPercent: 3.55,
    monthlyRate: 0.5,
    yearlyRate: 6.17,
    startDate: '2023-01-01',
    iconBgColor: 'bg-teal-100',
    accentColor: '#14b8a6',
    movements: [
      { id: 'm10', date: '2023-01-01', type: 'Aporte', amount: 5000, description: 'Abertura da poupança' },
      { id: 'm11', date: '2023-06-01', type: 'Aporte', amount: 1200, description: 'Depósito extra' },
      { id: 'm12', date: '2024-02-10', type: 'Retirada', amount: 800, description: 'Emergência' },
    ],
    monthlyClosings: [
      { id: 'mc9', investmentId: '5', year: 2025, month: 6, openingBalance: 5590, closingBalance: 5620.30, deposits: 0, withdrawals: 0, earnings: 30.30, earningsPercent: 0.54, closedAt: '2025-06-30' },
    ],
  },
  {
    id: '6',
    name: 'Bitcoin (BTC)',
    institution: 'Binance',
    category: 'Criptomoedas',
    status: 'Ativo',
    initialAmount: 5000,
    currentBalance: 8750.00,
    totalDeposited: 5000,
    totalWithdrawn: 0,
    totalEarnings: 3750.00,
    earningsPercent: 75.00,
    startDate: '2023-11-01',
    iconBgColor: 'bg-orange-100',
    accentColor: '#f97316',
    movements: [
      { id: 'm13', date: '2023-11-01', type: 'Aporte', amount: 5000, description: 'Compra BTC' },
    ],
    monthlyClosings: [
      { id: 'mc10', investmentId: '6', year: 2025, month: 5, openingBalance: 7800, closingBalance: 8200, deposits: 0, withdrawals: 0, earnings: 400, earningsPercent: 5.13, closedAt: '2025-05-31' },
      { id: 'mc11', investmentId: '6', year: 2025, month: 6, openingBalance: 8200, closingBalance: 8750, deposits: 0, withdrawals: 0, earnings: 550, earningsPercent: 6.71, closedAt: '2025-06-30' },
    ],
  },
  {
    id: '7',
    name: 'PGBL XP Vida',
    institution: 'XP Investimentos',
    category: 'Previdência',
    status: 'Ativo',
    initialAmount: 8000,
    currentBalance: 9180.60,
    totalDeposited: 9600,
    totalWithdrawn: 0,
    totalEarnings: -419.40,
    earningsPercent: -4.37,
    monthlyRate: 0.6,
    yearlyRate: 7.44,
    startDate: '2022-04-01',
    iconBgColor: 'bg-indigo-100',
    accentColor: '#6366f1',
    movements: [
      { id: 'm14', date: '2022-04-01', type: 'Aporte', amount: 8000, description: 'Contribuição inicial' },
      { id: 'm15', date: '2023-04-01', type: 'Aporte', amount: 1600, description: 'Contribuição anual 2023' },
    ],
    monthlyClosings: [
      { id: 'mc12', investmentId: '7', year: 2025, month: 6, openingBalance: 9125, closingBalance: 9180.60, deposits: 0, withdrawals: 0, earnings: 55.60, earningsPercent: 0.61, closedAt: '2025-06-30' },
    ],
  },
  {
    id: '8',
    name: 'LCI Bradesco',
    institution: 'Bradesco',
    category: 'Renda Fixa',
    status: 'Encerrado',
    initialAmount: 12000,
    currentBalance: 13560.00,
    totalDeposited: 12000,
    totalWithdrawn: 13560,
    totalEarnings: 1560.00,
    earningsPercent: 13.00,
    monthlyRate: 0.72,
    yearlyRate: 8.97,
    startDate: '2023-06-01',
    maturityDate: '2025-06-01',
    iconBgColor: 'bg-red-100',
    accentColor: '#ef4444',
    movements: [
      { id: 'm16', date: '2023-06-01', type: 'Aporte', amount: 12000, description: 'Aplicação LCI' },
      { id: 'm17', date: '2025-06-01', type: 'Rendimento', amount: 1560, description: 'Rendimento total' },
      { id: 'm18', date: '2025-06-01', type: 'Retirada', amount: 13560, description: 'Resgate no vencimento' },
    ],
    monthlyClosings: [
      { id: 'mc13', investmentId: '8', year: 2025, month: 5, openingBalance: 13350, closingBalance: 13560, deposits: 0, withdrawals: 13560, earnings: 210, earningsPercent: 1.57, closedAt: '2025-05-31' },
    ],
  },
];

// ─── Computed Summary ─────────────────────────────────────────────────────────

const computeSummary = (investments: Investment[]): InvestmentSummary => {
  const active = investments.filter(i => i.status !== 'Encerrado');
  const totalBalance = active.reduce((s, i) => s + i.currentBalance, 0);
  const totalDeposited = investments.reduce((s, i) => s + i.totalDeposited, 0);
  const totalWithdrawn = investments.reduce((s, i) => s + i.totalWithdrawn, 0);
  const totalEarnings = investments.reduce((s, i) => s + i.totalEarnings, 0);
  const earningsPercent = totalDeposited > 0 ? (totalEarnings / totalDeposited) * 100 : 0;

  // Simulate current month earnings (last closing of each investment)
  const monthEarnings = active.reduce((s, i) => {
    const last = i.monthlyClosings[i.monthlyClosings.length - 1];
    return s + (last ? last.earnings : 0);
  }, 0);
  const monthEarningsPercent = totalBalance > 0 ? (monthEarnings / (totalBalance - monthEarnings)) * 100 : 0;

  const prevMonthEarnings = monthEarnings * 0.94; // simulated

  const categoryColors: Record<InvestmentCategory, string> = {
    'Renda Fixa': '#10b981',
    'Renda Variável': '#3b82f6',
    'Fundos': '#f59e0b',
    'Poupança': '#14b8a6',
    'Criptomoedas': '#f97316',
    'Previdência': '#6366f1',
  };

  const categoryMap = new Map<InvestmentCategory, number>();
  active.forEach(i => {
    categoryMap.set(i.category, (categoryMap.get(i.category) ?? 0) + i.currentBalance);
  });

  const byCategory = Array.from(categoryMap.entries()).map(([category, balance]) => ({
    category,
    balance,
    percent: totalBalance > 0 ? (balance / totalBalance) * 100 : 0,
    color: categoryColors[category],
  }));

  return {
    totalBalance,
    totalDeposited,
    totalWithdrawn,
    totalEarnings,
    earningsPercent,
    monthEarnings,
    monthEarningsPercent,
    prevMonthEarnings,
    byCategory,
  };
};

// ─── API-Ready Fetchers ───────────────────────────────────────────────────────
// Replace the resolved mock data with an axios/fetch call when the API is ready.

export const fetchInvestments = async (): Promise<Investment[]> => {
  // TODO: replace with → return apiClient.get('/investments').then(r => r.data);
  return Promise.resolve([...mockInvestments]);
};

export const fetchInvestmentById = async (id: string): Promise<Investment | undefined> => {
  // TODO: replace with → return apiClient.get(`/investments/${id}`).then(r => r.data);
  return Promise.resolve(mockInvestments.find(i => i.id === id));
};

export const fetchSummary = async (): Promise<InvestmentSummary> => {
  // TODO: replace with → return apiClient.get('/investments/summary').then(r => r.data);
  return Promise.resolve(computeSummary(mockInvestments));
};

export const fetchMonthlyClosings = async (investmentId: string): Promise<MonthlyClosing[]> => {
  // TODO: replace with → return apiClient.get(`/investments/${investmentId}/closings`).then(r => r.data);
  const inv = mockInvestments.find(i => i.id === investmentId);
  return Promise.resolve(inv ? [...inv.monthlyClosings] : []);
};

export const saveMonthlyClosing = async (
  closing: Omit<MonthlyClosing, 'id' | 'closedAt'>
): Promise<MonthlyClosing> => {
  // TODO: replace with → return apiClient.post(`/investments/${closing.investmentId}/closings`, closing).then(r => r.data);
  const newClosing: MonthlyClosing = {
    ...closing,
    id: `mc-${Date.now()}`,
    closedAt: new Date().toISOString(),
  };
  return Promise.resolve(newClosing);
};

export const saveInvestment = async (
  data: Partial<Investment> & { id?: string }
): Promise<Investment> => {
  // TODO: replace with → return apiClient.post('/investments', data) or apiClient.put(`/investments/${data.id}`, data);
  if (data.id) {
    const existing = mockInvestments.find(i => i.id === data.id);
    return Promise.resolve({ ...existing!, ...data } as Investment);
  }
  const newInvestment: Investment = {
    id: `inv-${Date.now()}`,
    name: data.name ?? 'Novo Investimento',
    institution: data.institution ?? '',
    category: data.category ?? 'Renda Fixa',
    status: data.status ?? 'Ativo',
    initialAmount: data.initialAmount ?? 0,
    currentBalance: data.currentBalance ?? data.initialAmount ?? 0,
    totalDeposited: data.totalDeposited ?? data.initialAmount ?? 0,
    totalWithdrawn: 0,
    totalEarnings: 0,
    earningsPercent: 0,
    startDate: data.startDate ?? new Date().toISOString().split('T')[0],
    movements: [],
    monthlyClosings: [],
    iconBgColor: data.iconBgColor ?? 'bg-blue-100',
    accentColor: data.accentColor ?? '#3b82f6',
    ...data,
  };
  return Promise.resolve(newInvestment);
};

export const deleteInvestment = async (id: string): Promise<void> => {
  // TODO: replace with → return apiClient.delete(`/investments/${id}`);
  return Promise.resolve();
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const formatPercent = (value: number, decimals = 2): string =>
  `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export const CATEGORY_ICONS: Record<InvestmentCategory, string> = {
  'Renda Fixa': '🏦',
  'Renda Variável': '📈',
  'Fundos': '🏛️',
  'Poupança': '🐷',
  'Criptomoedas': '₿',
  'Previdência': '🔒',
};

export const ALL_CATEGORIES: InvestmentCategory[] = [
  'Renda Fixa',
  'Renda Variável',
  'Fundos',
  'Poupança',
  'Criptomoedas',
  'Previdência',
];
