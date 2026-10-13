import React from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
    onClose: () => void;
    isEditing?: boolean;
}

export const Header = ({ onClose, isEditing }: HeaderProps) => {
    return (
        <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{isEditing ? 'Editar Conta' : 'Nova Conta'}</h1>
                    <p className="text-xs text-gray-400 mt-0.5">{isEditing ? 'Altere os dados abaixo para atualizar sua conta.' : 'Preencha os dados abaixo para registrar uma nova conta.'}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                        <X size={18} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
