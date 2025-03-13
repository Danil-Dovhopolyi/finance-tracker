import { Card } from '@/types/card/card.ts';

export type CreditCard = Card & {
    lastIncome: number;
    lastOutcome: number;
};
