import Tabela from './components/TableAgendados.tsx'
import { useEffect, useState } from "react";
import { getLancamentosAgendados } from "../../services/pageServices/lancamentos.ts";

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
            <div className="flex flex-col justify-between items-center">
                <section className="w-full grid grid-cols-2 mt-2 mb-2">
                    <div>
                        <p>Lançamentos Agendados</p>
                    </div>
                    <div className="flex justify-start items-center gap-5">
                        <p>Total dos Lançamentos</p>
                        <p className="bg-gray-500 w-30 rounded-md">R$ 0,00</p>
                    </div>
                </section>
            </div>
            <div>
                <Tabela dados={dados} loading={loading} />
            </div>

        </div>
    )
}