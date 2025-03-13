import { useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '../ui/chart.tsx';
import { Label, Pie, PieChart } from 'recharts';

type CustomPieChartProps = {
    title: string;
    description: string;
    data: Array<{
        category: string;
        amount: number;
        fill: string;
    }>;
    totalLabel: string;
};

export function CustomPieChart({
    title,
    description,
    data,
    totalLabel,
}: CustomPieChartProps) {
    const total = useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.amount, 0);
    }, [data]);

    const chartConfig = {
        amount: {
            label: 'Amount',
        },
        ...data.reduce(
            (acc, curr) => ({
                ...acc,
                [curr.category]: {
                    label: curr.category,
                    color: curr.fill,
                },
            }),
            {}
        ),
    } satisfies ChartConfig;

    return (
        <Card className="w-1/2">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    ${total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {totalLabel}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
