import { useState, useCallback } from 'react';
import { CreditCard, SlidersHorizontal, Shield, Bell, Trash2, Save, AlertCircle, Eye, EyeOff, Lock, Unlock, Smartphone, Globe } from 'lucide-react';
import type { CardDetail } from '../detailCardActions';

interface CardSettingsTabProps {
    card: CardDetail;
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
interface ToggleProps { checked: boolean; onChange: () => void; }
const Toggle = ({ checked, onChange }: ToggleProps) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
        role="switch"
        aria-checked={checked}
    >
        <span className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-2.5 mb-5">
        <span className="text-purple-600">{icon}</span>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
    </div>
);

// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, prefix, readOnly }: { label: string; value: string; onChange?: (v: string) => void; prefix?: string; readOnly?: boolean }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <div className={`flex items-center border rounded-xl bg-white transition-all ${readOnly ? 'border-gray-100 bg-gray-50' : 'border-gray-200 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent'}`}>
            {prefix && <span className="pl-4 pr-1 text-sm font-semibold text-gray-400 select-none">{prefix}</span>}
            <input
                type="text"
                value={value}
                readOnly={readOnly}
                onChange={(e) => onChange?.(e.target.value)}
                className={`flex-1 px-4 py-3 text-sm font-semibold bg-transparent focus:outline-none rounded-xl ${readOnly ? 'text-gray-500 cursor-default' : 'text-gray-900'}`}
            />
        </div>
    </div>
);

