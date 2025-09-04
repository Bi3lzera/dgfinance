export default function AddLancamento({ voltar }: { voltar: () => void }) {
    const BancoLista = () => {
        return (
            <div className="flex justify-start rounded-md">
                <select isSearchable id="months" name="bancoList" className="text-center block rounded-md shadow-sm focus:bg-white-300 focus:outline-gray-300 focus:ring-indigo-900 focus:border-indigo-500">
                    <option value="bb">Banco do Brasil</option>
                    <option value="nubank">NuBank</option>
                    <option value="sofisa">Sofisa</option>
                </select>
            </div>
        )
    };

    const FormaPagamentoLista = () => {
        return (
            <div className="flex justify-start rounded-md">
                <select isSearchable id="months" name="formaPagamentoList" className="text-center block rounded-md shadow-sm focus:bg-white-300 focus:outline-gray-300 focus:ring-indigo-900 focus:border-indigo-500">
                    <option value="dinheiro">Dinheiro</option>
                    <option value="cc">Cartão de Crédito</option>
                    <option value="cd">Cartão de Débito</option>
                </select>
            </div>
        )
    };

    const CategoriaLista = () => {
        return (
            <div className="flex justify-start rounded-md">
                <select isSearchable id="months" name="formaPagamentoList" className="text-center block rounded-md shadow-sm focus:bg-white-300 focus:outline-gray-300 focus:ring-indigo-900 focus:border-indigo-500">
                    <option value="restaurante">Restaurante</option>
                    <option value="combustivel">Combustível</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
        )
    };

    return (
        <div className="add-despesa bg-opacity-50 backdrop-blur-sm border fixed inset-0 z-50 flex flex-col justify-center items-center">
            <h2 className="font-bold text-2xl">REGISTRAR LANÇAMENTO</h2>

            <div className="bg-white border w-250 h-120 gap-2 rounded-md flex flex-col justify-center items-center">
                <div className="flex flex-col gap-3">
                    <p>Descrição</p>
                    <input type="text" placeholder="Caixa com 12 cervejas..." className="border-b-1 border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 w-[50vh] h-[3vh]"/>
                    <section className="flex-row flex">
                        <p>Quantidade</p>
                        <input type="text" placeholder="10" className="border-b-1 border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200   text-center w-[3vw] h-[3vh]"/>
                        <p>Valor</p>
                        <input type="text" placeholder="42,00" className="border-b-1 border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-200 text-center w-[5vw] h-[3vh]"/>
                    </section>
                </div>
                <div className="flex flex-row gap-3">
                    <p>Categoria</p>
                    <CategoriaLista />
                    <p>Forma de Pagamento</p>
                    <FormaPagamentoLista />
                    <p>Banco</p>
                    <BancoLista />
                </div>
                <div className="flex flex-row gap-2 mt-4 justify-end w-full mr-5">
                    <button onClick={voltar} className="bg-red-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}