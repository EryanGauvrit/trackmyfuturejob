'use client';

import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import React from 'react';
import { Button, ButtonProps } from '../ui/button';

type ButtonSortingTableProps = ButtonProps & {
    actionSort: () => void;
};

const ButtonSortingTable = ({ children, actionSort, className, ...props }: ButtonSortingTableProps) => {
    const [sorted, setSorted] = React.useState(false);

    return (
        <Button
            variant="ghost"
            className={cn('flex items-center justify-between gap-1 w-full', className)}
            onClick={() => {
                setSorted((prev) => !prev);
                actionSort();
            }}
            {...props}
        >
            {children}
            <ArrowUp className={`duration-150 ${sorted ? 'rotate-180' : ''}`} />
        </Button>
    );
};

export default ButtonSortingTable;
