import React, { useState } from 'react'; 

type TopBarProps = {
    pageDescription: string;
    mes: string;
    setMes: (mes: string) => void;
    ano: number;
    setAno: (ano: number) => void;
};

const TopBar: React.FC<TopBarProps> = ({ pageDescription, mes, setMes, ano, setAno }) => {
    const YearTextBox = () => (
        <input
            type='number'
            value={ano}
            onChange={e => setAno(Number(e.target.value))}
            placeholder='20..'
            className="font-bold text-center text-2xl border border-gray-600 shadow-sm w-20 rounded-sm"
        />
    );

    const MonthTextBox = () => (
        <div className="flex justify-start rounded-md">
            <select
                id="months"
                name="months"
                value={mes}
                onChange={e => setMes(e.target.value)}
                className="text-center block rounded-md shadow-sm focus:bg-gray-500 focus:outline-none focus:ring-indigo-900 focus:border-indigo-500"
            >
                <option value="janeiro">Janeiro</option>
                <option value="fevereiro">Fevereiro</option>
                <option value="marco">Março</option>
                <option value="abril">Abril</option>
                <option value="maio">Maio</option>
                <option value="junho">Junho</option>
                <option value="julho">Julho</option>
                <option value="agosto">Agosto</option>
                <option value="setembro">Setembro</option>
                <option value="outubro">Outubro</option>
                <option value="novembro">Novembro</option>
                <option value="dezembro">Dezembro</option>
            </select>
        </div>
    );

    return (
        <div className='flex w-full items-center'>
            <section className='flex w-[50vw] items-center justify-start ml-2 gap-2'>
                <p className="flex font-arial font-bold text-md">Mês</p>
                <MonthTextBox />
            </section>
            <section className='flex w-[50vw] items-center justify-center'>
                <p>{pageDescription}</p>
            </section>
            <section className='flex gap-2 items-center justify-end w-[50vw] mr-2'>
                <p className="flex font-arial font-bold text-md">Ano</p>
                <YearTextBox />
            </section>
        </div>
    );
}

export default TopBar;