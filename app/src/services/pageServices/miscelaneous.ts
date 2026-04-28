import axiosInstance from "../../../config/axiosConfig";

export const getCategories = async () => {
    const response = await axiosInstance.get(`/categorias/index`);

    const categorias = response.data.map((item: any) => {
        return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
        }
    });

    return categorias;
}