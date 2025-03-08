import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const getCurrentAndPreviousDate = (): {
    currentDate: Date;
    previousDate: Date;
} => {
    const currentDate = new Date();
    const previousDate = new Date();
    previousDate.setMonth(currentDate.getMonth() - 1);
    return { currentDate, previousDate };
};

export const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });
};
