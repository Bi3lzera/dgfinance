import Tabela from './components/TableAgendados.tsx'
import {useEffect, useState} from "react";
import {getLancamentosAgendados} from "../../services/pageServices/lancamentos.ts";

export default function Lancamentos() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const response = await getLancamentosAgendados();
        console.log(`Response: `, response);
        setDados(response);
        setLoading(false);
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                <section className="w-[20vw]">
                    <p>Lançamentos Agendados</p>
                </section>
            </div>
            <div>
                <Tabela dados={dados} loading={loading} />
            </div>
            <div className="flex justify-start items-center mt-4 gap-5">
                <p>Total dos Lançamentos</p>
                <p className="bg-gray-500 w-30 rounded-md">R$ 0,00</p>
            </div>
        </div>
    )
}