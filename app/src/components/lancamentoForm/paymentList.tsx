export default function PaymentList() {
    return (
        <div className="flex justify-start rounded-md">
            <select isSearchable id="months" name="formaPagamentoList" className="text-center block rounded-md shadow-sm focus:bg-white-300 focus:outline-gray-300 focus:ring-indigo-900 focus:border-indigo-500">
                <option value="default">Forma de Pagamento</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cc">Cartão de Crédito</option>
                <option value="cd">Cartão de Débito</option>
            </select>
        </div>
    )
}