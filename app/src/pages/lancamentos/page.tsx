import Lancamentos from './lancamentos';
import LancamentosAgendados from './lancamentosAgendados';
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import AddLancamento from './components/addLancamento.tsx';

interface LancamentosPageProps {
    mes: string;
    ano: number;
}

export default function LancamentosPage({ mes, ano }: LancamentosPageProps) {
    const [mostrarAddLancamento, setMostrarAddLancamento] = useState(false);

    return (
        <div className="rounded-md w-[95vw] h-[92vh]">
            <section className="h-[46vh]">
                <Lancamentos mes={mes} ano={ano}/>
            </section>
            <section className="h-[46vh]">
                <LancamentosAgendados />
            </section>
            <section className="flex justify-end flex-row -mt-8">
                <IoMdAddCircle
                    className="text-5xl cursor-pointer "
                    onClick={() => setMostrarAddLancamento(true)}
                />
            </section>

        </div>
    );
}
