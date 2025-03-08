import { CreditCard } from '@/types/card/creditCard.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';

export function CardVisual({ card }: { card: CreditCard }) {
    return (
        <Card
            className={`absolute h-full w-full ${card.backgroundColor} text-white`}
        >
            <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="flex justify-between">
                    <span className="text-xl font-bold">Credit Card</span>
                    <span>{card.expiryDate}</span>
                </div>
                <div className="space-y-4">
                    <div className="text-2xl">{card.number}</div>
                    <div>{card.holderName}</div>
                </div>
            </CardContent>
        </Card>
    );
}
