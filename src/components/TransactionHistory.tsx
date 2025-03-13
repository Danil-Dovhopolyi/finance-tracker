import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { useUniqueTransactions } from '@/hooks/useUniqueTransactions.ts';
import { Transaction } from '@/types/transaction/Transaction.ts';

interface TransactionHistoryProps {
    transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
    const { uniqueTransactions } = useUniqueTransactions(transactions);
    const {
        displayedTransactions,
        isLoading,
        hasMore,
        containerRef: tableContainerRef,
        lastItemRef: lastTransactionElementRef,
    } = useFetchTransactions(uniqueTransactions, 5);

    return (
        <div className="p-2">
            <div
                ref={tableContainerRef}
                className="w-full overflow-auto max-h-[250px]"
            >
                <Table className="w-full text-sm">
                    <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead className="w-auto">
                                Description
                            </TableHead>
                            <TableHead className="text-right w-[100px]">
                                Amount
                            </TableHead>
                            <TableHead className="text-right w-[80px]">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedTransactions.map((transaction, index) => {
                            if (displayedTransactions.length === index + 1) {
                                return (
                                    <TableRow
                                        key={transaction.uniqueId}
                                        ref={lastTransactionElementRef}
                                        className="hover:bg-gray-50"
                                    >
                                        <TableCell>
                                            {new Date(
                                                transaction.date
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="truncate">
                                            {transaction.description}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${transaction.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span
                                                className={cn(
                                                    'flex items-center justify-end gap-1',
                                                    transaction.type ===
                                                        'credit'
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                )}
                                            >
                                                {transaction.type ===
                                                'credit' ? (
                                                    <ArrowUpIcon className="h-3 w-3" />
                                                ) : (
                                                    <ArrowDownIcon className="h-3 w-3" />
                                                )}
                                                {transaction.type}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                            return (
                                <TableRow
                                    key={transaction.uniqueId}
                                    className="hover:bg-gray-50"
                                >
                                    <TableCell>
                                        {new Date(
                                            transaction.date
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="truncate">
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${transaction.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={cn(
                                                'flex items-center justify-end gap-1',
                                                transaction.type === 'credit'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            )}
                                        >
                                            {transaction.type === 'credit' ? (
                                                <ArrowUpIcon className="h-3 w-3" />
                                            ) : (
                                                <ArrowDownIcon className="h-3 w-3" />
                                            )}
                                            {transaction.type}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            {isLoading && (
                <div className="text-center text-sm py-1">
                    Loading more transactions...
                </div>
            )}
            {!hasMore && (
                <div className="text-center text-sm py-1">
                    No more transactions to load
                </div>
            )}
        </div>
    );
}
