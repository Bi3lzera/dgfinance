import SideBarButton from './SideBarButton';
import HomeIcon from '../../assets/casa.png';
import DespesaIcon from '../../assets/recessao.png';
import CarteiraIcon from '../../assets/carteira.png';
import BilheteIcon from '../../assets/bilhete.png';

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string) => void }) => {
  return (
    <div className='SideBar'>
      <div>
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
      </div>
    </div>
  );
};

export default SideBar;