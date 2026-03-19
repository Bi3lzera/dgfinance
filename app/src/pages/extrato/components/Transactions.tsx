import { Edit2, Paperclip } from "lucide-react";

const mockExtratoData = [
    {
        id: '1',
        day: '24 Mar',
        year: '2026',
        title: 'Assinatura Adobe Creative Cloud',
        tag: 'SOFTWARE & FERRAMENTAS',
        institution: 'Nubank Platinum',
        institutionDot: 'bg-blue-300',
        amount: '- R$ 124,90',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Efetivado',
    },
    {
        id: '2',
        day: '23 Mar',
        year: '2026',
        title: 'Projeto Freelance - Mobile App UI',
        tag: 'SERVIÇOS PRESTADOS',
        institution: 'Itaú Personalité',
        institutionDot: 'bg-gray-300',
        amount: '+ R$ 4.500,00',
        type: 'CRÉDITO',
        isExpense: false,
        status: 'Efetivado',
    },
    {
        id: '3',
        day: '22 Mar',
        year: '2026',
        title: 'Supermercado Pão de Açúcar',
        tag: 'ALIMENTAÇÃO',
        institution: 'Nubank Platinum',
        institutionDot: 'bg-blue-300',
        amount: '- R$ 642,15',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Efetivado',
    },
    {
        id: '4',
        day: '21 Mar',
        year: '2026',
        title: 'Conta de Energia Light',
        tag: 'MORADIA',
        institution: 'Itaú Personalité',
        institutionDot: 'bg-gray-300',
        amount: '- R$ 320,50',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Agendado',
    },
    {
        id: '5',
        day: '20 Mar',
        year: '2026',
        title: 'Rendimentos CDB Diário',
        tag: 'INVESTIMENTOS',
        institution: 'XP Investimentos',
        institutionDot: 'bg-indigo-400',
        amount: '+ R$ 85,30',
        type: 'CRÉDITO',
        isExpense: false,
        status: 'Efetivado',
    },
    {
        id: '6',
        day: '19 Mar',
        year: '2026',
        title: 'Jantar Restaurante Coco Bambu',
        tag: 'LAZER & ENTRETENIMENTO',
        institution: 'Nubank Platinum',
        institutionDot: 'bg-blue-300',
        amount: '- R$ 280,00',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Efetivado',
    },
    {
        id: '7',
        day: '18 Mar',
        year: '2026',
        title: 'Parcela Seguro Carro Porto Seguro',
        tag: 'TRANSPORTE',
        institution: 'Itaú Personalité',
        institutionDot: 'bg-gray-300',
        amount: '- R$ 450,00',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Efetivado',
    },
    // Duplicate the same objects to simulate infinite list and force scroll
    {
        id: '8',
        day: '17 Mar',
        year: '2026',
        title: 'Mensalidade Academia SmartFit',
        tag: 'SAÚDE & BEM ESTAR',
        institution: 'Nubank Platinum',
        institutionDot: 'bg-blue-300',
        amount: '- R$ 120,00',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Efetivado',
    },
    {
        id: '9',
        day: '16 Mar',
        year: '2026',
        title: 'Uber Viagens',
        tag: 'TRANSPORTE',
        institution: 'Itaú Personalité',
        institutionDot: 'bg-gray-300',
        amount: '- R$ 45,50',
        type: 'DÉBITO',
        isExpense: true,
        status: 'Efetivado',
    },
    {
        id: '10',
        day: '15 Mar',
        year: '2026',
        title: 'Venda de Notebook Usado',
        tag: 'RENDA EXTRA',
        institution: 'Mercado Pago',
        institutionDot: 'bg-blue-500',
        amount: '+ R$ 2.100,00',
        type: 'CRÉDITO',
        isExpense: false,
        status: 'Efetivado',
    }
];

const Transactions = () => {
    return (
        <div className="flex-1 h-full bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden flex flex-col relative">
            {/* List Header */}
            <div className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_40px] gap-4 px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Data</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Descrição & Tag</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Instituição</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Valor Líquido</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase text-center">Status</span>
                <span></span>
            </div>

            {/* List Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
                {mockExtratoData.map((item, id) => (
                    <div key={item.id + id} className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_40px] gap-4 px-6 py-5 border-b border-gray-50 items-center hover:bg-slate-50/50 transition cursor-pointer">
                        {/* Data */}
                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm text-gray-900">{item.day}</span>
                            <span className="text-[11px] text-gray-400 font-medium">{item.year}</span>
                        </div>

                        {/* Descrição & Tag */}
                        <div className="flex flex-col gap-1.5 justify-center">
                            <span className="font-bold text-sm text-gray-900 truncate">{item.title}</span>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100/50 whitespace-nowrap">
                                    {item.tag}
                                </span>
                                <Paperclip size={12} strokeWidth={2.5} className="text-gray-400" />
                            </div>
                        </div>

                        {/* Instituição */}
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${item.institutionDot}`}></div>
                            <span className="text-xs font-semibold text-gray-500 truncate">{item.institution}</span>
                        </div>

                        {/* Valor Líquido */}
                        <div className="flex flex-col justify-center">
                            <span className={`font-bold text-[15px] whitespace-nowrap ${item.isExpense ? 'text-red-600' : 'text-gray-900'}`}>
                                {item.amount}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mt-0.5">
                                {item.type}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="flex justify-center">
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-[11px] font-bold text-gray-800 bg-white whitespace-nowrap shadow-sm">
                                {item.status}
                            </span>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center justify-end">
                            <button className="text-gray-400 hover:text-gray-700 transition p-1">
                                <Edit2 size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                ))}
                {/* Loading state indicator for infinite scroll simulation */}
                <div className="py-6 flex justify-center items-center text-xs font-semibold text-gray-400">
                    Carregando mais transações...
                </div>
            </div>
        </div>
    )
}

export default Transactions;