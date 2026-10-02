import React from 'react';
import { Download, Search, ArrowUpRight, ArrowDownLeft, FileText, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTransacoesTab, isIncomeTransaction, formatDateBR, parseNumericValue } from './transacoesTab';
import { formatCurrencyToBRL } from '../../../../../utils/formats';

interface TransacoesTabProps {
    idAccount?: number;
}

const TransacoesTab: React.FC<TransacoesTabProps> = ({ idAccount }) => {
    const {
        paginatedTransactions,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        metrics,
        nextPage,
        prevPage,
        refetch
    } = useTransacoesTab(idAccount);

    const handleExportCSV = () => {
        if (!paginatedTransactions.length) return;
        const headers = ['Data', 'Título', 'Categoria', 'Tipo', 'Valor (R$)', 'Banco', 'Conta'];
        const rows = paginatedTransactions.map((tx) => [
            formatDateBR(tx.date),
            `"${(tx.movementTitle || 'Sem título').replace(/"/g, '""')}"`,
            `"${(tx.movementCategory || 'Sem categoria').replace(/"/g, '""')}"`,
            tx.transactionType || '',
            parseNumericValue(tx.transactionValue).toFixed(2),
            `"${(tx.bankName || '').replace(/"/g, '""')}"`,
            `"${(tx.accountNumber || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `transacoes_conta_${idAccount || 'extrato'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {/* Transactions Panel */}
            <div className="bg-white border border-gray-200 rounded-2xl flex flex-col shadow-sm flex-1 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Histórico de Transações</h3>
                            <p className="text-sm text-gray-500 mt-1">Visualize e gerencie todos os movimentos da sua conta.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => refetch()}
                                title="Atualizar dados"
                                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={handleExportCSV}
                                disabled={totalItems === 0}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Exportar
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                        <div className="flex-1 relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por descrição, categoria ou valor..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
                            <button
                                onClick={() => setFilterType('todos')}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filterType === 'todos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Todos
                            </button>
                            <button
                                onClick={() => setFilterType('receita')}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filterType === 'receita' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Receitas
                            </button>
                            <button
                                onClick={() => setFilterType('despesa')}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filterType === 'despesa' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Despesas
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/90 sticky top-0 z-10 backdrop-blur-xs">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Data</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Descrição</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Categoria</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Valor (R$)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
                                            <p className="text-sm font-medium text-gray-500">Carregando transações...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3 text-red-500">
                                            <AlertCircle className="w-8 h-8 text-red-400" />
                                            <p className="text-sm font-semibold">{error}</p>
                                            <button
                                                onClick={() => refetch()}
                                                className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                                            >
                                                Tentar novamente
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                                            <Search className="w-8 h-8 text-gray-300 stroke-[1.5]" />
                                            <p className="text-sm font-semibold text-gray-600">Nenhuma transação encontrada</p>
                                            <p className="text-xs text-gray-400 max-w-xs">
                                                {searchTerm ? 'Nenhum resultado corresponde à sua pesquisa.' : 'Esta conta ainda não possui movimentações registradas.'}
                                            </p>
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                                                >
                                                    Limpar busca
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedTransactions.map((tx) => {
                                    const isIncome = isIncomeTransaction(tx.transactionType);
                                    const numericVal = Math.abs(parseNumericValue(tx.transactionValue));
                                    const formattedVal = formatCurrencyToBRL(numericVal);
                                    const title = tx.movementTitle || tx.accountAlias || 'Transação';

                                    return (
                                        <tr key={tx.idTransaction} className="hover:bg-gray-50/80 transition-colors group">
                                            {/* Data */}
                                            <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                                                {formatDateBR(tx.date)}
                                            </td>

                                            {/* Descrição */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${isIncome
                                                            ? 'bg-green-50 text-green-600 border-green-100'
                                                            : 'bg-gray-100 text-gray-500 border-gray-200/60'
                                                            }`}
                                                    >
                                                        {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                            {title}
                                                        </span>
                                                        {tx.bankName && (
                                                            <p className="text-[10px] text-gray-400 font-medium">
                                                                {tx.bankName} {tx.accountNumber ? `• C/C ${tx.accountNumber}` : ''}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Categoria */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                                                    {tx.movementCategory || 'Sem categoria'}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider bg-green-50/70 border border-green-100 px-2 py-0.5 rounded">
                                                    Efetivado
                                                </span>
                                            </td>

                                            {/* Valor */}
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <p className={`text-sm font-bold ${isIncome ? 'text-blue-600' : 'text-red-500'}`}>
                                                    {isIncome ? `+ ${formattedVal}` : `- ${formattedVal}`}
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                                                    {tx.accountAlias || (tx.accountNumber ? `Conta final ${tx.accountNumber.slice(-4)}` : '')}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        Mostrando <strong className="text-gray-900">{paginatedTransactions.length}</strong> de{' '}
                        <strong className="text-gray-900">{totalItems}</strong> transações
                    </span>
                    <div className="flex gap-1 items-center text-sm font-semibold">
                        <button
                            onClick={prevPage}
                            disabled={currentPage <= 1}
                            className="px-3 py-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-xs font-bold ${currentPage === pageNum ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            onClick={nextPage}
                            disabled={currentPage >= totalPages}
                            className="px-3 py-1 text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total de Registros</p>
                            <h4 className="text-lg font-bold text-gray-900">{metrics.totalCount} transações</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saída Média</p>
                            <h4 className="text-lg font-bold text-gray-900">{formatCurrencyToBRL(metrics.averageExpense)}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${metrics.balanceProjection >= 0
                                ? 'bg-green-50 text-green-600 border-green-100'
                                : 'bg-red-50 text-red-500 border-red-100'
                                }`}
                        >
                            <ArrowDownLeft className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saldo do Período</p>
                            <h4 className={`text-lg font-bold ${metrics.balanceProjection >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {metrics.balanceProjection >= 0 ? '+ ' : ''}
                                {formatCurrencyToBRL(metrics.balanceProjection)}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransacoesTab;
