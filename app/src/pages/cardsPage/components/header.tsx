import { Filter, MoreVertical } from 'lucide-react';

const Header = () => {
    return (
        <div className="flex flex-wrap items-center justify-between p-8 border-b border-gray-100 gap-6">
            <div className="flex flex-wrap gap-8 md:gap-16">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Saldo a Pagar do Mês</p>
                    <h2 className="text-[1.75rem] font-bold text-gray-900">R$ 102.730,90</h2>
                </div>
                <div className="border-l border-gray-200 pl-8">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total a Pagar de Meses Futuros</p>
                    <h2 className="text-[1.75rem] font-bold text-yellow-500">R$ 4.520,12</h2>
                </div>
                <div className="border-l border-gray-200 pl-8">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Vencido</p>
                    <h2 className="text-[1.75rem] font-bold text-red-600">R$ 420,12</h2>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filtros
                </button>
                <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Header;
