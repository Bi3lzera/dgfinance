import { useState } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart2,
  Calendar,
  Building2,
  Tag,
  Activity,
  Edit3,
  Check,
} from 'lucide-react';
import {
  Investment,
  MonthlyClosing,
  formatCurrency,
  formatPercent,
  MONTH_NAMES,
  CATEGORY_ICONS,
} from '../investmentsPageActions';

interface InvestmentDetailModalProps {
  investment: Investment | null;
  isOpen: boolean;
  onClose: () => void;
  onMonthlyClosingSaved?: () => void;
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type TabId = 'overview' | 'movements' | 'closings' | 'rentability';

// ─── Small helpers ────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
    <span className="text-xs font-semibold text-gray-500">{label}</span>
    <span className={`text-xs font-bold ${highlight ? 'text-emerald-600' : 'text-gray-800'}`}>{value}</span>
  </div>
);

const MovementTypeIcon = ({ type }: { type: string }) => {
  if (type === 'Aporte') return <ArrowDownCircle className="w-4 h-4 text-blue-500" />;
  if (type === 'Retirada') return <ArrowUpCircle className="w-4 h-4 text-orange-500" />;
  return <TrendingUp className="w-4 h-4 text-emerald-500" />;
};

const MovementTypeBadge = ({ type }: { type: string }) => {
  const styles: Record<string, string> = {
    Aporte: 'bg-blue-50 text-blue-700 border-blue-100',
    Retirada: 'bg-orange-50 text-orange-700 border-orange-100',
    Rendimento: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };
  return (
    <span className={`px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider rounded-full border ${styles[type] ?? ''}`}>
      {type}
    </span>
  );
};

