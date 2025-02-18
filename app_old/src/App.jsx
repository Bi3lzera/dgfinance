import { useState } from 'react';
import ExtratoPage from '../../app/pages/extrato/page';
import DespesasPage from '../../app/pages/despesas/page';
import ReceitasPage from '../../app/pages/receitas/page';
import HomePage from '../../app/pages/home/page';
import SideBar from '../../app/components/SideBar/SideBar';

const App = () => {
  // Estado para controlar a página atual
  const [paginaAtual, setPaginaAtual] = useState('HomePage');

  // Função para alterar a página
  const mudarPagina = (pagina) => {
    setPaginaAtual(pagina);
  };

  // Renderiza a página com base no estado
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'extrato':
        return <ExtratoPage />;
      case 'despesa':
        return <DespesasPage />; 
      case 'receita':
        return <ReceitasPage />;
      default:
        return <HomePage />; // Página padrão
    }
  };

  return (
    <div className='Base'>
      <div className='TopBar'>
        <h1>TopBar</h1>
      </div>
      <div className='SideBar'>
        {/* Passa a função mudarPagina para o SideBar */}
        <SideBar mudarPagina={mudarPagina} />
      </div>
      <div className='Main'>
        {/* Renderiza a página atual */}
        {renderizarPagina()}
      </div>
    </div>
  );
};

export default App;