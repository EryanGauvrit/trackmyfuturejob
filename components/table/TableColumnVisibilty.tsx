'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BetweenVerticalStart } from 'lucide-react';
import { Table } from '@tanstack/react-table';

const TableColumnVisibility = <TData, TValue>({ table }: { table?: Table<TData> }) => {
    const [open, setOpen] = useState(false);

    if (!table) {
        return (
            <Button variant="ghost" size={'sm'} disabled>
                <BetweenVerticalStart />
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu modal={false} open={open}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size={'sm'}
                        tooltip={
                            <span className="text-center inline-block">
                                Filter columns
                                <br />
                                {table.getAllLeafColumns().filter((col) => col.getIsVisible()).length}/{table.getAllLeafColumns().length}
                            </span>
                        }
                        tooltipSide="top"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <BetweenVerticalStart />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="start"
                    className="max-h-[60vh]"
                    onEscapeKeyDown={() => setOpen(false)}
                    onPointerDownOutside={() => setOpen(false)}
                    onInteractOutside={() => setOpen(false)}
                    onFocusOutside={() => setOpen(false)}
                >
                    {table.getAllLeafColumns().map(
                        (column) =>
                            column.getCanHide() && (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value: any) => {
                                        column.toggleVisibility(!!value);
                                        const tableState = table.getState();
                                        const columnOrderWithoutActions = tableState.columnOrder.filter((id) => id !== 'actions');
                                        table.setColumnOrder(
                                            value
                                                ? [...columnOrderWithoutActions, column.id, 'actions']
                                                : tableState.columnOrder.filter((id) => id !== column.id),
                                        );
                                    }}
                                >
                                    {column.columnDef.id}
                                </DropdownMenuCheckboxItem>
                            ),
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TableColumnVisibility;
