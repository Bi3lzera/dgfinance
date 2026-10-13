import { X, Check } from "lucide-react";

interface FooterProps {
    onClose: () => void;
    handleSaveAndNew: () => void;
    handleSaveAndClose: () => void;
}

const Footer = ({ onClose, handleSaveAndNew, handleSaveAndClose }: FooterProps) => {
    return (
        <div className="flex-shrink-0 px-6 py-3 border-t border-gray-100 bg-white flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition px-3 py-2 rounded-xl hover:bg-gray-100">
                <X size={14} strokeWidth={2.5} />
                Cancelar Edição
            </button>
            <div className="flex items-center gap-3">
                <button onClick={handleSaveAndNew} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
                    Salvar e Novo
                </button>
                <button onClick={handleSaveAndClose} className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#3f64f7] hover:bg-[#3251c8] rounded-xl transition shadow-md shadow-blue-500/20">
                    <Check size={15} strokeWidth={3} />
                    Salvar Lançamento
                </button>
            </div>
        </div>
    )
}

export default Footer;