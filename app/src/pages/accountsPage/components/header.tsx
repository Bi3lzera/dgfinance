import {
    MoreVertical,
} from 'lucide-react';

const header = () => {
    return (
        <div className="flex flex-wrap items-center justify-between p-8 border-b border-gray-100 gap-6">
            <div className="flex flex-wrap gap-8 md:gap-16">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Disponível Total</p>
                    <h2 className="text-[1.75rem] font-bold text-gray-900">R$ 102.730,90</h2>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total em Cartões</p>
                    <h2 className="text-[1.75rem] font-bold text-red-500">R$ 4.520,12</h2>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Bloqueado</p>
                    <h2 className="text-[1.75rem] font-bold text-orange-500">R$ 2.500,00</h2>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                    Filtros Avançados
                </button>
                <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default header;