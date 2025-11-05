import React from 'react';
import InputField from '../inputs/inputField';
import TextArea from '../inputs/textArea';

export default function DetailsForm({ voltar }: { voltar: () => void }) {
    return (
        <div id="container" className="bg-opacity-50 backdrop-blur-sm fixed inset-0 z-50 flex flex-col justify-center items-center">
            <div id="details-form" className="bg-white border w-150 h-120 rounded-md flex flex-col justify-evenly items-center pr-3 pl-3">
                <span>Detalhes da Transação</span>
                <section className='flex flex-row justify-evenly w-full gap-4'>
                    <span className='w-30'>
                        <InputField type="Date" name="Data da Compra" defaultValue="01/01/2024" required={true} className="" />
                    </span>
                    <span className='w-full'>
                        <InputField type="text" name="Descrição" required={true} className="" />
                    </span>
                </section>
                <section className='flex flex-col justify-evenly w-full -mt-6'>
                    <p>Descrição Detalhada</p>
                    <TextArea
                        id="detailedDescription"
                        name="Descrição Detalhada"
                        rows={3}
                        placeholder="Descrição Detalhada"
                        maxLength={250}>
                    </TextArea>
                </section>
                <section className='flex flex-row justify-evenly w-full gap-4'>
                    <InputField type="text" name="Valor Total" defaultValue="R$ 1.000,00" currency={true} required={true} />
                    <InputField type="text" name="Valor Pago" defaultValue="R$ 1.000,00" currency={true} required={true} />
                    <InputField type="text" name="Parcela" defaultValue="5" required={true} className="text-center" />
                    <InputField type="text" name="Parcelas Restantes" defaultValue="5 de 10" required={true} className="text-center" />
                </section>
                <section className='flex flex-row justify-between w-full gap-4'>
                    <span className='w-40'><InputField type="text" name="Banco" defaultValue="Banco do Brasil" required={true} /></span>
                    <span className='w-30'><InputField type="text" name="Conta Nº" defaultValue="N/A" required={true} disabled={true} /></span>
                    <span className='w-50'><InputField type="text" name="Forma de Pagamento" defaultValue="Cartão de Crédito" required={true} /></span>
                    <span className='w-50'><InputField type="date" name="Data do Pagamento" defaultValue="10/11/2025" required={true} /></span>
                </section>
                <button onClick={voltar} className="bg-blue-500 text-white px-4 py-2 rounded-md">Voltar</button>
            </div>
        </div>
    )
}