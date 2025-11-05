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
        <>
            {mostrarAddLancamento ? (
                <AddLancamento voltar={() => setMostrarAddLancamento(false)} />
            ) : (<div className="rounded-md w-full h-full max-h-full p-1 flex-row justify-evenly grid grid-rows-2">
                <section className="w-full">
                    <LancamentosEfetivados mes={mes} ano={ano} />
                </section>
                <section className="w-full">
                    <LancamentosAgendados />
                </section>
                <section className="flex justify-end flex-row ">
                    <IoMdAddCircle
                        className="text-5xl cursor-pointer "
                        onClick={() => setMostrarAddLancamento(true)}
                    />
                </section>
            </div>)}
        </>

    );
}
