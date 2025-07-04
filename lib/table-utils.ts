import { Column, FilterFn, Row } from '@tanstack/react-table';
import { isDate } from 'date-fns';
import { CSSProperties } from 'react';

export const filterByDate: FilterFn<any> = (row: Row<any>, columnId: string, filterValue: [number, number]): boolean => {
    let [min, max] = filterValue;

    const rowValue = row.getValue<string | null | undefined>(columnId);
    if (rowValue === null || rowValue === undefined || rowValue === '') {
        return false;
    }
    const rowValueDateNumber = new Date(rowValue).getTime();
    return rowValueDateNumber >= min && rowValueDateNumber <= max;
};

filterByDate.resolveFilterValue = (val: [any, any]) => {
    let [unsafeMin, unsafeMax] = val;

    let parsedMin = isDate(unsafeMin) ? new Date(unsafeMin).getTime() : unsafeMin;
    let parsedMax = isDate(unsafeMax) ? new Date(unsafeMax).getTime() : unsafeMax;

    let min: number = !unsafeMin || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
    let max: number = !unsafeMax || Number.isNaN(parsedMax) ? Infinity : parsedMax;

    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }

    return [min, max] as const;
};

filterByDate.autoRemove = (val: any) => {
    return testFalsey(val) || (testFalsey(val[0]) && testFalsey(val[1]));
};

function testFalsey(val: any) {
    return val === undefined || val === null || val === '';
}

export const filterBoolean: FilterFn<any> = (row, columnId, value) => {
    const rowValue = row.getValue(columnId);
    if (typeof rowValue === 'boolean') {
        return rowValue === value;
    }
    if (typeof rowValue === 'undefined' && value === false) {
        return true;
    }
    return false;
};

export const getFilterFn = (value: any) => {
    if (typeof value === 'boolean') {
        return 'filterBoolean';
    }
    if (typeof value === 'string') {
        // Check if the string is a valid date
        const date = new Date(value);
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/; // ISO 8601 format
        if (!isNaN(date.getTime()) && regex.test(value)) {
            return 'filterByDate';
        }
        return 'includesString';
    }
    if (typeof value === 'number') {
        return 'inNumberRange';
    }
    if (value instanceof Date) {
        return 'filterByDate';
    }
    return undefined;
};

export const getCommonPinningStyles = <TData>(column: Column<TData>): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

    return {
        boxShadow: isLastLeftPinnedColumn
            ? '-1px 0 1px -1px var(--foreground) inset'
            : isFirstRightPinnedColumn
            ? '1px 0 1px -1px var(--foreground) inset'
            : undefined,
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
        opacity: isPinned ? 0.9 : 1,
        position: isPinned ? 'sticky' : 'relative',
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
    };
};
