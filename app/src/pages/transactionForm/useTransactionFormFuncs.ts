import { useState, useRef } from 'react';

export type TransactionType = 'receita' | 'despesa';

export function useTransactionFormFuncs() {
    const [tipo, setTipo] = useState<TransactionType>('despesa');
    const [title, setTitle] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [credor, setCredor] = useState('');
    const [parcelas, setParcelas] = useState('1');
    const [paymentRecurrencyMethod, setPaymentRecurrencyMethod] = useState('');
    const [notas, setNotas] = useState('');
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [idTransaction, setIdTransaction] = useState<number | null>(null);
    const [idInstallment, setIdInstallment] = useState<number | null>(null);
    const [idMovement, setIdMovement] = useState<number | null>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);


    const resetForm = () => {
        setTipo('despesa');
        setTitle('');
        setDescricao('');
        setValor('');
        setData(new Date().toISOString().split('T')[0]);
        setCategoria('');
        setConta('');
        setFormaPagamento('');
        setCredor('');
        setParcelas('1');
        setPaymentRecurrencyMethod('');
        setNotas('');
        setArquivo(null);
        setIdTransaction(null);
        setIdInstallment(null);
        setIdMovement(null);
    };

    return {
        resetForm,

        tipo,
        title,
        descricao,
        valor,
        data,
        categoria,
        conta,
        formaPagamento,
        credor,
        parcelas,
        paymentRecurrencyMethod,
        notas,
        arquivo,
        isDragging,
        idTransaction,
        idInstallment,
        idMovement,
        titleInputRef,

        setTipo,
        setTitle,
        setDescricao,
        setValor,
        setData,
        setCategoria,
        setConta,
        setFormaPagamento,
        setCredor,
        setParcelas,
        setPaymentRecurrencyMethod,
        setNotas,
        setArquivo,
        setIsDragging,
        setIdTransaction,
        setIdInstallment,
        setIdMovement,
    }
}