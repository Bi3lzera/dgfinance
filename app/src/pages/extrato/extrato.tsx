import React, { useState } from 'react';
import { Search, Filter, Info, ChevronDown, MoreVertical, Wallet, ArrowUp, ArrowDown, Calendar, Paperclip, Edit2 } from 'lucide-react';
import TopBar from '../../components/topBar/TopBar';

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

const mockFutureCommitments = [
    { title: 'Aluguel Loft Central', time: 'VENCE AMANHÃ', amount: 'R$ 2.800,00', isCritical: true },
    { title: 'Condomínio Residencial', time: 'EM 2 DIAS', amount: 'R$ 450,00', isCritical: false },
    { title: 'Internet Fibra Óptica', time: 'EM 5 DIAS', amount: 'R$ 149,90', isCritical: false }
];

const Extrato: React.FC = () => {
    const [mes, setMes] = useState('marco');
    const [ano, setAno] = useState(2026);
    const [filterTab, setFilterTab] = useState('Geral');

    return (
        <div className="flex flex-col h-screen bg-[#fbfbfe] overflow-hidden">
            <TopBar pageDescription="Extrato" mes={mes} setMes={setMes} ano={ano} setAno={setAno} />

            <div className="flex-1 overflow-auto max-w-[80vw] mx-auto w-full py-6 pb-20">
                {/* Search & Filter Header Row */}
                <div className="flex items-center gap-4 mb-4">
                    {/* Search Field */}
                    <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                        <Search size={18} strokeWidth={2} className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Busque por beneficiário, banco, categoria ou valor..."
                            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                        />
                    </div>

                    {/* Filtros Button */}
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl font-bold text-[13px] text-gray-800 tracking-wide hover:bg-slate-50 transition shadow-sm">
                        <Filter size={16} strokeWidth={2.5} className="text-blue-600" />
                        FILTROS
                    </button>

                    {/* Tabs (Geral, Receitas, Despesas) */}
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        {['Geral', 'Receitas', 'Despesas'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilterTab(tab)}
                                className={`px-6 py-2 rounded-lg text-xs font-bold transition ${filterTab === tab
                                    ? tab === 'Geral' ? 'text-blue-600 bg-blue-50/50'
                                        : tab === 'Receitas' ? 'text-gray-900 bg-gray-50'
                                            : 'text-red-500 bg-red-50/50'
                                    : 'text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Context & Tags Row */}
                <div className="flex items-center gap-6 mb-8 mt-2 px-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Info size={16} strokeWidth={2} />
                        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">Contexto Atual</span>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-indigo-50/70 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-indigo-100 transition">
                            Banco: Todos
                            <ChevronDown size={14} strokeWidth={2.5} />
                        </button>
                        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-50 transition shadow-sm">
                            Status: Efetivado
                            <ChevronDown size={14} strokeWidth={2.5} />
                        </button>
                    </div>

                    <div className="h-4 w-[1px] bg-gray-300"></div>

                    <button className="text-[11px] font-bold tracking-wide text-gray-800 hover:text-red-600 hover:underline transition">
                        Remover Todos
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex gap-8 items-start h-full">
                    {/* Left side: List of transactions */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden flex flex-col max-h-[750px] relative">
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

                    {/* Right side: Painel de Controle */}
                    <div className="w-[340px] flex flex-col flex-shrink-0">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-[13px] font-bold tracking-widest text-gray-600 uppercase">Painel de Controle</h3>
                            <button className="text-gray-400 hover:text-gray-700"><MoreVertical size={16} /></button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Patrimônio */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <Wallet size={20} strokeWidth={2} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Patrimônio Consolidado</span>
                                    <span className="text-xl font-bold text-gray-900 mt-0.5">R$ 18.245,30</span>
                                </div>
                            </div>

                            {/* Receita */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-900">
                                    <ArrowUp size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Receita Realizada</span>
                                    <span className="text-xl font-bold text-gray-900 mt-0.5">R$ 12.500,00</span>
                                </div>
                            </div>

                            {/* Despesa */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                                    <ArrowDown size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Despesa Acumulada</span>
                                    <span className="text-xl font-bold text-gray-900 mt-0.5">R$ 4.254,70</span>
                                </div>
                            </div>
                        </div>

                        {/* Compromissos Futuros */}
                        <div className="mt-6 bg-[#f8f9ff] rounded-2xl p-5 border border-indigo-50/50 shadow-[inset_0_2px_10px_rgba(255,255,255,1)] relative overflow-hidden">
                            {/* Background Calendar Icon */}
                            <div className="absolute -right-2 top-4 opacity-5 pointer-events-none transform rotate-12">
                                <Calendar size={120} strokeWidth={1.5} />
                            </div>

                            <div className="flex items-center gap-2 mb-5 relative z-10">
                                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                <h3 className="text-[12px] font-bold tracking-widest text-gray-800 uppercase">Compromissos Futuros</h3>
                            </div>

                            <div className="flex flex-col gap-3 relative z-10">
                                {mockFutureCommitments.map((item, idx) => (
                                    <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold text-gray-900 truncate max-w-[150px]">{item.title}</span>
                                            <span className="text-[10px] font-bold tracking-wider uppercase text-gray-500 mt-0.5">{item.time}</span>
                                        </div>
                                        <span className={`font-bold text-sm ${item.isCritical ? 'text-red-600' : 'text-gray-900'}`}>{item.amount}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 bg-white border border-indigo-100 text-blue-600 font-bold text-[13px] py-3 rounded-xl hover:bg-slate-50 transition shadow-sm relative z-10">
                                Acessar Calendário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extrato;
