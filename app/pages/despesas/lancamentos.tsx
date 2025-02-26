import Tabela from './components/table'
import {useEffect, useState} from "react";
import {getDespesas} from "../pagesServices/despesa.ts";
import { IoMdAddCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import AddDespesa from './components/addDespesa'; // Importa o componente

export default function Lancamentos() {
    const [dados, setDados] = useState([]);
    const [mostrarAddDespesa, setMostrarAddDespesa] = useState(false); // Estado para alternar telas

    const handleClick = async () => {
        const response = await getDespesas();
        console.log(`Response: `, response);
        setDados(response);
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div>
            {mostrarAddDespesa ? (
                <AddDespesa voltar={() => setMostrarAddDespesa(false)} />
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <section className="w-[10vw]">
                            <p>Lançamentos</p>
                        </section>
                        <section className="w-[80vw] flex justify-end flex-row gap-2 mr-4 mb-1 items-center">
                            <IoMdAddCircle
                                className="text-3xl cursor-pointer"
                                onClick={() => setMostrarAddDespesa(true)}
                            />
                            <FaTrash className="text-2xl cursor-pointer"/>
                        </section>
                    </div>
                    <div>
                        <Tabela dados={dados}/>
                    </div>
                    <div className="flex justify-start items-center mt-4 gap-5">
                        <p>Total dos Lançamentos</p>
                        <p className="bg-gray-500 w-30 rounded-md">R$ 0,00</p>
                    </div>
                </>
            )}
        </div>
    )
}