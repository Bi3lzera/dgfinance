import { useState } from 'react';
import SideBar from './components/menuBar/MenuBar';
import Dashboard from './pages/dashboard/dashboard';
import Extrato from './pages/extrato/extrato';

const App = () => {
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
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className='flex w-full min-h-screen bg-[#fbfbfe]'>
            <aside className='fixed h-full top-0 left-0 z-50 w-[13vw] bg-white border-r border-gray-200'>
                <SideBar mudarPagina={mudarPagina} />
            </aside>
            <main className='ml-[13vw] flex-1 w-[87vw]'>
                {renderizarPagina()}
            </main>
        </div>
    );
};

export default App;