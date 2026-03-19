import { useState } from 'react';
import SideBar from './components/menuBar/MenuBar';
import Dashboard from './pages/dashboard/Dashboard';
import Extrato from './pages/extrato/Extrato';
import TopBar from './components/topBar/TopBar';

const getCurrentMonthValue = () => {
    const meses = [
        "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    return meses[new Date().getMonth()];
};

const getYear = () => new Date().getFullYear();

const App = () => {
    const [paginaAtual, setPaginaAtual] = useState('HomePage');
    const [mes, setMes] = useState(getCurrentMonthValue());
    const [ano, setAno] = useState(getYear());

    const mudarPagina = (pagina: string) => {
        setPaginaAtual(pagina);
    };

    const renderizarPagina = () => {
        switch (paginaAtual) {
            case 'dashboard':
                return <Dashboard />;
            case 'extrato':
                return <Extrato />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className='h-screen bg-[#fbfbfe] overflow-hidden'>
            <header className='ml-[13vw] w-[86vw] fixed z-1000'>
                <TopBar pageDescription={paginaAtual} mes={mes} setMes={setMes} ano={ano} setAno={setAno} />
            </header>
            <aside className='fixed h-full top-0 left-0 z-50 w-[13vw] bg-white border-r border-gray-200'>
                <SideBar mudarPagina={mudarPagina} />
            </aside>
            <main className='ml-[13vw] pt-16 w-[86vw] h-full overflow-hidden flex flex-col'>
                {renderizarPagina()}
            </main>
        </div>
    );
};

export default App;