import { CreditCard } from "lucide-react";
import { formatCurrencyToBRL } from "../../../utils/formats";

const mockCards = [
    {
        id: 1,
        name: "Cartão Black",
        institution: "Mastercard",
        balance: 1500.50,
        limitAvailable: 8500.50,
        lastFour: "1234",
        status: "ativo",
        logoUrl: ""
    }
];

const CreditCardSection = () => {

    return (
        <div className="px-8 pb-12">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Meus Cartões</h3>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {mockCards.map(card => (
                    <div key={card.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full">
                        {/* Card Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                                {card.logoUrl ? (
                                    <img src={card.logoUrl} alt={card.institution} className="w-full h-full object-contain p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                ) : (
                                    <CreditCard className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{card.name}</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{card.institution}</p>
                            </div>
                        </div>

                        {/* Card Balance */}
                        <div className="mb-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Saldo Atual</p>
                            <p className="text-xl font-extrabold text-red-500">{formatCurrencyToBRL(card.balance)}</p>
                        </div>

                        {/* Card Limit */}
                        <div className="mb-6 flex gap-4 items-center">
                            <div className="text-[10px] font-bold text-gray-500 leading-tight">
                                Limite<br />Disponível
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-extrabold text-gray-900 mb-1">
                                    R$ {card.limitAvailable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-[#3b6fff] h-full w-[20%]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="h-px bg-gray-100 w-16 mb-4"></div>
                            {/* Card Footer */}
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-lg font-bold text-gray-400 leading-none">••••</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1">{card.lastFour}</p>
                                    <div className="text-[10px] text-gray-400 mt-2 leading-tight">
                                        <p>Sinc.</p>
                                        <p>Hoje</p>
                                        <p>09:12</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-xs font-bold ${card.status === 'ativo' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-orange-50 text-orange-500 border border-orange-100'}`}>
                                    {card.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreditCardSection;