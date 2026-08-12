import { Plus, Calendar, ChevronDown } from 'lucide-react';
import { InvestmentCategory, ALL_CATEGORIES } from '../investmentsPageActions';

interface InvestmentsUpperBarProps {
  activeCategory: InvestmentCategory | 'Todos';
  onCategoryChange: (cat: InvestmentCategory | 'Todos') => void;
  onNewInvestment: () => void;
  onCloseMonth: () => void;
}

const InvestmentsUpperBar = ({
  activeCategory,
  onCategoryChange,
  onNewInvestment,
  onCloseMonth,
}: InvestmentsUpperBarProps) => {
  const categories: (InvestmentCategory | 'Todos')[] = ['Todos', ...ALL_CATEGORIES];

  return (
    <div className="flex flex-wrap items-center justify-between px-8 py-4 border-b border-gray-100 bg-white gap-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCloseMonth}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Fechar Mês
        </button>
        <button
          onClick={onNewInvestment}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Aplicação
        </button>
      </div>
    </div>
  );
};

export default InvestmentsUpperBar;
