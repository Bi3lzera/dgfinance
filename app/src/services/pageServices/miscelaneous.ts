import axiosInstance from "../../../config/axiosConfig";

export const getCategories = async () => {
    const response = await axiosInstance.get(`/categories/index`);

    const categories = response.data.map((item: any) => {
        return {
            idCategory: item.idCategory,
            title: item.title,
        }
    });

    return categories;
}

export const getPaymentMethods = async () => {
    const response = await axiosInstance.get(`/miscelaneous/paymentMethods`);

    const paymentMethods = response.data.map((item: any) => {
        return {
            idPaymentMethod: item.idPaymentMethod,
            title: item.title,
        }
    });

    return paymentMethods;
}

export const getUserBanks = async () => {
    const response = await axiosInstance.get(`/userbanks/index`);

    const userbanks = response.data.map((item: any) => {
        return {
            idAccount: item.idAccount,
            idUser: item.idUser,
            idBank: item.idBank,
            accountNumber: item.accountNumber,
            accountAlias: item.accountAlias,
            bankName: item.bankName,
        }
    });

    return userbanks;
}
