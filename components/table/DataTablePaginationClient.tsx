'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table as TableModel } from '@tanstack/react-table';

export function DataTablePaginationClient<TData, TValue>({
    onLimitChange,
    disableNextPage,
    onNextPage,
    pageSizes = [10, 25, 50, 100],
    table,
}: {
    pageSizes?: number[];
    table: TableModel<TData>;
    disableNextPage?: boolean;
    onNextPage?: () => void;
    onLimitChange?: (limit: number) => void;
}) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            onLimitChange && onLimitChange(Number(value));
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-fit">
                            <SelectValue placeholder={table.getState().pagination.pageSize}>
                                {table.getState().pagination.pageSize}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizes.map((pageSize, index) => (
                                <SelectItem key={index} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col items-center space-x-2">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 flex"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => (onNextPage ? onNextPage() : table.nextPage())}
                        disabled={onNextPage ? disableNextPage : !table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 flex"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
