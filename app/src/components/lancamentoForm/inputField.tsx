import React, { useState } from "react";
import { formatarValorBRL } from "../../utils/formatacoes";

interface InputFieldProps {
    type: string;
    name: string;
    value?: string;
    currency?: boolean;
    required?: boolean;
    className?: string;
    defaultValue?: number | string;
}

export default function InputField({ type, name, value, currency, required, className, defaultValue }: InputFieldProps) {
    const [inputValue, setInputValue] = useState(value);
    const [isRequired] = useState(required || false);

    const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let tempValue = inputValue;

        if (!tempValue) return;
        tempValue = tempValue.replace('R$', '').replace(' ', '').replace(/\./g, '').replace(',', '.').trim();

        if (currency && tempValue != undefined && tempValue.match(/^\d+(\.\d{0,2})?$/)) {
            setInputValue(formatarValorBRL(Number(tempValue)));
        } else {
            setInputValue(e.target.value);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center relative w-full">
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder=""
                    className={`border-b border-gray-300 w-full py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit ${className}`}
                    value={inputValue}
                    required={isRequired}
                    onBlur={handleBlurChange}
                    onChange={handleChange}
                    defaultValue={defaultValue}
                />
                <label
                    htmlFor={name}
                    className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                >
                    {name}
                </label>
            </div>
        </div>
    );
}