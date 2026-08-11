import {
    Plus
} from 'lucide-react';

interface UpperBarSectionProps {
    onAddAccount: () => void;
}

const UpperBarSection = ({ onAddAccount }: UpperBarSectionProps) => {
    return (
        <div className="px-8 py-6 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-400 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-4 h-4" />
                <span className="text-sm text-gray-600 font-medium">Selecionar Tudo</span>
            </label>
            <button
                onClick={onAddAccount}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3b6fff] text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" strokeWidth={3} />
                Adicionar Conta
            </button>
        </div>
    )
}

export default UpperBarSection;