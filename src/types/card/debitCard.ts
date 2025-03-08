import { Card } from '@/types/card/card.ts';

export type DebitCard = Card & {
    dailyWithdrawalLimit: number;
};
