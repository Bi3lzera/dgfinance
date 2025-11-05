import Tabela from './components/TableLancamentos.tsx'
import { useEffect, useState } from "react";
import { getLancamentos } from "../../services/pageServices/lancamentos.ts";
import { IoMdAddCircle } from "react-icons/io";
import AddLancamento from '../../components/lancamentoForm/lancamentoForm.tsx'; // Importa o componente

interface LancamentosPageProps {
    mes: string;
    ano: number;
}

export default function Lancamentos({ mes, ano }: LancamentosPageProps) {
    const [dados, setDados] = useState([]);
    const [mostrarAddLancamento, setMostrarAddLancamento] = useState(false); // Estado para alternar telas
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const response = await getLancamentos(mes, ano);
        console.log(`Response: `, response);
        setDados(response);
        setLoading(false);
    };

    useEffect(() => {
        console.log(`Ano: ${ano}, Mês: ${mes}`);
    }, [ano, mes]);

    useEffect(() => {
        handleClick();
    }, [mes, ano]);

    return (
        <div>
            {mostrarAddLancamento ? (
                <AddLancamento voltar={() => setMostrarAddLancamento(false)} atualizarDados={handleClick} />
            ) : (
                <>
                    <div className="flex justify-between items-center w-full">
                        <section className="w-full flex flex-row ml-4 mb-1 gap-10">
                            <div className='w-full grid grid-cols-2'>
                                <p>Lançamentos do mês</p>
                                <div className='grid grid-cols-2 gap w-150'>
                                    <p>Total dos Lançamentos</p>
                                    <p className="bg-gray-500 w-30 rounded-md">R$ 0,00</p>
                                </div>
                            </div>

                        </section>
                        <section className="w-10 flex justify-end flex-row gap-2 mr-4 mb-1 items-center">
                            <IoMdAddCircle
                                className="text-3xl cursor-pointer"
                                onClick={() => setMostrarAddLancamento(true)}
                            />
                        </section>
                    </div>
                    <div className='h-[36vh]'>
                        <Tabela loading={loading} dados={dados} onAlterar={function (id: string): void {
                            throw new Error('Function not implemented.');
                        }} />
                    </div>
                </>
            )}
        </div>
    )
}