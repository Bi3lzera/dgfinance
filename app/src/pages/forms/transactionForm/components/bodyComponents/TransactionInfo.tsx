import {
    Calendar, Tag, FileText, User
} from 'lucide-react';


interface TransactionInfoProps {
    title: string;
    setTitle: (title: string) => void;
    valor: string;
    handleValorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: string;
    setData: (data: string) => void;
    categoria: string;
    setCategoria: (categoria: string) => void;
    categorias: { idCategory: string; title: string }[];
    credor: string;
    setCredor: (credor: string) => void;
    tipo: 'receita' | 'despesa';
    titleInputRef?: React.RefObject<HTMLInputElement> | React.MutableRefObject<HTMLInputElement | null>;
}

const transactionInfo = ({
    title,
    setTitle,
    valor,
    handleValorChange,
    data,
    setData,
    categoria,
    setCategoria,
    categorias,
    credor,
    setCredor,
    tipo,
    titleInputRef
}: TransactionInfoProps) => {

    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <FileText size={13} className="text-blue-500" strokeWidth={2.5} />
                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Informações Básicas</span>
            </div>
            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4 flex flex-col gap-4">
                {/* Descrição + Valor */}
                <div className="grid grid-cols-[1fr_180px] gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Breve Descrição</label>
                        <input
                            ref={titleInputRef}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Ex: Manutenção Mensal do Servidor AWS"
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Valor (R$)</label>
                        <input
                            value={valor ? `R$ ${valor}` : ''}
                            onChange={handleValorChange}
                            placeholder="R$ 0,00"
                            className={`w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition ${tipo === 'despesa' ? 'text-red-500' : 'text-emerald-600'}`}
                        />
                    </div>
                </div>

                {/* Data + Categoria + Conta */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Data</label>
                        <div className="relative">
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={data}
                                onChange={e => setData(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Categoria</label>
                        <div className="relative">
                            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={categoria}
                                onChange={e => setCategoria(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            >
                                <option value="">Selecionar...</option>
                                {categorias.map(c => <option key={c.idCategory} value={c.idCategory}>{c.title}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Credor</label>
                        <div className="relative">
                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={credor}
                                onChange={e => setCredor(e.target.value)}
                                placeholder="Nome do credor"
                                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default transactionInfo;