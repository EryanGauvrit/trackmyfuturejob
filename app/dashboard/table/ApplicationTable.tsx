'use client';

import { TemplateTable } from '@/components/templates/TemplateTable';
import { filterBoolean, filterByDate } from '@/lib/table-utils';
import { IApplication } from '@/types/application';
import {
    ColumnFiltersState,
    ColumnPinningState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    TableState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ApplicationColumns } from './ApplicationColumns';

const ApplicationTable = ({ applications }: { applications: IApplication[] }) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [state, setState] = useState<Partial<TableState>>();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState({});
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
        right: ['actions'],
    });
    const [columnOrder, setColumnOrder] = useState<string[]>(ApplicationColumns.map((column) => column.id!));

    const table = useReactTable({
        data: applications,
        columns: ApplicationColumns,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnPinningChange: setColumnPinning,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getRowId: (row) => row.id,
        state: {
            ...state,
            columnVisibility,
            columnPinning,
            columnFilters,
            columnOrder,
            rowSelection,
            pagination,
        },
        filterFns: {
            filterBoolean,
            filterByDate,
        },
    });

    useEffect(() => {
        if (rowSelection) {
            setState((prev: any) => ({
                ...prev,
                rowSelection,
            }));
        }

        if (sorting) {
            setState((prev: any) => ({
                ...prev,
                sorting,
            }));
        }
        if (!rowSelection && !sorting) {
            setState(undefined);
        }
    }, [rowSelection, sorting]);

    return (
        <TemplateTable
            clientPagination={applications.length > 30}
            table={table}
            data={applications}
            totalRows={applications.length}
            title="Suivi de mes candidatures"
            maxHeight="100%"
            tableHeaderHeight="auto"
            notFoundMessage="Aucune candidature trouvée"
            icon={<Zap />}
        />
    );
};

export default ApplicationTable;
