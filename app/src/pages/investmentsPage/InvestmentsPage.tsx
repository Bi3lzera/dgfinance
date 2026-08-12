import { useState, useEffect, useCallback } from 'react';
import {
  fetchInvestments,
  fetchSummary,
  Investment,
  InvestmentSummary,
  InvestmentCategory,
} from './investmentsPageActions';

import InvestmentsHeader from './components/InvestmentsHeader';
import InvestmentsUpperBar from './components/InvestmentsUpperBar';
import InvestmentsPortfolioChart from './components/InvestmentsPortfolioChart';
import InvestmentsList from './components/InvestmentsList';
import MonthlyClosingPanel from './components/MonthlyClosingPanel';
import InvestmentDetailModal from './components/InvestmentDetailModal';
import NewInvestmentModal from './components/NewInvestmentModal';

const InvestmentsPage = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [summary, setSummary] = useState<InvestmentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<InvestmentCategory | 'Todos'>('Todos');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewInvestmentOpen, setIsNewInvestmentOpen] = useState(false);
  const [isCloseMonthOpen, setIsCloseMonthOpen] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [invData, summaryData] = await Promise.all([
        fetchInvestments(),
        fetchSummary(),
      ]);
      setInvestments(invData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Failed to load investment data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleInvestmentDoubleClick = (inv: Investment) => {
    setSelectedInvestment(inv);
    setIsDetailOpen(true);
  };

  const handleNewInvestmentSaved = (inv: Investment) => {
    setInvestments((prev) => [inv, ...prev]);
  };

  const handleMonthlyClosingSaved = () => {
    // In the future, refetch from API here
    loadData();
  };

  return (
    <div className="flex w-full h-full bg-[#f8fafc]">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ═══════════════════════════════════════════════════ */}
        {/* BLOCK 1: HEADER — totals & portfolio summary        */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="animate-fade-in-down bg-white" style={{ animationDelay: '0ms' }}>
          <InvestmentsHeader summary={summary!} isLoading={isLoading || !summary} />
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* BLOCK 2: UPPER BAR — category tabs + actions        */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="animate-fade-in-up bg-white shrink-0" style={{ animationDelay: '80ms' }}>
          <InvestmentsUpperBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onNewInvestment={() => setIsNewInvestmentOpen(true)}
            onCloseMonth={() => setIsCloseMonthOpen(true)}
          />
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* BLOCK 3: MAIN CONTENT                              */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="flex-1 flex gap-6 overflow-hidden p-6 animate-fade-in-up" style={{ animationDelay: '160ms' }}>

          {/* LEFT COLUMN: chart + list */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-w-0">

            {/* Portfolio Distribution Chart */}
            {!isLoading && summary && (
              <div className="animate-fade-in-up shrink-0" style={{ animationDelay: '200ms' }}>
                <InvestmentsPortfolioChart summary={summary} isLoading={isLoading} />
              </div>
            )}

            {/* Investments List */}
            <div className="animate-fade-in-up" style={{ animationDelay: '260ms' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Aplicações
                  {activeCategory !== 'Todos' && (
                    <span className="ml-2 text-gray-400 font-semibold normal-case tracking-normal">
                      — {activeCategory}
                    </span>
                  )}
                </h3>
                <span className="text-xs font-bold text-gray-400">
                  {activeCategory === 'Todos'
                    ? `${investments.length} total`
                    : `${investments.filter(i => i.category === activeCategory).length} registros`}
                </span>
              </div>
              <InvestmentsList
                investments={investments}
                isLoading={isLoading}
                activeCategory={activeCategory}
                onInvestmentDoubleClick={handleInvestmentDoubleClick}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Monthly Closing Panel */}
          <div
            className="w-[320px] shrink-0 flex flex-col overflow-hidden animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <MonthlyClosingPanel
              investments={investments}
              onClosingSaved={handleMonthlyClosingSaved}
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* MODALS                                              */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Detail Modal — opened by double click */}
      <InvestmentDetailModal
        investment={selectedInvestment}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedInvestment(null);
        }}
        onMonthlyClosingSaved={handleMonthlyClosingSaved}
      />

      {/* New Investment Modal */}
      <NewInvestmentModal
        isOpen={isNewInvestmentOpen}
        onClose={() => setIsNewInvestmentOpen(false)}
        onSaved={handleNewInvestmentSaved}
      />

      {/* Fechar Mês — reuses the monthly closing panel in a modal context */}
      {isCloseMonthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsCloseMonthOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-black text-gray-900">Fechar Mês</h2>
                <button
                  onClick={() => setIsCloseMonthOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400"
                >
                  ✕
                </button>
              </div>
              <MonthlyClosingPanel
                investments={investments}
                onClosingSaved={() => {
                  setIsCloseMonthOpen(false);
                  handleMonthlyClosingSaved();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentsPage;
