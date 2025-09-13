import SideBarButton from './SideBarButton';
import DespesaIcon from '../../../assets/recessao.png';
import CarteiraIcon from '../../../assets/carteira.png';

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string) => void }) => {
  return (
    <div className='justify-center items-center mt-1 justify-center bg-blue-400 rounded-r-md'>
      <section className='flex flex-col gap-2 justify-center items-center'>
        <div onClick={() => mudarPagina('despesa')}>
          <SideBarButton icon={DespesaIcon} label="Débitos" />
        </div>
        <div onClick={() => mudarPagina('receita')}>
          <SideBarButton icon={CarteiraIcon} label="Receitas" />
        </div>
      </section>
    </div>
  );
};

export default SideBar;