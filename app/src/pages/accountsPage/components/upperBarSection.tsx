import {
    Plus
} from 'lucide-react';

interface UpperBarSectionProps {
    onAddAccount: () => void;
}

const UpperBarSection = ({ onAddAccount }: UpperBarSectionProps) => {
    return (
        <div className="px-8 py-6 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Contas Bancárias
            </h3>
            <button onClick={onAddAccount} className="flex items-center gap-2 px-5 py-2.5 bg-[#3b6fff] text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" strokeWidth={3} />
                Adicionar Conta
            </button>
        </div>
    );
}

export default UpperBarSection;