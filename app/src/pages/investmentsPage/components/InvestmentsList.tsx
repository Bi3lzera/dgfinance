import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import {
  Investment,
  InvestmentCategory,
  formatCurrency,
  formatPercent,
  CATEGORY_ICONS,
} from '../investmentsPageActions';

interface InvestmentsListProps {
  investments: Investment[];
  isLoading: boolean;
  activeCategory: InvestmentCategory | 'Todos';
  onInvestmentDoubleClick: (investment: Investment) => void;
}

const StatusBadge = ({ status }: { status: Investment['status'] }) => {
  const styles: Record<Investment['status'], string> = {
    Ativo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Encerrado: 'bg-gray-100 text-gray-500 border-gray-200',
    Suspenso: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <span className={`px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
    ))}
  </div>
);

const InvestmentsList = ({
  investments,
  isLoading,
  activeCategory,
  onInvestmentDoubleClick,
}: InvestmentsListProps) => {
  const filtered =
    activeCategory === 'Todos'
      ? investments
      : investments.filter((i) => i.category === activeCategory);

  if (isLoading) return <LoadingSkeleton />;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-5xl mb-4">📊</span>
        <p className="text-sm font-semibold">Nenhum investimento encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filtered.map((inv, idx) => {
        const positive = inv.earningsPercent >= 0;
        const balanceVsDeposited = inv.currentBalance / (inv.totalDeposited || 1);
        const progressWidth = Math.min(balanceVsDeposited * 60, 100); // visual cap

        return (
          <div
            key={inv.id}
            onDoubleClick={() => onInvestmentDoubleClick(inv)}
            className="animate-fade-in-up bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl ${inv.iconBgColor} flex items-center justify-center shrink-0 text-lg`}
              >
                {CATEGORY_ICONS[inv.category]}
              </div>

              {/* Name + institution */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{inv.name}</h4>
                  <StatusBadge status={inv.status} />
                </div>
                <p className="text-xs text-gray-400 font-semibold truncate">{inv.institution} · {inv.category}</p>
              </div>

              {/* Progress bar + % */}
              <div className="hidden md:flex flex-col items-end w-32 shrink-0 gap-1">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(inv.earningsPercent, 100)}%`,
                      backgroundColor: inv.accentColor,
                    }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  {positive ? (
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-bold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {formatPercent(inv.earningsPercent)} rendimento
                  </span>
                </div>
              </div>

              {/* Values */}
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-gray-900">{formatCurrency(inv.currentBalance)}</p>
                <p className="text-xs text-gray-400 font-semibold">
                  Aplicado: {formatCurrency(inv.totalDeposited)}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvestmentsList;
