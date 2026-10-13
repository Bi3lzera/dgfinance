import { X } from 'lucide-react';

interface HeaderProps {
    onClose: () => void;
    setTipo: (tipo: 'receita' | 'despesa') => void;
    tipo: 'receita' | 'despesa';
    isEditing?: boolean;
}

export const Header = ({ onClose, setTipo, tipo, isEditing }: HeaderProps) => {
    return (
        <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{isEditing ? 'Editar Lançamento' : 'Novo Lançamento'}</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{isEditing ? 'Altere os dados abaixo para atualizar sua transação.' : 'Preencha os dados abaixo para registrar sua transação.'}</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Type Toggle */}
                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-gray-100">
                        <button
                            onClick={() => setTipo('receita')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${tipo === 'receita'
                                ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                                : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <span className="text-base">⊕</span> Receita
                        </button>
                        <button
                            onClick={() => setTipo('despesa')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${tipo === 'despesa'
                                ? 'bg-[#f05a28] text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <span className="text-base">⊖</span> Despesa
                        </button>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                        <X size={18} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;