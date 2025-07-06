'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import { useSearchParams } from 'next/navigation';

export function DataTablePagination({
    loadInitial,
    nextPage,
    previousPage,
    totalPages = 1,
    gotToLastPage,
    totalRows,
    pageSizes = [10, 25, 50, 100],
}: {
    loadInitial?: () => void;
    nextPage?: () => void;
    previousPage?: () => void;
    totalPages: number;
    gotToLastPage?: () => void;
    totalRows?: number;
    pageSizes?: number[];
}) {
    const searchParams = useSearchParams();
    const limitPerPage = parseInt(searchParams.get('limit') ?? '10');
    const page = parseInt(searchParams.get('page') ?? '1');
    const [pageSize, setPageSize] = useState(limitPerPage);
    const [actualPage, setActualPage] = useState(page);
    const queryParams = useQueryParams();

    const changePageSize = (pageSize: number) => {
        setPageSize(pageSize);
        setActualPage(1);
        queryParams({ limit: pageSize, page: null });
    };

    const resetIndex = () => {
        setActualPage(1);
        queryParams({ page: null, limit: null });
        loadInitial && loadInitial();
    };

    const nextPagePagination = () => {
        setActualPage(actualPage + 1);
        queryParams({ page: actualPage + 1 });
        nextPage && nextPage();
    };

    const previousPagePagination = () => {
        setActualPage(actualPage - 1);
        queryParams({ page: actualPage - 1 });
        previousPage && previousPage();
    };

    const gotToLastPagePagination = () => {
        if (!totalPages) return;
        setActualPage(totalPages);
        queryParams({ page: totalPages });
        gotToLastPage && gotToLastPage();
    };

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => {
                            changePageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize}>{pageSize}</SelectValue>
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
                        Page {actualPage} of {totalPages || 1}
                    </div>
                    {totalRows ? (
                        <p>
                            Total : {totalRows} {totalRows === 1 ? 'row' : 'rows'}
                        </p>
                    ) : null}
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="h-8 w-8 p-0 flex" onClick={resetIndex} disabled={actualPage <= 1}>
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={previousPagePagination} disabled={actualPage <= 1}>
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={nextPagePagination} disabled={actualPage >= totalPages}>
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 flex"
                        onClick={gotToLastPagePagination}
                        disabled={actualPage >= totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
