import LancamentosEfetivados from './LancamentosEfetivados.tsx';
import LancamentosAgendados from './LancamentosAgendados.tsx';
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import AddLancamento from '../../components/lancamentoForm/lancamentoForm.tsx';

interface LancamentosPageProps {
    mes: string;
    ano: number;
}

export default function LancamentosPage({ mes, ano }: LancamentosPageProps) {
    const [mostrarAddLancamento, setMostrarAddLancamento] = useState(false);

    return (
        <div className="rounded-md w-[95vw] h-[92vh]">
            <section className="h-[46vh]">
                <LancamentosEfetivados mes={mes} ano={ano}/>
            </section>
            <section className="h-[46vh]">
                <LancamentosAgendados />
            </section>
            <section className="flex justify-end flex-row -mt-8">
                <IoMdAddCircle className="text-5xl cursor-pointer " onClick={() => setMostrarAddLancamento(true)}
                />
            </section>
        </div>
    );
}
