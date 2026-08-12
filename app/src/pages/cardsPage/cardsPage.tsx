import { useState } from 'react';
import Header from './components/header';
import UpperBarSection from './components/upperBarSection';
import CardItem from './components/cardItem';
import { mockCards, CardInfo } from './mockData';
import DetailCardPage from '../detailCardPage/DetailCardPage';

const CardsPage = () => {
    const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

    if (selectedCard) {
        return (
            <div className="flex w-full h-full bg-white">
                <DetailCardPage card={selectedCard} onBack={() => setSelectedCard(null)} />
            </div>
        );
    }

    return (
        <div className="flex w-full h-full bg-[#f8fafc]">
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* ========================================== */}
                {/* BLOCK 1: HEADER (TOTALS)                   */}
                {/* ========================================== */}
                <div className="animate-fade-in-down bg-white" style={{ animationDelay: '0ms' }}>
                    <Header />
                </div>

                {/* ========================================== */}
                {/* BLOCK 2: ACTIONS BAR                       */}
                {/* ========================================== */}
                <div className="animate-fade-in-up bg-[#f8fafc]" style={{ animationDelay: '100ms' }}>
                    <UpperBarSection />
                </div>

                {/* ========================================== */}
                {/* BLOCK 3: CARDS GRID                        */}
                {/* ========================================== */}
                <div className="animate-fade-in-up px-8 pb-8 bg-[#f8fafc]" style={{ animationDelay: '200ms' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mockCards.map((card) => (
                            <CardItem key={card.id} card={card} onDoubleClick={() => setSelectedCard(card)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsPage;
