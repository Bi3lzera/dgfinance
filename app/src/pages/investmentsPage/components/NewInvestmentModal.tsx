import { useState } from 'react';
import { X } from 'lucide-react';
import {
  InvestmentCategory,
  InvestmentStatus,
  saveInvestment,
  Investment,
  ALL_CATEGORIES,
  CATEGORY_ICONS,
} from '../investmentsPageActions';

interface NewInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (investment: Investment) => void;
}

const ICON_BG_OPTIONS: { label: string; value: string; accent: string }[] = [
  { label: 'Roxo', value: 'bg-purple-100', accent: '#8b5cf6' },
  { label: 'Verde', value: 'bg-green-100', accent: '#10b981' },
  { label: 'Azul', value: 'bg-blue-100', accent: '#3b82f6' },
  { label: 'Âmbar', value: 'bg-amber-100', accent: '#f59e0b' },
  { label: 'Ciano', value: 'bg-teal-100', accent: '#14b8a6' },
  { label: 'Laranja', value: 'bg-orange-100', accent: '#f97316' },
  { label: 'Índigo', value: 'bg-indigo-100', accent: '#6366f1' },
  { label: 'Vermelho', value: 'bg-red-100', accent: '#ef4444' },
];

const NewInvestmentModal = ({ isOpen, onClose, onSaved }: NewInvestmentModalProps) => {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState<InvestmentCategory>('Renda Fixa');
  const [status] = useState<InvestmentStatus>('Ativo');
  const [initialAmount, setInitialAmount] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [maturityDate, setMaturityDate] = useState('');
  const [monthlyRate, setMonthlyRate] = useState('');
  const [yearlyRate, setYearlyRate] = useState('');
  const [iconBgColor, setIconBgColor] = useState('bg-blue-100');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const parseNumber = (v: string) => parseFloat(v.replace(',', '.')) || 0;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Nome é obrigatório';
    if (!institution.trim()) errs.institution = 'Instituição é obrigatória';
    if (!initialAmount || parseNumber(initialAmount) <= 0) errs.initialAmount = 'Valor inicial deve ser maior que zero';
    if (!startDate) errs.startDate = 'Data de início é obrigatória';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    try {
      const amount = parseNumber(initialAmount);
      const saved = await saveInvestment({
        name: name.trim(),
        institution: institution.trim(),
        category,
        status,
        initialAmount: amount,
        currentBalance: amount,
        totalDeposited: amount,
        totalWithdrawn: 0,
        totalEarnings: 0,
        earningsPercent: 0,
        startDate,
        maturityDate: maturityDate || undefined,
        monthlyRate: monthlyRate ? parseNumber(monthlyRate) : undefined,
        yearlyRate: yearlyRate ? parseNumber(yearlyRate) : undefined,
        movements: [],
        monthlyClosings: [],
        iconBgColor,
        accentColor,
      });
      onSaved(saved);
      onClose();
      // Reset
      setName(''); setInstitution(''); setInitialAmount('');
      setMonthlyRate(''); setYearlyRate(''); setMaturityDate('');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 bg-gray-50 ${
      errors[field] ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-300'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-black text-gray-900">Nova Aplicação</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Nome *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass('name')} placeholder="Ex: CDB Nubank 110% CDI" />
            {errors.name && <p className="text-[0.65rem] text-red-500 font-semibold mt-1">{errors.name}</p>}
          </div>

          {/* Institution */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Instituição *</label>
            <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className={inputClass('institution')} placeholder="Ex: Nubank, XP, BTG..." />
            {errors.institution && <p className="text-[0.65rem] text-red-500 font-semibold mt-1">{errors.institution}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Categoria *</label>
            <div className="grid grid-cols-3 gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg border text-xs font-bold transition-all ${
                    category === cat
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <span className="text-base">{CATEGORY_ICONS[cat]}</span>
                  <span className="text-center leading-tight">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Initial amount + start date */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Valor Inicial *</label>
              <input type="text" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} className={inputClass('initialAmount')} placeholder="0,00" />
              {errors.initialAmount && <p className="text-[0.65rem] text-red-500 font-semibold mt-1">{errors.initialAmount}</p>}
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Data Início *</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass('startDate')} />
            </div>
          </div>

          {/* Maturity date */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Vencimento (opcional)</label>
            <input type="date" value={maturityDate} onChange={(e) => setMaturityDate(e.target.value)} className={inputClass('maturityDate')} />
          </div>

          {/* Rates */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Taxa Mensal % (opcional)</label>
              <input type="text" value={monthlyRate} onChange={(e) => setMonthlyRate(e.target.value)} className={inputClass('monthlyRate')} placeholder="0.00" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Taxa Anual % (opcional)</label>
              <input type="text" value={yearlyRate} onChange={(e) => setYearlyRate(e.target.value)} className={inputClass('yearlyRate')} placeholder="0.00" />
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Cor do Ícone</label>
            <div className="flex flex-wrap gap-2">
              {ICON_BG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setIconBgColor(opt.value); setAccentColor(opt.accent); }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${opt.value} ${iconBgColor === opt.value ? 'border-gray-700 scale-110' : 'border-transparent hover:border-gray-300'}`}
                  title={opt.label}
                />
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-100 shrink-0">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 py-2.5 bg-gray-900 rounded-xl text-sm font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-60">
            {saving ? 'Salvando...' : 'Criar Aplicação'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewInvestmentModal;
