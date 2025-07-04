'use client';

import { getCommonPinningStyles } from '@/lib/table-utils';
import { SimpleType, cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, Header, flexRender } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import Autocomplete from '../basics/Autocomplete';
import { RangeDateInput } from '../basics/RangeDateInput';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TableHead } from '../ui/table';

const DraggableTableHeader = <TData, TValue>({ header, className }: { header: Header<TData, unknown>; className?: string }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: header.column.id,
    });
    return (
        <TableHead
            colSpan={header.colSpan}
            ref={setNodeRef}
            key={header.id}
            style={{
                opacity: isDragging ? 0.8 : 1,
                position: 'relative',
                transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
                transition: 'width transform 0.2s ease-in-out',
                whiteSpace: 'nowrap',
                width: header.getSize(),
                zIndex: isDragging ? 1 : 0,
                ...getCommonPinningStyles(header.column),
            }}
            className={cn('', className)}
        >
            <div className="flex flex-col h-full justify-between grow">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanFilter() ? (
                    <div className="mb-2">
                        <Filter column={header.column} />
                    </div>
                ) : null}
            </div>
        </TableHead>
    );
};

function Filter({ column }: { column: Column<any, unknown> }) {
    const [columnFilterValue, setColumneFilterValue] = useState(column.getFilterValue());
    const { valueType } = (column.columnDef.meta as { valueType: SimpleType }) || {};

    const columnRowCount = column.getFacetedRowModel().rows.length;
    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(), // sort values alphabetically
        [column.getFacetedUniqueValues()],
    );

    const UNIQUE_VALUES_RATIO_THRESHOLD = 0.2; // Threshold to switch between autocomplete and debounced input
    const MIN_ROW_COUNT_FOR_UNIQUE_VALUES = 20; // Minimum row count to consider unique values
    const uniqueValueRatio = useMemo(() => {
        if (columnRowCount === 0) return 0;
        return sortedUniqueValues.length / columnRowCount;
    }, [columnRowCount, sortedUniqueValues.length]);

    switch (valueType) {
        case 'boolean':
            return (
                <Select
                    onValueChange={(value) => {
                        column.setFilterValue(value === 'all' ? undefined : value === 'true');
                        setColumneFilterValue(value === 'all' ? undefined : value === 'true');
                    }}
                    value={columnFilterValue === undefined ? 'all' : columnFilterValue === true ? 'true' : 'false'}
                >
                    <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                </Select>
            );
        case 'string':
            if (uniqueValueRatio > UNIQUE_VALUES_RATIO_THRESHOLD && sortedUniqueValues.length > MIN_ROW_COUNT_FOR_UNIQUE_VALUES) {
                return (
                    <DebouncedInput
                        onChange={(value) => column.setFilterValue(value)}
                        placeholder={`Search...`}
                        type="search"
                        value={(columnFilterValue ?? '') as string}
                    />
                );
            }
            return (
                <Autocomplete
                    data={sortedUniqueValues.map((v) => {
                        return { label: v, value: v };
                    })}
                    onSelect={(value) => {
                        if (value === '' || value === 'all') {
                            column.setFilterValue(undefined);
                            setColumneFilterValue(undefined);
                        } else {
                            column.setFilterValue(value);
                            setColumneFilterValue(value);
                        }
                    }}
                    value={columnFilterValue as string}
                    className="w-full bg-background"
                />
            );
        case 'date':
            const min = (columnFilterValue as [number, number])?.[0] ?? '';
            const max = (columnFilterValue as [number, number])?.[1] ?? '';
            const minDateNbr = min ? new Date(min) : undefined;
            const maxDateNbr = max ? new Date(max) : undefined;
            return (
                <div className="">
                    {/* See faceted column filters example for min max values functionality */}
                    <DebouncedInput
                        type="date"
                        value={[minDateNbr, maxDateNbr] as [Date | undefined, Date | undefined] & readonly string[]}
                        onChange={(value: any) => {
                            column.setFilterValue((old: [string, string]) => {
                                if (!value[0] && !value[1]) {
                                    return undefined;
                                }
                                return value;
                            });
                        }}
                        className="w-auto"
                    />
                </div>
            );
        case 'number':
            return (
                <div>
                    <div className="flex space-x-2">
                        {/* See faceted column filters example for min max values functionality */}
                        <DebouncedInput
                            type="number"
                            value={(columnFilterValue as [number, number])?.[0] ?? ''}
                            onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
                            placeholder={`Min`}
                            className="w-24"
                        />
                        <DebouncedInput
                            type="number"
                            value={(columnFilterValue as [number, number])?.[1] ?? ''}
                            onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
                            placeholder={`Max`}
                            className="w-24"
                        />
                    </div>
                </div>
            );
        case undefined:
            return null;
    }
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 200,
    ...props
}: {
    value: string | number | [Date | undefined, Date | undefined];
    onChange: (value: string | number | [Date | undefined, Date | undefined]) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (Array.isArray(initialValue)) {
            return;
        }
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    if (props.type === 'date') {
        return (
            <RangeDateInput
                date={{
                    from: Array.isArray(value) ? value[0] ?? undefined : undefined,
                    to: Array.isArray(value) ? value[1] ?? undefined : undefined,
                }}
                setDate={(range) => {
                    if (!range) {
                        setValue('');
                        return;
                    }
                    setValue([range.from, range.to] as [Date | undefined, Date | undefined] & readonly string[]);
                }}
            />
        );
    }

    return <Input {...props} value={value} className="w-full bg-background" onChange={(e) => setValue(e.target.value)} />;
}

export default DraggableTableHeader;
