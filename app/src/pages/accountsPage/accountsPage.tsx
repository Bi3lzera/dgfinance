import { useState } from 'react';
import NewAccountForm from '../forms/newAccountForm/NewAccountForm';
import Header from './components/header';
import UpperBarSection from './components/upperBarSection';
import AccountsSection from './components/accountsSection';
import DetailAccountPage from '../detailAccountPage/detailAccountPage';
import { useAccountsData, UserAccount } from './accounts';

const Accounts = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [isNewAccountFormOpen, setIsNewAccountFormOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<UserAccount | null>(null);
  const { accounts, isLoading, refetch } = useAccountsData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  if (selectedAccount) {
    return (
      <div className="flex w-full h-full bg-white">
        <DetailAccountPage account={selectedAccount} onBack={() => setSelectedAccount(null)} />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full bg-white">

      {/* ========================================== */}
      {/* BLOCK 2: MAIN CONTENT AREA                 */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* ========================================== */}
        {/* BLOCK 3: HEADER (TOTALS)                   */}
        {/* ========================================== */}
        <div className="animate-fade-in-down" style={{ animationDelay: '0ms' }}>
          <Header />
        </div>

        {/* ========================================== */}
        {/* BLOCK 4: ACTIONS BAR                       */}
        {/* ========================================== */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <UpperBarSection onAddAccount={() => setIsNewAccountFormOpen(true)} />
        </div>

        {/* ========================================== */}
        {/* BLOCK 5: ACCOUNTS AND INVESTMENTS SECTION  */}
        {/* ========================================== */}
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <AccountsSection accounts={accounts} isLoading={isLoading} onAccountDoubleClick={setSelectedAccount} />
        </div>
      </div>
      <NewAccountForm
        isOpen={isNewAccountFormOpen}
        onClose={() => {
          setIsNewAccountFormOpen(false);
          refetch();
        }}
      />
    </div>
  );
};

export default Accounts;
