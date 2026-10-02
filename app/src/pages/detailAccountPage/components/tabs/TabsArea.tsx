import TransacoesTab from './transacoesTab/TransacoesTab';
import ResumeTab from './resumeTab/ResumeTab';
import SettingsTab from './settingsTab/SettingsTab';
import { useState } from 'react';
import type { UserAccount } from '../../../accountsPage/accounts';

type TabType = 'resumo' | 'transacoes' | 'configuracoes' | 'conciliacao';

interface TabsAreaProps {
    account: UserAccount;
}

const TabsArea = ({ account }: TabsAreaProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('resumo');

    return (
        <div className="flex-none 2xl:flex-1 flex flex-col gap-6 overflow-visible 2xl:overflow-hidden min-h-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Tabs */}
            <div className="flex justify-center shrink-0">
                <div className="relative flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-full overflow-x-auto custom-scrollbar 2xl:w-fit 2xl:min-w-[500px] 2xl:overflow-visible">
                    {/* Active Tab Background Slider */}
                    <div
                        className="absolute top-1 bottom-1 bg-gray-50 border border-gray-100 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
                        style={{
                            width: 'calc((100% - 8px) / 4)',
                            left: '4px',
                            transform: `translateX(${['resumo', 'transacoes', 'configuracoes', 'conciliacao'].indexOf(activeTab) * 100}%)`
                        }}
                    />

                    {(['resumo', 'transacoes', 'configuracoes', 'conciliacao'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative z-10 flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            {tab === 'resumo' && 'Resumo'}
                            {tab === 'transacoes' && 'Transações'}
                            {tab === 'configuracoes' && 'Configurações'}
                            {tab === 'conciliacao' && 'Conciliação'}
                        </button>
                    ))}
                </div>
            </div>{/* end centering wrapper */}

            {/* Sliding Content Area */}
            <div className="flex-none 2xl:flex-1 overflow-x-hidden overflow-y-visible 2xl:overflow-hidden relative min-h-0">
                <div
                    className="flex h-auto 2xl:h-full transition-transform duration-500 ease-in-out"
                    style={{
                        width: '400%',
                        transform: `translateX(-${['resumo', 'transacoes', 'configuracoes', 'conciliacao'].indexOf(activeTab) * 25}%)`
                    }}
                >
                    {/* Resumo Tab */}
                    <div className="w-1/4 mr-10 h-auto 2xl:h-full flex flex-col min-h-0">
                        <ResumeTab />
                    </div>

                    {/* Transações Tab */}
                    <div className="w-1/4 mr-10 h-auto 2xl:h-full flex flex-col min-h-0">
                        <TransacoesTab idAccount={account.idAccount} />
                    </div>

                    {/* Configurações Tab */}
                    <div className="w-1/4 mr-10 h-auto 2xl:h-full flex flex-col min-h-0">
                        <SettingsTab />
                    </div>

                    {/* Conciliação Tab */}
                    <div className="w-1/4 mr-10 h-auto 2xl:h-full flex flex-col min-h-0">
                        <div className="flex-1 flex items-center justify-center text-gray-400 bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[400px] 2xl:min-h-0">
                            Conteúdo de Conciliação em breve...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabsArea;