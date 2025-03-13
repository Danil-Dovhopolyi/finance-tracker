import { useForm } from 'react-hook-form';

import { Menu } from '@/components/menu/Menu';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTransactionsStore } from '@/store/useTransactionStore.ts';

interface TransactionFormData {
    title: string;
    amount: number;
    category: string;
    date: string;
    description?: string;
}

export default function Transaction() {
    const { addTransaction } = useTransactionsStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<TransactionFormData>({
        defaultValues: {
            title: '',
            amount: 0,
            category: '',
            date: new Date().toISOString().split('T')[0],
            description: '',
        },
    });

    const onSubmit = async (data: TransactionFormData) => {
        try {
            console.log('Transaction added:', data);
            await addTransaction(data);
            reset();
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    };

    const categories = [
        'Shopping',
        'Food',
        'Transport',
        'Entertainment',
        'Other',
    ];

    return (
        <>
            <Menu />
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Add New Transaction
                        </CardTitle>
                        <CardDescription>
                            Enter the details of your transaction below
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Transaction title"
                                    {...register('title', {
                                        required: 'Title is required',
                                        minLength: {
                                            value: 3,
                                            message:
                                                'Title should be at least 3 characters',
                                        },
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register('amount', {
                                        required: 'Amount is required',
                                        min: {
                                            value: 0.01,
                                            message:
                                                'Amount must be greater than 0',
                                        },
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-sm">
                                        {errors.amount.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setValue('category', value)
                                    }
                                    defaultValue={watch('category')}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input
                                    type="hidden"
                                    {...register('category', {
                                        required: 'Category is required',
                                    })}
                                />
                                {errors.category && (
                                    <p className="text-red-500 text-sm">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    {...register('date', {
                                        required: 'Date is required',
                                    })}
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-sm">
                                        {errors.date.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description (Optional)
                                </Label>
                                <Input
                                    id="description"
                                    placeholder="Add some details about this transaction"
                                    {...register('description')}
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => reset()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Add Transaction</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}
