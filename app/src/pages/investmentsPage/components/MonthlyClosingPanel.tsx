import { useState } from 'react';
import { CalendarCheck, TrendingUp, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Investment,
  MonthlyClosing,
  saveMonthlyClosing,
  formatCurrency,
  formatPercent,
  MONTH_NAMES,
} from '../investmentsPageActions';

interface MonthlyClosingPanelProps {
  investments: Investment[];
  onClosingSaved: () => void;
}

interface CloseMonthFormProps {
  investments: Investment[];
  onSave: (closing: MonthlyClosing) => void;
  onCancel: () => void;
}

const CloseMonthForm = ({ investments, onSave, onCancel }: CloseMonthFormProps) => {
  const now = new Date();
  const [selectedInvestmentId, setSelectedInvestmentId] = useState(investments[0]?.id ?? '');
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [openingBalance, setOpeningBalance] = useState('');
  const [closingBalance, setClosingBalance] = useState('');
  const [deposits, setDeposits] = useState('0');
  const [withdrawals, setWithdrawals] = useState('0');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const parseNumber = (v: string) => parseFloat(v.replace(',', '.')) || 0;

  const earnings =
    parseNumber(closingBalance) - parseNumber(openingBalance) -
    parseNumber(deposits) + parseNumber(withdrawals);

  const earningsPercent =
    parseNumber(openingBalance) > 0
      ? (earnings / parseNumber(openingBalance)) * 100
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await saveMonthlyClosing({
        investmentId: selectedInvestmentId,
        year,
        month,
        openingBalance: parseNumber(openingBalance),
        closingBalance: parseNumber(closingBalance),
        deposits: parseNumber(deposits),
        withdrawals: parseNumber(withdrawals),
        earnings,
        earningsPercent,
        note,
      });
      onSave(saved);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Investimento</label>
        <select
          value={selectedInvestmentId}
          onChange={(e) => setSelectedInvestmentId(e.target.value)}
          className={inputClass}
          required
        >
          {investments.filter(i => i.status === 'Ativo').map(inv => (
            <option key={inv.id} value={inv.id}>{inv.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Mês</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className={inputClass}
          >
            {MONTH_NAMES.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div className="w-24">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Ano</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Saldo Inicial</label>
          <input
            type="text"
            placeholder="0,00"
            value={openingBalance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Saldo Final</label>
          <input
            type="text"
            placeholder="0,00"
            value={closingBalance}
            onChange={(e) => setClosingBalance(e.target.value)}
            className={inputClass}
            required
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Aportes</label>
          <input
            type="text"
            placeholder="0,00"
            value={deposits}
            onChange={(e) => setDeposits(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Retiradas</label>
          <input
            type="text"
            placeholder="0,00"
            value={withdrawals}
            onChange={(e) => setWithdrawals(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Calculated preview */}
      {closingBalance && openingBalance && (
        <div className={`rounded-lg px-3 py-2 flex items-center gap-2 ${earnings >= 0 ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
          <TrendingUp className={`w-4 h-4 ${earnings >= 0 ? 'text-emerald-500' : 'text-red-500'}`} />
          <span className={`text-xs font-bold ${earnings >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
            Rendimento calculado: {formatCurrency(earnings)} ({formatPercent(earningsPercent)})
          </span>
        </div>
      )}

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Observação (opcional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className={inputClass + ' resize-none'}
          placeholder="Ex: Rendimento acima do esperado..."
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2 bg-gray-900 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar Fechamento'}
        </button>
      </div>
    </form>
  );
};

// ─── Recent Closings List ──────────────────────────────────────────────────────

const RecentClosings = ({ investments }: { investments: Investment[] }) => {
  const allClosings: (MonthlyClosing & { investmentName: string })[] = investments
    .flatMap((inv) =>
      inv.monthlyClosings.map((c) => ({ ...c, investmentName: inv.name }))
    )
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.month - a.month;
    })
    .slice(0, 8);

  if (allClosings.length === 0) {
    return (
      <p className="text-xs text-gray-400 text-center py-4">
        Nenhum fechamento registrado ainda.
      </p>
    );
  }

  return (
    <div className="space-y-2 mt-3">
      {allClosings.map((c) => (
        <div key={c.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-700 truncate max-w-[140px]">{c.investmentName}</p>
            <span className="text-[0.65rem] font-bold text-gray-400">
              {MONTH_NAMES[c.month - 1]}/{c.year}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold">{formatCurrency(c.closingBalance)}</span>
            <span className={`text-xs font-bold ${c.earnings >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {formatPercent(c.earningsPercent)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const MonthlyClosingPanel = ({ investments, onClosingSaved }: MonthlyClosingPanelProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const handleSave = (_closing: MonthlyClosing) => {
    setSavedCount((c) => c + 1);
    setIsFormOpen(false);
    onClosingSaved();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Fechamentos Mensais</h3>
        </div>
        <button
          onClick={() => setIsFormOpen((v) => !v)}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 rounded-lg text-xs font-bold text-white hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-scale-in">
          <CloseMonthForm
            investments={investments}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <RecentClosings investments={investments} key={savedCount} />
      </div>
    </div>
  );
};

export default MonthlyClosingPanel;
