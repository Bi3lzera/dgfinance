import BancoLista from "../lancamentoForm/bankList";
import CategoriaLista from "../lancamentoForm/categoryList";
import FormaPagamentoLista from "../lancamentoForm/paymentList";
import InputField from "../lancamentoForm/inputField";
import "./styles/lancamentoFormStyle.css";
import { Lancamento } from "../../types/lancamentoModel";

import { createLancamento } from "../../services/pageServices/lancamentos";

export default function AddLancamento({ voltar, atualizarDados }: { voltar: () => void, atualizarDados: () => void }) {
    const todayDate = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const lancamentoData = {
            idUser: 2, 
            valor: parseFloat(formData.get("Valor Total")?.toString().replace('R$', '').replace(' ', '').replace(/\./g, '').replace(',', '.').trim() as string),
            totalParcelas: parseInt(formData.get("Parcelas") as string, 10),
            data: formData.get("Data") as string,
            descricao: formData.get("Breve Descrição") as string,
            tipo: 'C', 
            agendado: 'N',
            idFormaPagamento: 1,
            idBanco: 1
        } as Lancamento;

        createLancamento(lancamentoData, atualizarDados);
        voltar();
    };

    return (
        <div className="add-despesa bg-opacity-50 backdrop-blur-sm border fixed inset-0 z-50 flex flex-col justify-center items-center">
            <h2 className="font-bold text-2xl">REGISTRAR LANÇAMENTO</h2>

            <form onSubmit={handleSubmit} className="bg-white border w-150 h-120 rounded-md flex flex-col justify-evenly items-center">
                <label htmlFor="dados-transacao-container" className="text-md font-medium text-black w-[80%] justify-center flex">DADOS DA TRANSAÇÃO</label>
                <div id="dados-transacao-container" className="flex flex-col gap-4 w-full mx-h-60 px-15">
                    <section className="flex-row flex justify-center gap-10 w-full">
                        <InputField
                            type="text"
                            name="Valor Total"
                            currency={true}
                            required={true}
                            className="!w-30"
                            defaultValue="R$ 0,00"
                        />
                        <InputField
                            type="text"
                            name="Parcelas"
                            value="1"
                            required={true}
                            className="text-center !w-15"
                        />
                        <InputField
                            type="date"
                            name="Data"
                            value={todayDate}
                            required={true}
                        />
                    </section>
                    <section className="flex-row flex justify-center gap-10 w-full">
                        <InputField
                            type="text"
                            name="Breve Descrição"
                            required={true}
                        />
                    </section>
                    <section>
                        <label htmlFor="textarea" className="block text-sm font-small text-black"> Descrição Detalhada </label>
                        <textarea id="textarea" name="textarea" maxLength={250} className="border border-gray-300 w-full max-w-full max-h-25 min-h-25 h-24 p-2 rounded-md"></textarea>
                    </section>
                </div>
                <label htmlFor="dados-transacao-container" className="text-md font-medium text-black w-[80%] justify-center flex">DADOS COMPLEMENTARES</label>
                <div className="flex flex-row gap-3">
                    <CategoriaLista />
                    <FormaPagamentoLista />
                    <BancoLista />
                </div>
                <div className="flex flex-row gap-2 mt-4 justify-end w-full mr-5">
                    <button onClick={voltar} className="bg-red-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Salvar
                    </button>
                </div>
                <div className="flex flex-row gap-2">
                    <span>RECORRÊNCIA</span>  <input type="checkbox" />
                    <span>Working in Progress...</span>
                </div>
            </form>
        </div>
    );
}