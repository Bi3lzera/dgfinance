import SideBarButton from './SideBarButton';
import HomeIcon from '../../../assets/casa.png';
import BilheteIcon from '../../../assets/bilhete.png';
import financa from '../../../assets/financa.png';
import { useState } from 'react';
import SideBarOption from '../sideBarOption/SideBarOption'

const SideBar = ({ mudarPagina }: { mudarPagina: (pagina: string) => void }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMudarPagina = (pagina: string) => {
    mudarPagina(pagina);
    setShowOptions(false);
  }

  return (
    <div className='justify-center items-center mt-1 flex flex-row'>
      <section className='flex flex-row gap-2 justify-center items-center'>
        <div onClick={() => mudarPagina('home')}>
          <SideBarButton icon={HomeIcon} label="Home" />
        </div>

        <div onClick={() => mudarPagina('lancamento')}>
          <div onClick={() => {
            if (showOptions) {
              setShowOptions(false);
            } else {
              setShowOptions(true);
            }
          }}>
            <SideBarButton icon={financa} label="Lançamentos" />
          </div>
        </div>
        <div onClick={() => mudarPagina('extrato')}>
          <SideBarButton icon={BilheteIcon} label="Extrato" />
        </div>
      </section>
    </div>
  );
};

export default SideBar;