// ─── Toggle Row ───────────────────────────────────────────────────────────────
const ToggleRow = ({ label, description, checked, onChange, icon }: { label: string; description: string; checked: boolean; onChange: () => void; icon?: React.ReactNode }) => (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
        <div className="flex items-start gap-3">
            {icon && <span className="text-gray-400 mt-0.5">{icon}</span>}
            <div>
                <p className="text-sm font-bold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
        </div>
        <Toggle checked={checked} onChange={onChange} />
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const CardSettingsTab = ({ card }: CardSettingsTabProps) => {
    const [isDirty, setIsDirty] = useState(false);

    // Card details
    const [cardAlias, setCardAlias] = useState(card.name);
    const [limitAmount, setLimitAmount] = useState(String(card.totalLimit.toFixed(2)).replace('.', ','));

    // Security
    const [isBlocked, setIsBlocked] = useState(card.status === 'Bloqueado');
    const [onlinePurchases, setOnlinePurchases] = useState(true);
    const [internationalPurchases, setInternationalPurchases] = useState(false);
    const [contactless, setContactless] = useState(true);
    const [showBalance, setShowBalance] = useState(true);

    // Notifications
    const [notifyAllPurchases, setNotifyAllPurchases] = useState(true);
    const [notifyAboveAmount, setNotifyAboveAmount] = useState(false);
    const [notifyInvoiceClose, setNotifyInvoiceClose] = useState(true);
    const [notifyInvoiceDue, setNotifyInvoiceDue] = useState(true);
    const [notifyInternational, setNotifyInternational] = useState(true);

    const markDirty = useCallback(() => setIsDirty(true), []);

    const handleField = (setter: (v: string) => void) => (v: string) => { setter(v); markDirty(); };
    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => { setter(p => !p); markDirty(); };

    const handleSave = () => setIsDirty(false);
    const handleCancel = () => {
        setCardAlias(card.name);
        setLimitAmount(String(card.totalLimit.toFixed(2)).replace('.', ','));
        setIsBlocked(card.status === 'Bloqueado');
        setOnlinePurchases(true);
        setInternationalPurchases(false);
        setContactless(true);
        setShowBalance(true);
        setNotifyAllPurchases(true);
        setNotifyAboveAmount(false);
        setNotifyInvoiceClose(true);
        setNotifyInvoiceDue(true);
        setNotifyInternational(true);
        setIsDirty(false);
    };

    return (
        <div className="relative flex flex-col h-full min-h-0">
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2">
                <div className="max-w-3xl mx-auto px-2 py-1 flex flex-col gap-5">

                    {/* Card Details */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <SectionHeader icon={<CreditCard className="w-5 h-5" />} title="Detalhes do Cartão" />
                        <div className="grid grid-cols-2 gap-6">
                            <Field label="Apelido do Cartão" value={cardAlias} onChange={handleField(setCardAlias)} />
                            <Field label="Limite Total" value={limitAmount} onChange={handleField(setLimitAmount)} prefix="R$" />
                            <Field label="Titular" value={card.holderName} readOnly />
                            <Field label="Validade" value={card.expiryDate} readOnly />
                            <Field label="Final do Cartão" value={`**** **** **** ${card.lastDigits}`} readOnly />
                            <Field label="Bandeira / Tier" value={`${card.network} ${card.tier}`} readOnly />
                        </div>
                    </div>

                    {/* Security & Controls */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <SectionHeader icon={<Shield className="w-5 h-5" />} title="Segurança e Controles" />

                        {/* Block / Unblock card */}
                        <div className={`flex items-center justify-between p-4 rounded-xl border mb-5 ${isBlocked ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {isBlocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        {isBlocked ? 'Cartão bloqueado' : 'Cartão desbloqueado'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {isBlocked
                                            ? 'Nenhuma compra pode ser realizada enquanto o cartão estiver bloqueado.'
                                            : 'Clique para bloquear temporariamente seu cartão.'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setIsBlocked(p => !p); markDirty(); }}
                                className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
                                    isBlocked
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                            >
                                {isBlocked ? 'Desbloquear' : 'Bloquear'}
                            </button>
                        </div>

                        <div className="flex flex-col divide-y divide-gray-100">
                            <ToggleRow
                                label="Compras online"
                                description="Permitir compras em sites e aplicativos sem a presença física do cartão."
                                checked={onlinePurchases}
                                onChange={handleToggle(setOnlinePurchases)}
                                icon={<Globe className="w-4 h-4" />}
                            />
                            <ToggleRow
                                label="Compras internacionais"
                                description="Permitir transações em moeda estrangeira e no exterior."
                                checked={internationalPurchases}
                                onChange={handleToggle(setInternationalPurchases)}
                                icon={<Globe className="w-4 h-4" />}
                            />
                            <ToggleRow
                                label="Pagamento por aproximação (NFC)"
                                description="Permitir pagamentos contactless sem inserir o cartão na maquininha."
                                checked={contactless}
                                onChange={handleToggle(setContactless)}
                                icon={<Smartphone className="w-4 h-4" />}
                            />
                            <ToggleRow
                                label="Exibir saldo e limite no app"
                                description="Mostrar os valores de limite e fatura na tela inicial."
                                checked={showBalance}
                                onChange={handleToggle(setShowBalance)}
                                icon={showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <SectionHeader icon={<Bell className="w-5 h-5" />} title="Notificações" />
                        <div className="flex flex-col divide-y divide-gray-100">
                            <ToggleRow
                                label="Notificar em toda compra"
                                description="Receber uma notificação a cada transação realizada com o cartão."
                                checked={notifyAllPurchases}
                                onChange={handleToggle(setNotifyAllPurchases)}
                            />
                            <ToggleRow
                                label="Alerta de compra acima de R$ 500,00"
                                description="Ser avisado quando uma transação individual ultrapassar o valor configurado."
                                checked={notifyAboveAmount}
                                onChange={handleToggle(setNotifyAboveAmount)}
                            />
                            <ToggleRow
                                label="Aviso de fechamento de fatura"
                                description="Receber notificação 3 dias antes do fechamento da fatura."
                                checked={notifyInvoiceClose}
                                onChange={handleToggle(setNotifyInvoiceClose)}
                            />
                            <ToggleRow
                                label="Lembrete de vencimento"
                                description="Receber alerta 5 dias antes do vencimento da fatura."
                                checked={notifyInvoiceDue}
                                onChange={handleToggle(setNotifyInvoiceDue)}
                            />
                            <ToggleRow
                                label="Alertas de compra internacional"
                                description="Ser notificado sobre compras realizadas em moeda estrangeira."
                                checked={notifyInternational}
                                onChange={handleToggle(setNotifyInternational)}
                            />
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <SectionHeader icon={<SlidersHorizontal className="w-5 h-5" />} title="Preferências" />
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dia de fechamento</label>
                                <div className="flex items-center border border-gray-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
                                    <input type="number" defaultValue={card.statementClosingDay} min={1} max={31} onChange={markDirty} className="flex-1 px-4 py-3 text-sm font-semibold text-gray-900 bg-transparent focus:outline-none rounded-xl" />
                                    <span className="pr-4 text-xs text-gray-400 font-semibold">do mês</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dia de vencimento</label>
                                <div className="flex items-center border border-gray-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
                                    <input type="number" defaultValue={card.statementDueDay} min={1} max={31} onChange={markDirty} className="flex-1 px-4 py-3 text-sm font-semibold text-gray-900 bg-transparent focus:outline-none rounded-xl" />
                                    <span className="pr-4 text-xs text-gray-400 font-semibold">do mês</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danger zone */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                        <p className="text-sm font-bold text-red-600 mb-3">Cancelamento do cartão</p>
                        <div className="flex items-start justify-between gap-6">
                            <p className="text-xs text-red-500 leading-relaxed max-w-lg">
                                Ao cancelar este cartão, todas as faturas em aberto permanecem disponíveis para consulta, porém nenhuma nova compra poderá ser realizada. Parcelamentos em andamento continuarão sendo cobrados nas faturas futuras.{' '}
                                <span className="font-bold uppercase">Esta ação não pode ser desfeita.</span>
                            </p>
                            <button type="button" className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shrink-0">
                                <Trash2 className="w-4 h-4" />
                                Cancelar Cartão
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Unsaved changes bar */}
            <div className={`shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${isDirty ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-5 py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">As alterações pendentes não foram salvas.</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button type="button" onClick={handleCancel} className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors">Cancelar</button>
                        <button type="button" onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                            <Save className="w-4 h-4" />
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSettingsTab;
