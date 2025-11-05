import SideBarButton from './SideBarButton';
import DespesaIcon from '../../../assets/recessao.png';
import CarteiraIcon from '../../../assets/carteira.png';

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string, close: string) => void }) => {
  const handleClick = (pagina: string) => {
    mudarPagina(pagina);
    close();
  }

  return (
    <div className='justify-center items-center mt-1 rounded-r-md'>
      <section className='flex flex-col gap-2 justify-center items-center'>
        <div onClick={() => handleClick('despesa')}>
          <SideBarButton icon={DespesaIcon} label="Débitos" />
        </div>
        <div onClick={() => handleClick('receita')}>
          <SideBarButton icon={CarteiraIcon} label="Receitas" />
        </div>
      </section>
    </div>
  );
};

export default SideBar;