import { useState, useEffect } from 'react';
import TabelaExtrato from './components/table';
import { getLancamentos } from '../../services/pageServices/lancamentos';

interface ExtratoPageProps {
  mes: string;
  ano: number;
}

export default function ExtratoPage({ mes, ano }: ExtratoPageProps) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(`Ano: ${ano}, Mês: ${mes}`);
  }, [ano, mes]);

  const handleClick = async () => {
    setLoading(true);
    const response = await getLancamentos(mes, ano); 
    console.log(`Response: `, response);
    setDados(response);
    setLoading(false);
  };

  useEffect(() => {
    handleClick();
  }, [mes, ano]); 

  return (
    <div className="tableContainer">
      <TabelaExtrato dados={dados} loading={loading}/>
    </div>
  )
}