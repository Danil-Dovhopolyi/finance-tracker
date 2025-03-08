import { TransactionType } from '@/types/transaction/TransactionTypes.ts';

export type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
};
