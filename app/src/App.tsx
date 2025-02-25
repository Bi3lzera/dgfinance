import { useState } from 'react';
import ExtratoPage from '../../app/pages/extrato/page';
import DespesasPage from '../../app/pages/despesas/page';
import ReceitasPage from '../../app/pages/receitas/page';
import HomePage from '../../app/pages/home/page';
import SideBar from '../../app/components/SideBar/SideBar';
import TopBar from '../../app/components/TopBar/TopBar';

const App = () => {
    // Estado para controlar a página atual
    const [paginaAtual, setPaginaAtual] = useState('HomePage');

    // Função para alterar a página
    const mudarPagina = (pagina: string) => {
        setPaginaAtual(pagina);
    };

    const renderizarPagina = () => {
        switch (paginaAtual) {
            case 'extrato':
                return <ExtratoPage />;
            case 'despesa':
                return <DespesasPage />;
            case 'receita':
                return <ReceitasPage />;
            default:
                return <HomePage />;
        }
    };

    const descPagina = () => {
        console.log("paginaAtual: " + paginaAtual);
        switch (paginaAtual) {
            case 'extrato':
                return "Extrato";
            case 'despesa':
                return "Lançamento de Despesas/Saídas";
            case 'receita':
                return "Receitas";
            default:
                return "Página Inicial";
        }
    };

    return (
        <div className='Base'>
            <div className="flex bg-gray-700 text-white rounded-b-sm h-10">
                <TopBar pageDescription={descPagina()}/>
            </div>
            <div className='flex gap-2 w-[99vw] h-[92vh] mt-2'>
                <section className='flex w-[4vw] bg-blue-400 rounded-r-md justify-center'>
                    <SideBar mudarPagina={mudarPagina} />
                </section>
                <section className='flex rounded-md w-[95vw]'>
                    {renderizarPagina()}
                </section>
            </div>
        </div>
    );
};

export default App;