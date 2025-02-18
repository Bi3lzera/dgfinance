import React, { useState, useEffect } from 'react';
import Tabela from './components/table';
import { AuthenticationService } from '../../services/auth/AuthService';
import { getDespesas } from '../pagesServices/despesa';

export default function ExtratoPage() {
  const [dados, setDados] = useState([]);

const handleClick = async () => {
  const response = await getDespesas();
  console.log(`Response: `, response);
  setDados(response);
};

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="tableContainer">
      <Tabela dados={dados} />
    </div>
  )
}