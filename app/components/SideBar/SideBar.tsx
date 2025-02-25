import SideBarButton from './SideBarButton';
import HomeIcon from '../../assets/casa.png';
import DespesaIcon from '../../assets/recessao.png';
import CarteiraIcon from '../../assets/carteira.png';
import BilheteIcon from '../../assets/bilhete.png';

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string) => void }) => {
  return (
    <div className='justify-center items-center mt-1 justify-center'>
      <section className='flex flex-col gap-2 justify-center items-center'>
        <div onClick={() => mudarPagina('home')}>
          <SideBarButton icon={HomeIcon} label="Home" />
        </div>

        <div onClick={() => mudarPagina('despesa')}>
          <SideBarButton icon={DespesaIcon} label="Despesa" />
        </div>

        <div onClick={() => mudarPagina('receita')}>
          <SideBarButton icon={CarteiraIcon} label="Receitas" />
        </div>

        <div onClick={() => mudarPagina('extrato')}>
          <SideBarButton icon={BilheteIcon} label="Extrato" />
        </div>
      </section>
    </div>
  );
};

export default SideBar;