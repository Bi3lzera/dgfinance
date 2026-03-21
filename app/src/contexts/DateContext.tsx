import { createContext, useState, useContext, ReactNode } from 'react';

// 1. Definimos o que o contexto vai compartilhar
interface DateContextData {
    mes: string;
    setMes: (mes: string) => void;
    ano: number;
    setAno: (ano: number) => void;
}

const getCurrentMonthValue = () => {
    const meses = [
        "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    return meses[new Date().getMonth()];
};

// 2. Criamos o contexto propriamente dito
export const DateContext = createContext<DateContextData>({} as DateContextData);

// 3. O Provider: O componente que envolve o App
export const DateProvider = ({ children }: { children: ReactNode }) => {
    const [mes, setMes] = useState(getCurrentMonthValue()); // Você pode usar sua lógica de data atual aqui
    const [ano, setAno] = useState(new Date().getFullYear());

    return (
        <DateContext.Provider value={{ mes, setMes, ano, setAno }}>
            {children}
        </DateContext.Provider>
    );
};

// 4. Hook customizado para facilitar o uso (Opcional, mas recomendado)
export const useDate = () => useContext(DateContext);

