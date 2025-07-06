import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const toCapitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export type SimpleType = 'boolean' | 'string' | 'number' | 'date' | undefined | null;

export const getSimpleType = (value: unknown): SimpleType => {
    if (typeof value === 'boolean') {
        return 'boolean';
    }
    if (typeof value === 'string') {
        return 'string';
    }
    if (typeof value === 'number') {
        return 'number';
    }
    if (value instanceof Date) {
        return 'date';
    }
    return undefined;
};
