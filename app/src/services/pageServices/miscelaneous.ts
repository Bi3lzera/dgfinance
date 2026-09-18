import axiosInstance from "../../../config/axiosConfig";
import * as type from "../../types/";

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
            idPaymentMethod: item.idPaymentMethod ?? item.idPayMethod,
            title: item.title ?? item.description,
            description: item.description ?? item.title,
        }
    });

    return paymentMethods;
}

export const getUserAccounts = async () => {
    const response = await axiosInstance.get(`/userAccounts/getAllUserAccounts`);

    const userAccounts = response.data.map((item: type.BankAccountModel) => {
        return {
            idAccount: item.idAccount,
            idUser: item.idUser,
            idBank: item.idBank,
            accountNumber: item.accountNumber,
            accountAlias: item.accountAlias,
            bankName: item.bankName,
        }
    });

    return userAccounts;
}

export const getBanks = async () => {
    const response = await axiosInstance.get(`/miscelaneous/bankList`);
    console.log(response.data);
    const banks = response.data.map((item: type.BankModel) => {
        return {
            idBank: item.idBank,
            name: item.name,
        }
    });

    return banks;
}

