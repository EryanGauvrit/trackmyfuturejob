import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const removeZeroAtStart = (value: string) => {
    if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
        console.log('value', value);
        const res = value.replace(/^0+/, '');
        console.log('res', res);
        return res;
    }
    return value;
};