// ─── Rentability Calculator ───────────────────────────────────────────────────
const RentabilityCalculator = ({ investment }: { investment: Investment }) => {
  const closings = [...investment.monthlyClosings].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  );

  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(Math.max(0, closings.length - 1));

  if (closings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <BarChart2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <p className="text-xs font-semibold">Sem fechamentos para calcular rentabilidade.</p>
      </div>
    );
  }

  const start = closings[startIdx];
  const end = closings[endIdx];

  const balanceChange = end.closingBalance - start.openingBalance;
  const rentPercent = start.openingBalance > 0 ? (balanceChange / start.openingBalance) * 100 : 0;

  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  const monthlyAvg = months > 0 ? rentPercent / months : 0;

  return (
    <div className="space-y-5">
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Período de Análise</h4>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[0.65rem] font-bold text-gray-400 uppercase block mb-1">De</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={startIdx}
              onChange={(e) => setStartIdx(Number(e.target.value))}
            >
              {closings.map((c, i) => (
                <option key={c.id} value={i}>{MONTH_NAMES[c.month - 1]}/{c.year}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-[0.65rem] font-bold text-gray-400 uppercase block mb-1">Até</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={endIdx}
              onChange={(e) => setEndIdx(Number(e.target.value))}
            >
              {closings.map((c, i) => (
                <option key={c.id} value={i}>{MONTH_NAMES[c.month - 1]}/{c.year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Saldo Inicial', value: formatCurrency(start.openingBalance), neutral: true },
          { label: 'Saldo Final', value: formatCurrency(end.closingBalance), neutral: true },
          { label: 'Variação (R$)', value: formatCurrency(balanceChange), positive: balanceChange >= 0 },
          { label: 'Rentabilidade', value: formatPercent(rentPercent), positive: rentPercent >= 0 },
          { label: 'Período (meses)', value: `${months} meses`, neutral: true },
          { label: 'Média Mensal', value: formatPercent(monthlyAvg), positive: monthlyAvg >= 0 },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col gap-1"
          >
            <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
            <p
              className={`text-lg font-black leading-tight ${
                item.neutral
                  ? 'text-gray-900'
                  : item.positive
                  ? 'text-emerald-600'
                  : 'text-red-500'
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Mini evolution chart */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Evolução Mensal</h4>
        <div className="flex items-end gap-1 h-16">
          {closings.map((c, i) => {
            const maxBalance = Math.max(...closings.map(x => x.closingBalance));
            const heightPct = maxBalance > 0 ? (c.closingBalance / maxBalance) * 100 : 0;
            const isInRange = i >= startIdx && i <= endIdx;
            return (
              <div key={c.id} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm transition-all duration-500"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: isInRange ? investment.accentColor : '#e2e8f0',
                    minHeight: 4,
                  }}
                  title={`${MONTH_NAMES[c.month - 1]}/${c.year}: ${formatCurrency(c.closingBalance)}`}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[0.55rem] text-gray-400 font-semibold">
            {MONTH_NAMES[closings[0].month - 1]}/{closings[0].year}
          </span>
          <span className="text-[0.55rem] text-gray-400 font-semibold">
            {MONTH_NAMES[closings[closings.length - 1].month - 1]}/{closings[closings.length - 1].year}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Main Modal ────────────────────────────────────────────────────────────────
const InvestmentDetailModal = ({
  investment,
  isOpen,
  onClose,
  onMonthlyClosingSaved,
}: InvestmentDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  if (!isOpen || !investment) return null;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'movements', label: 'Movimentações' },
    { id: 'closings', label: 'Fechamentos' },
    { id: 'rentability', label: 'Rentabilidade' },
  ];

  const positive = investment.earningsPercent >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-scale-in">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-100 shrink-0">
          <div
            className={`w-12 h-12 rounded-xl ${investment.iconBgColor} flex items-center justify-center text-xl shrink-0`}
          >
            {CATEGORY_ICONS[investment.category]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-gray-900 leading-tight truncate">{investment.name}</h2>
            <p className="text-xs text-gray-400 font-semibold">{investment.institution} · {investment.category}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance highlight */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 shrink-0">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saldo Atual</p>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(investment.currentBalance)}</p>
            </div>
            <div className="text-right">
              <div className={`flex items-center gap-1 justify-end ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
                {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-base font-black">{formatPercent(investment.earningsPercent)}</span>
              </div>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">
                {formatCurrency(investment.totalEarnings)} rendimento total
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 shrink-0 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-1 py-3 mr-5 text-xs font-bold transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <InfoRow label="Total Aplicado" value={formatCurrency(investment.totalDeposited)} />
                <InfoRow label="Total Retirado" value={formatCurrency(investment.totalWithdrawn)} />
                <InfoRow
                  label="Rendimento Acumulado"
                  value={`${formatCurrency(investment.totalEarnings)} (${formatPercent(investment.earningsPercent)})`}
                  highlight={positive}
                />
                {investment.monthlyRate && (
                  <InfoRow label="Taxa Mensal Esperada" value={`${investment.monthlyRate}% a.m.`} />
                )}
                {investment.yearlyRate && (
                  <InfoRow label="Taxa Anual Esperada" value={`${investment.yearlyRate}% a.a.`} />
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <InfoRow
                  label="Data de Início"
                  value={new Date(investment.startDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                />
                {investment.maturityDate && (
                  <InfoRow
                    label="Vencimento"
                    value={new Date(investment.maturityDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                  />
                )}
                <InfoRow label="Status" value={investment.status} />
                <InfoRow label="Categoria" value={investment.category} />
              </div>

              {/* Progress bar */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progressão de Rendimento</p>
                  <span className={`text-xs font-bold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {formatPercent(investment.earningsPercent)}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(Math.abs(investment.earningsPercent), 100)}%`,
                      backgroundColor: investment.accentColor,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Movements ── */}
          {activeTab === 'movements' && (
            <div className="space-y-2">
              {investment.movements.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8">Nenhuma movimentação.</p>
              ) : (
                [...investment.movements]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((m) => (
                    <div key={m.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <MovementTypeIcon type={m.type} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <MovementTypeBadge type={m.type} />
                          {m.description && (
                            <span className="text-[0.65rem] text-gray-400 font-semibold truncate">{m.description}</span>
                          )}
                        </div>
                        <p className="text-[0.65rem] text-gray-400 font-semibold">
                          {new Date(m.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <p className={`text-sm font-black shrink-0 ${
                        m.type === 'Retirada' ? 'text-orange-600' : m.type === 'Rendimento' ? 'text-emerald-600' : 'text-blue-700'
                      }`}>
                        {m.type === 'Retirada' ? '-' : '+'}{formatCurrency(m.amount)}
                      </p>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* ── Monthly Closings ── */}
          {activeTab === 'closings' && (
            <div className="space-y-2">
              {investment.monthlyClosings.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8">Nenhum fechamento mensal.</p>
              ) : (
                [...investment.monthlyClosings]
                  .sort((a, b) => b.year !== a.year ? b.year - a.year : b.month - a.month)
                  .map((c) => (
                    <div key={c.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-gray-800">
                          {MONTH_NAMES[c.month - 1]} {c.year}
                        </p>
                        <span className={`text-xs font-black ${c.earnings >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {formatPercent(c.earningsPercent)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <InfoRow label="Saldo Inicial" value={formatCurrency(c.openingBalance)} />
                        <InfoRow label="Saldo Final" value={formatCurrency(c.closingBalance)} />
                        {c.deposits > 0 && <InfoRow label="Aportes" value={formatCurrency(c.deposits)} />}
                        {c.withdrawals > 0 && <InfoRow label="Retiradas" value={formatCurrency(c.withdrawals)} />}
                        <InfoRow label="Rendimento" value={formatCurrency(c.earnings)} highlight={c.earnings >= 0} />
                      </div>
                      {c.note && (
                        <p className="text-[0.65rem] text-gray-400 font-semibold mt-2 pt-2 border-t border-gray-100">
                          📝 {c.note}
                        </p>
                      )}
                    </div>
                  ))
              )}
            </div>
          )}

          {/* ── Rentability ── */}
          {activeTab === 'rentability' && (
            <RentabilityCalculator investment={investment} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetailModal;
