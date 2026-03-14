export default function BankList() {
    return (
        <div className="flex justify-start rounded-md">
            <select isSearchable id="months" name="bancoList" className="text-center block rounded-md shadow-sm focus:bg-white-300 focus:outline-gray-300 focus:ring-indigo-900 focus:border-indigo-500">
                <option value="default">Selecione um Banco</option>
                <option value="bb">Banco do Brasil</option>
                <option value="nubank">NuBank</option>
                <option value="sofisa">Sofisa</option>
            </select>
        </div>
    )
}