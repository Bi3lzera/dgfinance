import { InvestmentSummary, formatCurrency, formatPercent } from '../investmentsPageActions';

interface InvestmentsPortfolioChartProps {
  summary: InvestmentSummary;
  isLoading: boolean;
}

const InvestmentsPortfolioChart = ({ summary, isLoading }: InvestmentsPortfolioChartProps) => {
  if (isLoading) {
    return <div className="h-48 bg-gray-50 rounded-xl animate-pulse" />;
  }

  const sorted = [...summary.byCategory].sort((a, b) => b.balance - a.balance);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
        Distribuição por Categoria
      </h3>

      {/* Stacked bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex mb-6" style={{ background: '#f1f5f9' }}>
        {sorted.map((item) => (
          <div
            key={item.category}
            className="h-full transition-all duration-700"
            style={{ width: `${item.percent}%`, backgroundColor: item.color }}
            title={`${item.category}: ${item.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend rows */}
      <div className="space-y-3">
        {sorted.map((item) => (
          <div key={item.category} className="flex items-center gap-3">
            {/* Color dot */}
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            {/* Category name */}
            <span className="text-xs font-semibold text-gray-700 flex-1 min-w-0 truncate">
              {item.category}
            </span>
            {/* Progress bar */}
            <div className="flex-1 max-w-[120px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${item.percent}%`, backgroundColor: item.color }}
              />
            </div>
            {/* Percent */}
            <span className="text-xs font-bold text-gray-500 w-10 text-right shrink-0">
              {item.percent.toFixed(1)}%
            </span>
            {/* Value */}
            <span className="text-xs font-bold text-gray-900 w-28 text-right shrink-0">
              {formatCurrency(item.balance)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentsPortfolioChart;
