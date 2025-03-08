import { CreditCard } from '@/types/card/creditCard.ts';

export const cards: CreditCard[] = [
    {
        id: '1',
        number: '**** **** **** 1234',
        holderName: 'John Doe',
        expiryDate: '12/25',
        balance: 5430.2,
        lastIncome: 1200,
        lastOutcome: 450.3,
        limit: 10000,
        backgroundColor: 'bg-gradient-to-r from-violet-500 to-purple-500',
    },
    {
        id: '2',
        number: '**** **** **** 5678',
        holderName: 'John Doe',
        expiryDate: '03/26',
        balance: 2150.75,
        lastIncome: 800,
        lastOutcome: 325.5,
        limit: 5000,
        backgroundColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
];
