import { Wallet, ArrowUp, ArrowDown, MoreVertical } from "lucide-react";

const mockControlPanelData = [
    { title: 'Patrimônio Consolidado', amount: 'R$ 18.245,30', icon: <Wallet size={20} strokeWidth={2} /> },
    { title: 'Receita Realizada', amount: 'R$ 12.500,00', icon: <ArrowUp size={20} strokeWidth={2.5} /> },
    { title: 'Despesa Acumulada', amount: 'R$ 4.254,70', icon: <ArrowDown size={20} strokeWidth={2.5} /> },
];

const ControlPanelCard = () => {
    return (
        <div className="flex-shrink-0 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-[13px] font-bold tracking-widest text-gray-600 uppercase">Painel de Controle</h3>
                <button className="text-gray-400 hover:text-gray-700"><MoreVertical size={16} /></button>
            </div>

            {/* Patrimônio */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Wallet size={18} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Patrimônio Consolidado</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{mockControlPanelData[0].amount}</span>
                </div>
            </div>

            {/* Receita */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900">
                    <ArrowUp size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Receita Realizada</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{mockControlPanelData[1].amount}</span>
                </div>
            </div>

            {/* Despesa */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                    <ArrowDown size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Despesa Acumulada</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{mockControlPanelData[2].amount}</span>
                </div>
            </div>
        </div>
    )
}

export default ControlPanelCard;