import LancamentosEfetivados from './LancamentosEfetivados.tsx';
import LancamentosAgendados from './LancamentosAgendados.tsx';
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import AddLancamento from '../../components/lancamentoForm/lancamentoForm.tsx';
import '../../styles/createButtonStyle.css'

interface LancamentosPageProps {
    mes: string;
    ano: number;
}

export default function LancamentosPage({ mes, ano }: LancamentosPageProps) {
    const [mostrarAddLancamento, setMostrarAddLancamento] = useState(false);

    return (
        <>
            <div className="rounded-md w-full h-full max-h-full p-1 flex-row justify-evenly grid grid-rows-2">
                <section className="w-full">
                    <LancamentosEfetivados mes={mes} ano={ano} />
                </section>
                <section className="w-full">
                    <LancamentosAgendados />
                </section>
                <section className="absolute right-5 bottom-4 z-1001 justify-end flex-row ">
                    <button id="createButton" onClick={() => setMostrarAddLancamento(true)}>
                        <span>
                            <svg
                                height="24"
                                width="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                            </svg>
                            Criar Lançamento
                        </span>
                    </button>
                </section>
            </div>
            {mostrarAddLancamento && <AddLancamento voltar={() => setMostrarAddLancamento(false)} /> }
        </>

    );
}
