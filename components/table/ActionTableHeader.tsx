import { Button } from '@/components/ui/button';
import { cn, toCapitalize } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { Column, ColumnOrderState, Updater } from '@tanstack/react-table';
import { GripHorizontal, X } from 'lucide-react';
import ButtonSortingTable from '../buttons/ButtonSortingTable';

const ActionTableHeader = <TData, TValue>({
    column,
    label,
    className,
    setColumnOrder,
    enableDragAndDrop = true,
}: {
    label: string;
    column: Column<TData, unknown>;
    className?: string;
    setColumnOrder?: (updater: Updater<ColumnOrderState>) => void;
    enableDragAndDrop?: boolean;
}) => {
    const { attributes, listeners } = useSortable({
        id: column.id,
    });
    return (
        <div className="flex flex-col h-full">
            <div className={cn('flex', className)}>
                <Button
                    className={column.getCanHide() ? '' : 'hidden'}
                    variant={'ghost'}
                    onClick={() => {
                        column.toggleVisibility(false);
                        setColumnOrder &&
                            setColumnOrder((prev: ColumnOrderState) => {
                                const newOrder = [...prev];
                                const index = newOrder.indexOf(column.id);
                                if (index > -1) {
                                    newOrder.splice(index, 1);
                                }
                                return newOrder;
                            });
                    }}
                >
                    <X size={16} />
                </Button>
                <ButtonSortingTable actionSort={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="w-auto grow">
                    {toCapitalize(label).split(/[_-]/).join(' ')}
                </ButtonSortingTable>
                {enableDragAndDrop && (
                    <Button variant={'ghost'} className="h-fit hover:cursor-move" {...attributes} {...listeners}>
                        <GripHorizontal />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ActionTableHeader;
