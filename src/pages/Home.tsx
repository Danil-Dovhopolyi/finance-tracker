import React from 'react';

import { Fragment } from 'react/jsx-runtime';

import { currentMonthData, previousMonthData } from '@/app/mock/mockMonthData';
import { CardDashboard } from '@/components/CardDashboard.tsx';
import { CustomPieChart } from '@/components/charts/PieChart.tsx';
import { Menu } from '@/components/menu/Menu.tsx';
import { getCurrentAndPreviousDate, formatMonthYear } from '@/lib/utils';

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
                    <div className="w-full flex gap-2 flex-wrap mt-4">
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
