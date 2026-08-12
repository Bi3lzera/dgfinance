import { TrendingUp, TrendingDown, Wallet, ArrowDownCircle, ArrowUpCircle, BarChart2 } from 'lucide-react';
import { InvestmentSummary, formatCurrency, formatPercent } from '../investmentsPageActions';

interface InvestmentsHeaderProps {
  summary: InvestmentSummary;
  isLoading: boolean;
}

const StatCard = ({
  label,
  value,
  sub,
  subPositive,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  label: string;
  value: string;
  sub?: string;
  subPositive?: boolean;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}) => (
  <div className="flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
      {sub && (
        <p className={`text-xs font-semibold mt-0.5 ${subPositive ? 'text-emerald-600' : 'text-red-500'}`}>{sub}</p>
      )}
    </div>
  </div>
);

const InvestmentsHeader = ({ summary, isLoading }: InvestmentsHeaderProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap items-center justify-between p-8 border-b border-gray-100 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 w-48 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const monthPositive = summary.monthEarnings >= summary.prevMonthEarnings;

  return (
    <div className="flex flex-wrap items-center justify-between p-8 border-b border-gray-100 bg-white gap-8">
      {/* Total patrimônio — destaque principal */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Patrimônio Total</p>
        <h2 className="text-[2rem] font-black text-gray-900 leading-tight">
          {formatCurrency(summary.totalBalance)}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          {summary.earningsPercent >= 0 ? (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-bold ${summary.earningsPercent >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {formatPercent(summary.earningsPercent)} rendimento total
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 md:gap-10 border-l border-gray-100 pl-8">
        <StatCard
          label="Total Aplicado"
          value={formatCurrency(summary.totalDeposited)}
          icon={Wallet}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <div className="border-l border-gray-100" />
        <StatCard
          label="Rendimento do Mês"
          value={formatCurrency(summary.monthEarnings)}
          sub={`${monthPositive ? '▲' : '▼'} vs mês anterior ${formatCurrency(Math.abs(summary.monthEarnings - summary.prevMonthEarnings))}`}
          subPositive={monthPositive}
          icon={BarChart2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <div className="border-l border-gray-100" />
        <StatCard
          label="Total Retirado"
          value={formatCurrency(summary.totalWithdrawn)}
          icon={ArrowUpCircle}
          iconColor="text-orange-500"
          iconBg="bg-orange-50"
        />
        <div className="border-l border-gray-100" />
        <StatCard
          label="Rendimento Acum."
          value={formatCurrency(summary.totalEarnings)}
          sub={formatPercent(summary.earningsPercent) + ' sobre aplicado'}
          subPositive={summary.totalEarnings >= 0}
          icon={ArrowDownCircle}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-50"
        />
      </div>
    </div>
  );
};

export default InvestmentsHeader;
