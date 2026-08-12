import { Plus } from 'lucide-react';

const UpperBarSection = () => {
    return (
        <div className="px-8 py-6 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Cartões de Crédito e Débito
            </h3>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3b6fff] text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" strokeWidth={3} />
                Adicionar Cartão
            </button>
        </div>
    );
};

export default UpperBarSection;
