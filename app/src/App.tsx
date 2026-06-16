import { useState } from 'react';
import SideBar from './components/menuBar/MenuBar';
import Dashboard from './pages/dashboard/Dashboard';
import Extrato from './pages/extrato/Extrato';
import Accounts from './accounts/accounts';
import TopBar from './components/topBar/TopBar';
import { AuthenticationService } from './services/authentication/authService';
import { Login } from './pages/authentication/login/login';
import { DateProvider } from './contexts/DateContext';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!AuthenticationService.getToken());
    const [paginaAtual, setPaginaAtual] = useState('HomePage');

    const mudarPagina = (pagina: string) => {
        setPaginaAtual(pagina);
    };

    const renderizarPagina = () => {
        switch (paginaAtual) {
            case 'dashboard':
                return <Dashboard />;
            case 'extrato':
                return <Extrato />;
            case 'accountsAndBanks':
                return <Accounts />;
            default:
                return <Dashboard />;
        }
    };

    if (!isAuthenticated) {
        return <Login setIsAuthenticated={setIsAuthenticated} />;
    }

    return (
        <DateProvider>
            <div className='h-screen bg-[#fbfbfe] overflow-hidden'>
                <header className='ml-[13vw] w-[86vw] fixed z-1000'>
                    <TopBar pageDescription={paginaAtual} />
                </header>
                <aside className='fixed h-full top-0 left-0 z-50 w-[13vw] bg-white border-r border-gray-200'>
                    <SideBar mudarPagina={mudarPagina} />
                </aside>
                <main className='ml-[13vw] pt-16 w-[86vw] h-full overflow-hidden flex flex-col'>
                    {renderizarPagina()}
                </main>
            </div>
        </DateProvider>
    );
};

export default App;