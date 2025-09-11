import { useState, useEffect } from 'react';
import Tabela from './components/table';
import { getLancamentos } from '../../services/pageServices/lancamentos';

interface ExtratoPageProps {
  mes: string;
  ano: number;
}

export default function ExtratoPage({ mes, ano }: ExtratoPageProps) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    console.log(`Ano: ${ano}, Mês: ${mes}`);
  }, [ano, mes]);

  const handleClick = async () => {
    const response = await getLancamentos(mes, ano); 
    console.log(`Response: `, response);
    setDados(response);
  };

  useEffect(() => {
    handleClick();
  }, [mes, ano]); 

  return (
    <div className="tableContainer">
      <Tabela dados={dados} />
    </div>
  )
}