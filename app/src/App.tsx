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
                return <LancamentosPage mes={mes} ano={ano}/>;
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
        <div className='Base'>
            <div className="flex bg-gray-700 text-white rounded-b-sm h-10">
                <TopBar
                    pageDescription={descPagina()}
                    mes={mes}
                    setMes={setMes}
                    ano={ano}
                    setAno={setAno}
                />
            </div>
            <div className='flex gap-2 w-[99vw] h-[92vh] mt-2'>
                <section className='flex w-[8vw] bg-blue-400 rounded-r-md justify-center'>
                    <SideBar mudarPagina={mudarPagina}/>
                </section>
                <section className='flex rounded-md w-[91.15vw]'>
                    {renderizarPagina()}
                </section>
            </div>
        </div>
    );
};

export default App;