import React from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Menu } from '@/components/menu/Menu.tsx';
import { CardDashboard } from '@/components/CardDashboard.tsx';
import { CustomPieChart } from '@/components/charts/PieChart.tsx';
import { getCurrentAndPreviousDate, formatMonthYear } from '@/lib/utils';

const currentMonthData = [
    { category: 'Shopping', amount: 450, fill: 'hsl(var(--chart-1))' },
    { category: 'Food', amount: 300, fill: 'hsl(var(--chart-2))' },
    { category: 'Transport', amount: 200, fill: 'hsl(var(--chart-3))' },
    { category: 'Entertainment', amount: 150, fill: 'hsl(var(--chart-4))' },
    { category: 'Other', amount: 100, fill: 'hsl(var(--chart-5))' },
];

const previousMonthData = [
    { category: 'Shopping', amount: 380, fill: 'hsl(var(--chart-1))' },
    { category: 'Food', amount: 280, fill: 'hsl(var(--chart-2))' },
    { category: 'Transport', amount: 180, fill: 'hsl(var(--chart-3))' },
    { category: 'Entertainment', amount: 220, fill: 'hsl(var(--chart-4))' },
    { category: 'Other', amount: 90, fill: 'hsl(var(--chart-5))' },
];

function Home() {
    const { currentDate, previousDate } = getCurrentAndPreviousDate();
    const chartConfigs = React.useMemo(
        () => [
            {
                title: 'Current Month Expenses',
                description: formatMonthYear(currentDate),
                data: currentMonthData,
                totalLabel: 'Total Spent',
            },
            {
                title: 'Previous Month Expenses',
                description: formatMonthYear(previousDate),
                data: previousMonthData,
                totalLabel: 'Total Spent',
            },
        ],
        [currentDate, previousDate]
    );
    return (
        <>
            <Fragment>
                <Menu />
            </Fragment>
            <div className="flex">
                <CardDashboard />
                <div className="w-1/2">
                    <div className="w-full flex gap-4 flex-wrap">
                        {chartConfigs.map((chart, index) => (
                            <CustomPieChart key={index} {...chart} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
