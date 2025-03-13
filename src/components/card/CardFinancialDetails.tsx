import { Progress } from '@/components/ui/progress';
import { CreditCard } from '@/types/card/creditCard';

interface CardDetailsProps {
    currentCard: CreditCard;
    spendingPercentage: number;
}

export function CardFinancialDetails({
    currentCard,
    spendingPercentage,
}: CardDetailsProps) {
    return (
        <div className="md:w-1/2 flex-1 space-y-4">
            <div className="space-y-1">
                <p className="text-xs sm:text-sm text-muted-foreground">
                    Current Balance
                </p>
                <p className="text-xl sm:text-2xl font-bold truncate">
                    $
                    {currentCard.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                    })}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="p-2 rounded-lg bg-green-50">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Last Income
                    </p>
                    <p className="text-sm sm:text-lg font-semibold text-green-500 truncate">
                        +$
                        {currentCard.lastIncome.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <div className="p-2 rounded-lg bg-red-50">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Last Outcome
                    </p>
                    <p className="text-sm sm:text-lg font-semibold text-red-500 truncate">
                        -$
                        {currentCard.lastOutcome.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between flex-wrap">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Payment Limit
                    </p>
                    <p className="text-xs sm:text-sm font-medium">
                        $
                        {currentCard.balance.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}{' '}
                        / $
                        {currentCard.limit.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <Progress
                    value={spendingPercentage}
                    className={`h-1.5 sm:h-2 ${
                        spendingPercentage > 80
                            ? '[&>div]:bg-red-500'
                            : spendingPercentage > 60
                              ? '[&>div]:bg-yellow-500'
                              : '[&>div]:bg-green-500'
                    }`}
                />
            </div>
        </div>
    );
}
