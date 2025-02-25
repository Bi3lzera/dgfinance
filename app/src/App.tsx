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
    const mudarPagina = (pagina) => {
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

    return (
        <div className='Base'>
            <div className='TopBar'>
                <TopBar />
            </div>
            <div className='SideBar'>
                <SideBar mudarPagina={mudarPagina} />
            </div>
            <div className='Main'>
                {renderizarPagina()}
            </div>
        </div>
    );
};

export default App;