import { Transaction } from '@/types/transaction/Transaction.ts';

export function useUniqueTransactions(transactions: Transaction[]) {
    return {
        uniqueTransactions: transactions
            .filter(
                (transaction, index, self) =>
                    index ===
                    self.findIndex(
                        (t) =>
                            t.date === transaction.date &&
                            t.description === transaction.description &&
                            t.amount === transaction.amount
                    )
            )
            .map((transaction, index) => ({
                ...transaction,
                uniqueId: `transaction-${index}`,
            })),
    };
}
