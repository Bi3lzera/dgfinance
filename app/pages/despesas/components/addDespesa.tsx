export default function AddDespesa({ voltar }: { voltar: () => void }) {
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

    return (
        <div className="add-despesa bg-opacity-50 backdrop-blur-sm border fixed inset-0 z-50 flex flex-col justify-center items-center">
            <h2 className="font-bold text-2xl">ADICIONAR DESPESA</h2>

            <div className="bg-white border w-250 h-50 gap-2 rounded-md flex flex-col justify-center items-center">
                <div className="flex flex-row gap-2">
                    <p>Descrição</p>
                    <input type="text" placeholder="Caixa com 12 cervejas..." className="border border-gray-600 rounded-md w-[] h-[3vh]"/>
                    <p>Valor</p>
                    <input type="text" placeholder="42,00" className="text-center border border-gray-600 rounded-md w-[5vw] h-[3vh]"/>
                    <p>Quantidade</p>
                    <input type="text" placeholder="10" className="text-center border border-gray-600 rounded-md w-[3vw] h-[3vh]"/>
                </div>
                <div className="flex flex-row gap-2">
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