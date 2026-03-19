import SideBarButton from './components/MenuBarButton';
import LogoIcon from '../../assets/logo.png';
import dashboard from '../../assets/dashboard.png';
import bancos from '../../assets/bancos.png';
import cartoes from '../../assets/cartoes.png';
import investimentos from '../../assets/investimento.png';
import extrato from '../../assets/extrato.png';

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string) => void }) => {

  //Handling to change the page.
  const handleMudarPagina = (pagina: string) => {
    mudarPagina(pagina);
  }

  return (
    <>
      {/* Logo */}
      <div className='flex flex-row gap-2 w-[12vw] h-[5vh] rounded-md justify-left items-center pt-9 pb-12 pl-2'>
        <img src={LogoIcon}></img>
      </div>

      {/* Option List */}
      <section className='pt-2 flex flex-col gap-2 justify-center items-center w-full'>
        <div onClick={() => handleMudarPagina('dashboard')}>
          <SideBarButton icon={dashboard} label="Dashboard" />
        </div>

        <div onClick={() => mudarPagina('extrato')}>
          <SideBarButton icon={extrato} label="Extrato" />
        </div>

        <div onClick={() => mudarPagina('accountsAndBanks')}>
          <SideBarButton icon={bancos} label="Contas e Bancos" />
        </div>

        <div onClick={() => mudarPagina('cards')}>
          <SideBarButton icon={cartoes} label="Cartões" />
        </div>

        <div onClick={() => mudarPagina('invests')}>
          <SideBarButton icon={investimentos} label="Investimentos" />
        </div>
      </section>
    </>
  );
};

export default SideBar;