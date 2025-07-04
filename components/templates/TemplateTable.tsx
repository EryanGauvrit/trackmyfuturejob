'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useScreenSizes } from '@/hooks/useScreenSizes';
import { getCommonPinningStyles } from '@/lib/table-utils';
import { cn } from '@/lib/utils';
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cell, Table as TableModel, flexRender } from '@tanstack/react-table';
import { CircleAlert } from 'lucide-react';
import { DataTablePagination } from '../table/DataTablePagination';
import { DataTablePaginationClient } from '../table/DataTablePaginationClient';
import DraggableTableHeader from '../table/DraggableTableHeader';
import { Alert, AlertTitle } from '../ui/alert';
import { Skeleton } from '../ui/skeleton';

interface TemplateTable<TData, TValue> {
    data: TData[];
    notFoundMessage?: string;
    labelItemFound?: string;
    table: TableModel<TData>;
    loading?: boolean;
    totalPages?: number;
    totalRows?: number;
    needPagination?: boolean;
    tableAction?: React.ReactNode;
    clientPagination?: boolean;
    pageSizes?: number[];
    customPagination?: React.ReactNode;
    classNameHeader?: string;
    disableNextPage?: boolean;
    onNextPage?: () => void;
    onLimitChange?: (limit: number) => void;
    title?: string;
    icon?: React.ReactNode;
    className?: string;
    actionMessage?: React.ReactNode;
    headerMessage?: string;
    maxHeight?: string;
    tableHeaderHeight?: string;
}

export function TemplateTable<TData, TValue>({
    data,
    labelItemFound,
    notFoundMessage,
    loading,
    totalPages,
    totalRows,
    needPagination,
    table,
    tableAction,
    clientPagination,
    pageSizes,
    customPagination,
    classNameHeader,
    disableNextPage,
    onNextPage,
    onLimitChange,
    icon,
    title,
    className,
    actionMessage,
    headerMessage,
    maxHeight = 'calc(100vh - 155px)',
    tableHeaderHeight = '52px',
}: TemplateTable<TData, TValue>) {
    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            table.setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string);
                const newIndex = columnOrder.indexOf(over.id as string);
                return [...arrayMove(columnOrder, oldIndex, newIndex).filter((item: any) => item !== 'actions'), 'actions'];
            });
        }
    }

    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));
    const { height } = useScreenSizes();

    return (
        <div className={cn('w-full grid grid-cols-1 h-full text-card-foreground overflow-auto', className)} style={{ maxHeight }}>
            <div className={'px-5 flex flex-1 gap-10 items-center bg-background sticky z-15 left-0 top-0 py-2 h-fit'}>
                {title && (
                    <h2 className="text-2xl flex gap-2 items-center">
                        {icon}
                        {title} <span className="text-lg">({totalRows || 0})</span>
                    </h2>
                )}
                {tableAction && tableAction}
                {customPagination ?? (
                    <div className="flex flex-col items-end grow">
                        {needPagination && totalPages && (
                            <DataTablePagination totalPages={totalPages} totalRows={totalRows} pageSizes={pageSizes} />
                        )}
                        {clientPagination && (
                            <DataTablePaginationClient
                                table={table}
                                pageSizes={pageSizes}
                                disableNextPage={disableNextPage}
                                onNextPage={onNextPage}
                                onLimitChange={onLimitChange}
                            />
                        )}
                        {actionMessage && actionMessage}
                    </div>
                )}
            </div>
            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToHorizontalAxis]}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <Table className="grow">
                    <TableHeader className={cn('sticky z-15 bg-secondary')} style={{ top: tableHeaderHeight }}>
                        {headerMessage && (
                            <TableRow className="border-none">
                                <TableHead colSpan={table.getAllColumns().length} className="text-base text-center font-bold">
                                    {headerMessage}
                                </TableHead>
                            </TableRow>
                        )}
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                <SortableContext items={table.getState().columnOrder} strategy={horizontalListSortingStrategy}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <DraggableTableHeader
                                                key={header.id}
                                                header={header}
                                                className={cn('bg-secondary', classNameHeader)}
                                            />
                                        );
                                    })}
                                </SortableContext>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <>
                                {Array.from({ length: 8 }).map((_, rowIdx) => (
                                    <TableRow key={rowIdx} className="border-b last:border-b-0">
                                        <TableCell colSpan={table.getAllColumns().length} className="h-16">
                                            <Skeleton className="w-full h-full" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <>
                                {table.getRowModel().rows?.length ? (
                                    <>
                                        {table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <SortableContext
                                                        key={cell.id}
                                                        items={table.getState().columnOrder}
                                                        strategy={horizontalListSortingStrategy}
                                                    >
                                                        <DragAlongCell cell={cell} />
                                                    </SortableContext>
                                                ))}
                                            </TableRow>
                                        ))}
                                        {table.getRowModel().rows.length <= 5 &&
                                            Array.from({
                                                length: height / 110 - table.getRowModel().rows.length,
                                            }).map((_, rowIdx) => (
                                                <TableRow key={`empty-row-${rowIdx}`} className=" hover:bg-background">
                                                    <TableCell colSpan={table.getAllColumns().length} className="h-17" />
                                                </TableRow>
                                            ))}
                                    </>
                                ) : (
                                    <TableRow style={{ height: (height / 110) * 68 }}>
                                        <TableCell colSpan={table.getAllColumns().length}>
                                            <Alert className="max-w-md mx-auto text-wrap">
                                                <CircleAlert />
                                                <AlertTitle>{notFoundMessage || `No ${labelItemFound || 'items'} found`}</AlertTitle>
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                    {/* <TableFooter className="sticky bottom-0 z-10 bg-secondary border-none">
                        <TableRow>
                            <TableCell colSpan={table.getAllColumns().length} className="relative p-0 border-none">
                               
                            </TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </DndContext>
        </div>
    );
}

const DragAlongCell = <TData, TValue>({ cell }: { cell: Cell<TData, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    });

    return (
        <TableCell
            ref={setNodeRef}
            style={{
                opacity: isDragging ? 0.8 : 1,
                position: 'relative',
                transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
                transition: 'width transform 0.2s ease-in-out',
                width: cell.column.getSize(),
                zIndex: isDragging ? 1 : 0,
                ...getCommonPinningStyles(cell.column),
            }}
            className="bg-background"
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    );
};
