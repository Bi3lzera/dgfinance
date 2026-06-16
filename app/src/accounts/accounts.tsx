import { useState } from 'react';
import { 
  Search, 
  LayoutGrid, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  MoreVertical, 
  Plus 
} from 'lucide-react';

// ==========================================
// BLOCK: MOCK DATA
// ==========================================
const mockAccounts = [
  {
    id: 1,
    name: 'Nubank Principal',
    institution: 'NUBANK S.A.',
    balance: 12450.60,
    lastFour: '4592',
    status: 'ativo',
    // Usando placeholders visuais ou SVGs simples
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Nubank_logo_2021.svg', 
  },
  {
    id: 2,
    name: 'Investimentos XP',
    institution: 'XP INVESTIMENTOS',
    balance: 85200.00,
    lastFour: '8821',
    status: 'ativo',
    logoUrl: 'https://logodownload.org/wp-content/uploads/2019/08/xp-investimentos-logo.png'
  },
  {
    id: 3,
    name: 'Cofre Viagem',
    institution: 'FINANSMART',
    balance: 2500.00,
    lastFour: '0001',
    status: 'pausado',
    logoUrl: '' 
  },
  {
    id: 4,
    name: 'BTG Corporate',
    institution: 'BTG PACTUAL',
    balance: 1540.30,
    lastFour: '9928',
    status: 'ativo',
    logoUrl: 'https://logodownload.org/wp-content/uploads/2019/10/btg-pactual-logo.png'
  }
];

const mockCards = [
  {
    id: 1,
    name: 'Cartão Ultra Black',
    institution: 'ITAÚ UNIBANCO',
    balance: -4520.12,
    limitAvailable: 10479.88,
    lastFour: '1022',
    status: 'ativo',
    logoUrl: 'https://logodownload.org/wp-content/uploads/2014/05/itau-logo.png'
  }
];

const Accounts = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex w-full h-full bg-white">
      {/* ========================================== */}
      {/* BLOCK 1: SIDEBAR (CATEGORIES)              */}
      {/* ========================================== */}
      <div className="w-[18rem] border-r border-gray-100 bg-[#fbfbfe] flex flex-col justify-between py-6">
        <div className="px-4">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Categories List */}
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Categorias
          </h3>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveCategory('todos')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${activeCategory === 'todos' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-4 h-4" />
                <span>Todos</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === 'todos' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>6</span>
            </button>
            
            <button 
              onClick={() => setActiveCategory('contas')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${activeCategory === 'contas' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4" />
                <span>Contas</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === 'contas' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>3</span>
            </button>

            <button 
              onClick={() => setActiveCategory('cartoes')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${activeCategory === 'cartoes' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Cartões</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === 'cartoes' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>2</span>
            </button>

            <button 
              onClick={() => setActiveCategory('investimentos')}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${activeCategory === 'investimentos' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Investimentos</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === 'investimentos' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>1</span>
            </button>
          </nav>
        </div>

        {/* Bottom Banner */}
        <div className="px-4">
          <div className="bg-blue-50/50 rounded-lg p-4 text-sm text-gray-600">
            <p className="mb-2 text-[13px] leading-relaxed">Mantenha seus saldos em dia conciliando suas contas semanalmente.</p>
            <a href="#" className="text-blue-600 font-medium hover:underline text-xs">Saber mais</a>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* BLOCK 2: MAIN CONTENT AREA                 */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* ========================================== */}
        {/* BLOCK 3: HEADER (TOTALS)                   */}
        {/* ========================================== */}
        <div className="flex flex-wrap items-center justify-between p-8 border-b border-gray-100 gap-6">
          <div className="flex flex-wrap gap-8 md:gap-16">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Disponível Total</p>
              <h2 className="text-[1.75rem] font-bold text-gray-900">R$ 102.730,90</h2>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total em Cartões</p>
              <h2 className="text-[1.75rem] font-bold text-red-500">R$ 4.520,12</h2>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Bloqueado</p>
              <h2 className="text-[1.75rem] font-bold text-orange-500">R$ 2.500,00</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
              Filtros Avançados
            </button>
            <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* BLOCK 4: ACTIONS BAR                       */}
        {/* ========================================== */}
        <div className="px-8 py-6 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-400 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-4 h-4" />
            <span className="text-sm text-gray-600 font-medium">Selecionar Tudo</span>
          </label>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3b6fff] text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" strokeWidth={3} />
            Adicionar Conta
          </button>
        </div>

        {/* ========================================== */}
        {/* BLOCK 5: ACCOUNTS AND INVESTMENTS SECTION  */}
        {/* ========================================== */}
        <div className="px-8 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Contas e Investimentos</h3>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockAccounts.map(account => (
              <div key={account.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full relative">
                {/* Checkbox Placeholder for the top-left (visible in the mock image if we observe closely) */}
                <div className="absolute top-6 right-6">
                   {/* Here we could put a checkbox for selection */}
                </div>
                
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                    {account.logoUrl ? (
                      <img src={account.logoUrl} alt={account.institution} className="w-full h-full object-contain p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    ) : (
                      <Wallet className="w-6 h-6 text-purple-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{account.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{account.institution}</p>
                  </div>
                </div>

                {/* Card Balance */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Saldo Atual</p>
                  <p className="text-xl font-extrabold text-gray-900">{formatCurrency(account.balance)}</p>
                </div>
                
                <div className="mt-auto">
                  <div className="h-px bg-gray-100 w-16 mb-4"></div>
                  {/* Card Footer */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-400 leading-none">••••</p>
                      <p className="text-xs font-bold text-gray-500 mt-1">{account.lastFour}</p>
                      <div className="text-[10px] text-gray-400 mt-2 leading-tight">
                        <p>Sinc.</p>
                        <p>Hoje</p>
                        <p>09:12</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${account.status === 'ativo' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-orange-50 text-orange-500 border border-orange-100'}`}>
                      {account.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* BLOCK 6: CREDIT CARDS SECTION              */}
        {/* ========================================== */}
        <div className="px-8 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Meus Cartões</h3>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <p className="text-xl font-extrabold text-red-500">{formatCurrency(card.balance)}</p>
                </div>

                {/* Card Limit */}
                <div className="mb-6 flex gap-4 items-center">
                  <div className="text-[10px] font-bold text-gray-500 leading-tight">
                    Limite<br/>Disponível
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

      </div>
    </div>
  );
};

export default Accounts;
