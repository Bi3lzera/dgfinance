import { useState } from 'react';
import ExtratoPage from '../../app/src/pages/extrato/page';
import ReceitasPage from '../../app/src/pages/receitas/page';
import HomePage from '../../app/src/pages/home/page';
import SideBar from './components/sideBar/SideBar';
import TopBar from './components/topBar/TopBar';
import LancamentosPage from '../../app/src/pages/lancamentos/page';

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
            case 'extrato':
                return <ExtratoPage mes={mes} ano={ano} />;
            case 'lancamento':
                return <LancamentosPage mes={mes} ano={ano} />;
            case 'receita':
                return <ReceitasPage />;
            default:
                return <HomePage />;
        }
    };

    const descPagina = () => {
        switch (paginaAtual) {
            case 'extrato':
                return "Extrato";
            case 'lancamento':
                return "Lançamento de Despesas e Receitas";
            case 'receita':
                return "Receitas";
            default:
                return "Página Inicial";
        }
    };

    return (
        <div className='w-full max-h-screen overflow-auto'>
            <header className="fixed w-full top-0 z-1000 bg-gray-700 text-white rounded-b-sm h-10">
                <TopBar
                    pageDescription={descPagina()}
                    mes={mes}
                    setMes={setMes}
                    ano={ano}
                    setAno={setAno}
                />
            </header>

            <main className='flex-grow mt-10 mb-20 rounded-md'>
                {renderizarPagina()}
            </main>

            <footer className='fixed flex-grow h-20 bottom-0 left-0 z-1000 w-full bg-blue-400 rounded-r-md justify-center border'>
                <SideBar mudarPagina={mudarPagina} />
            </footer>
        </div>
    );
};

export default App;