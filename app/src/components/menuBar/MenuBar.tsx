import SideBarButton from './MenuBarButton';
import LogoIcon from '../../../assets/logo.png';
import BilheteIcon from '../../../assets/bilhete.png';
import financa from '../../../assets/financa.png';
import dashboard from '../../../assets/dashboard.png';
import { useState } from 'react';
import SideBarOption from '../sideBarOption/SideBarOption'

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string) => void }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMudarPagina = (pagina: string) => {
    mudarPagina(pagina);
    setShowOptions(false);
  }

  return (
    <>
      <div className='flex flex-row gap-2 w-[12vw] h-[5vh] rounded-md justify-left items-center pt-9 pb-12 pl-2'>
        <img src={LogoIcon}></img>
      </div>

      <section className='pt-2 flex flex-col gap-2 justify-center items-center w-full'>
        <div onClick={() => handleMudarPagina('dashboard')}>
          <SideBarButton icon={dashboard} label="Dashboard" />
        </div>

        <div onClick={() => mudarPagina('lancamento')}>
          <div onClick={() => {
            if (showOptions) {
              setShowOptions(false);
            } else {
              setShowOptions(true);
            }
          }}>
            <SideBarButton icon={financa} label="Extrato" />
          </div>
        </div>

        <div onClick={() => mudarPagina('extrato')}>
          <SideBarButton icon={BilheteIcon} label="Contas e Bancos" />
        </div>

        <div onClick={() => mudarPagina('extrato')}>
          <SideBarButton icon={BilheteIcon} label="Cartões" />
        </div>
      </section>
    </>
  );
};

export default SideBar;