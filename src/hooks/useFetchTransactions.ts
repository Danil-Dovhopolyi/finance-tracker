import { useCallback } from 'react';

import { useInfiniteScroll } from '@/hooks/useInfinityScroll';
import { Transaction } from '@/types/transaction/Transaction';

type TransactionWithUniqueId = Transaction & { uniqueId: string };

export function useFetchTransactions(
    transactions: TransactionWithUniqueId[],
    itemsPerPage = 10
) {
    const fetchTransactions = useCallback(
        async (page: number, perPage: number) => {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;

            const sortedTransactions = [...transactions].sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            return sortedTransactions.slice(startIndex, endIndex);
        },
        [transactions]
    );

    const {
        items: displayedTransactions,
        containerRef,
        lastItemRef,
        isLoading,
        hasMore,
    } = useInfiniteScroll<TransactionWithUniqueId>({
        fetchItems: fetchTransactions,
        itemsPerPage,
    });

    return {
        displayedTransactions,
        containerRef,
        lastItemRef,
        isLoading,
        hasMore,
    };
}
