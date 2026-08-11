import { useState, useCallback } from 'react';
import { User, SlidersHorizontal, Trash2, Save, AlertCircle } from 'lucide-react';

/* ─── Toggle Switch ─────────────────────────────────────────────────────────── */
interface ToggleProps {
    checked: boolean;
    onChange: () => void;
}

const Toggle = ({ checked, onChange }: ToggleProps) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={checked}
    >
        <span
            className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                checked ? 'translate-x-5' : 'translate-x-0'
            }`}
        />
    </button>
);

/* ─── Section Header ─────────────────────────────────────────────────────────── */
interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
}

const SectionHeader = ({ icon, title }: SectionHeaderProps) => (
    <div className="flex items-center gap-2.5 mb-5">
        <span className="text-blue-600">{icon}</span>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
    </div>
);

/* ─── Field ──────────────────────────────────────────────────────────────────── */
interface FieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    prefix?: string;
}

const Field = ({ label, value, onChange, prefix }: FieldProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <div className="flex items-center border border-gray-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            {prefix && (
                <span className="pl-4 pr-1 text-sm font-semibold text-gray-400 select-none">{prefix}</span>
            )}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-4 py-3 text-sm font-semibold text-gray-900 bg-transparent focus:outline-none rounded-xl"
            />
        </div>
    </div>
);

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const SettingsTab = () => {
    const [isDirty, setIsDirty] = useState(false);

    /* Account details */
    const [nomeConta, setNomeConta] = useState('Nubank Principal');
    const [saldoInicial, setSaldoInicial] = useState('12.450,60');
    const [agencia, setAgencia] = useState('0001');
    const [numeroConta, setNumeroConta] = useState('4592');

    /* Preferences */
    const [visibilidade, setVisibilidade] = useState(true);
    const [alertaSaldo, setAlertaSaldo] = useState(false);

    const markDirty = useCallback(() => {
        setIsDirty(true);
    }, []);

    const handleChange = useCallback(
        (setter: (v: string) => void) => (v: string) => {
            setter(v);
            markDirty();
        },
        [markDirty]
    );

    const handleToggle = useCallback(
        (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
            setter((prev) => !prev);
            markDirty();
        },
        [markDirty]
    );

    const handleCancel = () => {
        setNomeConta('Nubank Principal');
        setSaldoInicial('12.450,60');
        setAgencia('0001');
        setNumeroConta('4592');
        setVisibilidade(true);
        setAlertaSaldo(false);
        setIsDirty(false);
    };

    const handleSave = () => {
        // Future: send to API
        setIsDirty(false);
    };

    return (
        <div className="relative flex flex-col h-full min-h-0">
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2">
                <div className="max-w-3xl mx-auto px-2 py-1 flex flex-col gap-5">

                {/* Detalhes da Conta */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <SectionHeader
                        icon={<User className="w-5 h-5" />}
                        title="Detalhes da Conta"
                    />
                    <div className="grid grid-cols-2 gap-6">
                        <Field
                            label="Nome da Conta"
                            value={nomeConta}
                            onChange={handleChange(setNomeConta)}
                        />
                        <Field
                            label="Saldo Inicial"
                            value={saldoInicial}
                            onChange={handleChange(setSaldoInicial)}
                            prefix="R$"
                        />
                        <Field
                            label="Agência"
                            value={agencia}
                            onChange={handleChange(setAgencia)}
                        />
                        <Field
                            label="Número da Conta"
                            value={numeroConta}
                            onChange={handleChange(setNumeroConta)}
                        />
                    </div>
                </div>

                {/* Preferências e Notificações */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <SectionHeader
                        icon={<SlidersHorizontal className="w-5 h-5" />}
                        title="Preferências e Notificações"
                    />

                    <div className="flex flex-col divide-y divide-gray-100">
                        <div className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                            <div>
                                <p className="text-sm font-bold text-gray-900">Visibilidade da conta</p>
                                <p className="text-xs text-gray-500 mt-0.5">Mostrar esta conta no resumo global do dashboard</p>
                            </div>
                            <Toggle
                                checked={visibilidade}
                                onChange={handleToggle(setVisibilidade)}
                            />
                        </div>

                        <div className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                            <div>
                                <p className="text-sm font-bold text-gray-900">Alertas de saldo baixo</p>
                                <p className="text-xs text-gray-500 mt-0.5">Notificar quando o saldo disponível for inferior a R$ 500,00</p>
                            </div>
                            <Toggle
                                checked={alertaSaldo}
                                onChange={handleToggle(setAlertaSaldo)}
                            />
                        </div>
                    </div>
                </div>

                {/* Exclusão da Conta */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                    <p className="text-sm font-bold text-red-600 mb-3">Exclusão da conta</p>
                    <div className="flex items-start justify-between gap-6">
                        <p className="text-xs text-red-500 leading-relaxed max-w-lg">
                            Ao excluir esta conta, todos os dados de transações serão mantidos para não prejudicar saldos de outras contas, porém
                            estarão inacessíveis para consulta detalhada, já as metas vinculadas, empréstimos, investimentos e anexos serão
                            permanentemente removidos. Para exclusão total dos dados, solicite a exclusão da sua conta.{' '}
                            <span className="font-bold uppercase">Esta ação não pode ser desfeita.</span>
                        </p>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shrink-0"
                        >
                            <Trash2 className="w-4 h-4" />
                            Excluir Conta
                        </button>
                    </div>
                </div>
                </div>{/* end max-w wrapper */}
            </div>

            {/* Unsaved Changes Bar */}
            <div
                className={`shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
                    isDirty ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-5 py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            As alterações pendentes não foram salvas.
                        </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                        >
                            <Save className="w-4 h-4" />
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;
