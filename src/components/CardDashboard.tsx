import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFinancialDetails } from '@/components/card/CardFinancialDetails.tsx';
import { CardVisual } from '@/components/card/CardVisual.tsx';
import { cards } from '@/app/mock/mockCards.ts';
import { transactions } from '@/app/mock/mockTransactions.ts';
import { TransactionHistory } from '@/components/TransactionHistory.tsx';

export function CardDashboard() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const currentCard = cards[currentIndex];
    const spendingPercentage = (currentCard.balance / currentCard.limit) * 100;

    return (
        <Card className="w-1/2 md:w-2/3 lg:w-1/2 xl:w-2/5 m-4">
            <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                <div className="relative flex items-center md:w-1/2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevCard}
                        className="absolute -left-4 z-10 h-8 w-8 rounded-full bg-white shadow-md"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardVisual card={currentCard} />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextCard}
                        className="absolute -right-4 z-10 h-8 w-8 rounded-full bg-white shadow-md"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <CardFinancialDetails
                    currentCard={currentCard}
                    spendingPercentage={spendingPercentage}
                />
            </CardContent>
            <TransactionHistory transactions={transactions} />
        </Card>
    );
}
