import ActionTableHeader from '@/components/table/ActionTableHeader';
import { IApplication } from '@/types/application';
import { ColumnDef } from '@tanstack/react-table';

export const ApplicationColumns: ColumnDef<IApplication>[] = [
    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Date" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        // meta: {
        //     valueType: 'date',
        // },
        // filterFn: 'filterByDate' as any,
    },
    {
        id: 'title',
        accessorKey: 'title',
        header: ({ column, table }) => (
            <ActionTableHeader column={column} label="Titre" setColumnOrder={table.setColumnOrder} enableDragAndDrop />
        ),
        // meta: {
        //     valueType: 'string',
        // },
    },
];
