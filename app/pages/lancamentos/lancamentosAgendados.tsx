import Tabela from './components/tableAgendados'
import {useEffect, useState} from "react";
import {getLancamentosAgendados} from "../../services/pageServices/lancamentos.ts";
import { IoMdAddCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";

export default function Lancamentos() {
    const [dados, setDados] = useState([]);

    const handleClick = async () => {
        const response = await getLancamentosAgendados();
        console.log(`Response: `, response);
        setDados(response);
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                <section className="w-[10vw]">
                    <p>Lançamentos Agendados</p>
                </section>
            </div>
            <div>
                <Tabela dados={dados}/>
            </div>
            <div className="flex justify-start items-center mt-4 gap-5">
                <p>Total dos Lançamentos</p>
                <p className="bg-gray-500 w-30 rounded-md">R$ 0,00</p>
            </div>
        </div>
    )
}