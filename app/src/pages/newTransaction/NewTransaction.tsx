import React, { useState, useEffect, useRef } from 'react';
import {
    X, Check, RefreshCw, Calendar, Tag, Building2,
    CreditCard, Hash, FileText, Upload,
    Copy, Clock, Archive, HelpCircle, Save
} from 'lucide-react';
import { getCategories } from '../../services/pageServices/miscelaneous';
import { CategoryModel } from '../../types/miscelaneousModels';
import { createCompleteTransactionApi } from '../../services/pageServices/transactionActions';
import { Lancamento } from '../../types/lancamentoModel';

type TransactionType = 'receita' | 'despesa';

interface NewTransactionProps {
    isOpen: boolean;
    onClose: () => void;
}

const contas = [
    'Nubank Platinum', 'Nubank Business', 'Itaú Personalité',
    'XP Investimentos', 'Mercado Pago', 'Inter', 'Carteira'
];

const formasPagamento = [
    'Cartão de Crédito', 'Cartão de Débito', 'Pix', 'TED/DOC', 'Dinheiro', 'Boleto'
];

const NewTransaction: React.FC<NewTransactionProps> = ({ isOpen, onClose }) => {
    const [tipo, setTipo] = useState<TransactionType>('despesa');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toISOString().split('T')[0]);
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [parcelas, setParcelas] = useState('1/1');
    const [repetir, setRepetir] = useState(false);
    const [agendado, setAgendado] = useState(false);
    const [notas, setNotas] = useState('');
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [categorias, setCategorias] = useState<CategoryModel[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Format valor as currency on blur
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d,]/g, '');
        setValor(raw);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setArquivo(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setArquivo(file);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await getCategories();
                setCategorias(response);
            } catch (error) {
                console.error("Erro ao carregar categorias: ", error);
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // save handler
            }
        };
        if (isOpen) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!data) return;
        // Adjust for local timezone by creating a date at local midnight
        const now = new Date();
        const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        if (data > today) {
            setAgendado(true);
        } else {
            setAgendado(false);
        }
    }, [data]);

    const resetForm = () => {
        setTipo('despesa');
        setDescricao('');
        setValor('');
        setData(new Date().toISOString().split('T')[0]);
        setCategoria('');
        setConta('');
        setFormaPagamento('');
        setParcelas('1/1');
        setRepetir(false);
        setAgendado(false);
        setNotas('');
        setArquivo(null);
    };

    const buildLancamentoPayload = () => {
        const parsedValor = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
        return {
            title: descricao,
            description: notas || descricao,
            initialValue: parsedValor,
            type: tipo === 'receita' ? 'Credito' : 'Debito',
            totalPaymentCount: parseInt(parcelas.split('/')[0]) || 1,
            idCategory: parseInt(categoria) || 1,
            date: data,
            plannedDate: data,
            expectedValue: parsedValor,
            installmentNumber: 1,
            status: agendado ? 'Pendente' : 'Efetivado',
            transactionDescription: descricao,
            value: parsedValor,
            idBankAccount: 1, // Fallback
            idPaymentMethod: 1, // Fallback
            idPaymentCard: null
        };
    };

    const handleSaveAndNew = async () => {
        if (!descricao || !valor) {
            alert('Preencha a descrição e o valor.');
            return;
        }
        const payload = buildLancamentoPayload();
        await createCompleteTransactionApi(payload, () => {
            resetForm();
        });
    };

    const handleSaveAndClose = async () => {
        if (!descricao || !valor) {
            alert('Preencha a descrição e o valor.');
            return;
        }
        const payload = buildLancamentoPayload();
        await createCompleteTransactionApi(payload, () => {
            resetForm();
            onClose();
        });
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.15s ease' }}
        >
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .modal-slide { animation: slideUp 0.2s ease; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="modal-slide flex gap-4 w-full max-w-[900px] max-h-[92vh] px-4">
                {/* ── Main Form ── */}
                <div className="flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden min-w-0">
                    {/* Header */}
                    <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-gray-100">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Novo Lançamento</h1>
                                <p className="text-xs text-gray-400 mt-0.5">Preencha os dados abaixo para registrar sua transação.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Type Toggle */}
                                <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-gray-100">
                                    <button
                                        onClick={() => setTipo('receita')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${tipo === 'receita'
                                            ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                                            : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <span className="text-base">⊕</span> Receita
                                    </button>
                                    <button
                                        onClick={() => setTipo('despesa')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${tipo === 'despesa'
                                            ? 'bg-[#f05a28] text-white shadow-sm'
                                            : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <span className="text-base">⊖</span> Despesa
                                    </button>
                                </div>
                                <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                    <X size={18} strokeWidth={2} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Body — scrollable */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 flex flex-col gap-5">
                        {/* ── Seção: Informações Básicas ── */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={13} className="text-blue-500" strokeWidth={2.5} />
                                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Informações Básicas</span>
                            </div>
                            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4 flex flex-col gap-4">
                                {/* Descrição + Valor */}
                                <div className="grid grid-cols-[1fr_180px] gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Descrição</label>
                                        <input
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)}
                                            placeholder="Ex: Manutenção Mensal do Servidor AWS"
                                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Valor (R$)</label>
                                        <input
                                            value={valor}
                                            onChange={handleValorChange}
                                            placeholder="0,00"
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
                                                {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Conta / Banco</label>
                                        <div className="relative">
                                            <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={conta}
                                                onChange={e => setConta(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                            >
                                                <option value="">Selecionar...</option>
                                                {contas.map(c => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── Seção: Detalhes de Pagamento ── */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <CreditCard size={13} className="text-blue-500" strokeWidth={2.5} />
                                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Detalhes de Pagamento</span>
                            </div>
                            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4 flex flex-col gap-4">
                                <div className="grid grid-cols-[1.3fr_100px_1.2fr_1.2fr] gap-4 items-end">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Forma de Pagamento</label>
                                        <div className="relative">
                                            <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={formaPagamento}
                                                onChange={e => setFormaPagamento(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                            >
                                                <option value="">Selecionar...</option>
                                                {formasPagamento.map(f => <option key={f}>{f}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Parcelas</label>
                                        <div className="relative">
                                            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={parcelas}
                                                onChange={e => setParcelas(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                            >
                                                {Array.from({ length: 12 }, (_, i) => `${i + 1}/${i + 1}`).map(p => <option key={p}>{p}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    {/* Repetir toggle */}
                                    <button
                                        onClick={() => setRepetir(r => !r)}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition text-sm font-semibold text-left ${repetir
                                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                    >
                                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${repetir ? 'bg-blue-600' : 'bg-white border-2 border-gray-300'}`}>
                                            {repetir && <Check size={10} strokeWidth={3} className="text-white" />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold leading-tight">Repetir Mensalmente</div>
                                            <div className="text-[10px] font-medium text-gray-400 leading-tight">Agendar lançamento fixo</div>
                                        </div>
                                    </button>

                                    {/* Agendado toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setAgendado(a => !a)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition text-sm font-semibold text-left ${agendado
                                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                    >
                                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${agendado ? 'bg-amber-600' : 'bg-white border-2 border-gray-300'}`}>
                                            {agendado && <Check size={10} strokeWidth={3} className="text-white" />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold leading-tight">Agendado</div>
                                            <div className="text-[10px] font-medium text-gray-400 leading-tight">Transação futura</div>
                                        </div>
                                    </button>
                                </div>

                                {/* Configurações de Recorrência */}
                                {repetir && (
                                    <div className="flex items-center justify-between bg-blue-50/70 border border-blue-100 rounded-xl px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <RefreshCw size={16} className="text-blue-500" strokeWidth={2} />
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">Configurações de Recorrência</p>
                                                <p className="text-[11px] text-gray-500">Este lançamento será criado automaticamente todo mês.</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition whitespace-nowrap">
                                            Alterar Regra
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* ── Seção: Anotações e Comprovantes ── */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={13} className="text-blue-500" strokeWidth={2.5} />
                                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Anotações e Comprovantes</span>
                            </div>
                            <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Notas Internas</label>
                                        <textarea
                                            value={notas}
                                            onChange={e => setNotas(e.target.value)}
                                            placeholder="Pagamento referente ao ciclo de processamento..."
                                            rows={4}
                                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition resize-none"
                                        />
                                    </div>
                                    {/* File upload */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Comprovante (Imagem ou PDF)</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                                            onDragLeave={() => setIsDragging(false)}
                                            onDrop={handleDrop}
                                            className={`flex-1 flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-xl cursor-pointer transition min-h-[100px] ${isDragging
                                                ? 'border-blue-400 bg-blue-50'
                                                : arquivo
                                                    ? 'border-emerald-300 bg-emerald-50'
                                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'}`}
                                        >
                                            {arquivo ? (
                                                <>
                                                    <Check size={20} className="text-emerald-500" />
                                                    <span className="text-xs font-semibold text-emerald-600 text-center px-2 truncate max-w-full">{arquivo.name}</span>
                                                    <span className="text-[10px] text-gray-400">Clique para substituir</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={20} className="text-gray-400" />
                                                    <span className="text-xs text-gray-500">Arraste um arquivo ou <span className="text-blue-600 font-semibold">clique para buscar</span></span>
                                                    <span className="text-[10px] text-gray-400">Limite de 10MB • PNG, JPG ou PDF</span>
                                                </>
                                            )}
                                        </div>
                                        <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={handleFileInput} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 px-6 py-3 border-t border-gray-100 bg-white flex items-center justify-between">
                        <button onClick={onClose} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition px-3 py-2 rounded-xl hover:bg-gray-100">
                            <X size={14} strokeWidth={2.5} />
                            Cancelar Edição
                        </button>
                        <div className="flex items-center gap-3">
                            <button onClick={handleSaveAndNew} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
                                Salvar e Novo
                            </button>
                            <button onClick={handleSaveAndClose} className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#3f64f7] hover:bg-[#3251c8] rounded-xl transition shadow-md shadow-blue-500/20">
                                <Check size={15} strokeWidth={3} />
                                Salvar Lançamento
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Painel Lateral: Ações Rápidas ── */}
                <div className="w-[220px] flex-shrink-0 flex flex-col gap-3">
                    {/* Ações Rápidas */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Ações Rápidas</span>
                        </div>
                        <div className="flex flex-col divide-y divide-gray-50">
                            {[
                                { icon: Save, label: 'Salvar Rascunho', desc: 'Mantém as alterações sem finalizar.' },
                                { icon: Copy, label: 'Duplicar', desc: 'Cria uma cópia idêntica deste lançamento.' },
                                { icon: Clock, label: 'Ver Histórico', desc: 'Veja quem e quando alterou este item.' },
                                { icon: Archive, label: 'Arquivar', desc: 'Oculta dos relatórios sem deletar.' },
                            ].map(({ icon: Icon, label, desc }) => (
                                <button key={label} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition text-left w-full">
                                    <Icon size={15} className="text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 leading-tight">{label}</p>
                                        <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ajuda Contextual */}
                    <div className="bg-blue-50/80 rounded-2xl border border-blue-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <HelpCircle size={14} className="text-blue-500" strokeWidth={2.5} />
                            <span className="text-sm font-bold text-gray-800">Ajuda Contextual</span>
                        </div>
                        <p className="text-[12px] text-gray-600 leading-relaxed">
                            Lançamentos marcados como <strong>Repetir</strong> aparecem na aba "Agendados" até a data de confirmação.
                        </p>
                        <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 mt-2 transition">
                            Saiba mais sobre recorrência
                        </button>
                    </div>

                    {/* Atalhos */}
                    <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
                        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2 text-center">Atalhos do Teclado</p>
                        <div className="flex items-center justify-center gap-1">
                            <kbd className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md border border-gray-200">CTRL</kbd>
                            <span className="text-gray-400 text-xs font-bold">+</span>
                            <kbd className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md border border-gray-200">S</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTransaction;
