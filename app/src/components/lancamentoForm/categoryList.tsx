
export default function CategoryList() {
    return (
        <div className="flex justify-start rounded-md">
            <select isSearchable id="months" name="formaPagamentoList" className="text-center block rounded-md shadow-sm focus:bg-white-300 focus:outline-gray-300 focus:ring-indigo-900 focus:border-indigo-500">
                <option value="default">Categoria</option>
                <option value="restaurante">Restaurante</option>
                <option value="combustivel">Combustível</option>
                <option value="Outros">Outros</option>
            </select>
        </div>
    )
}