'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ButtonVariants } from '@/types/variants';

type RangeDateInputProps = React.HTMLAttributes<HTMLDivElement> & {
    date?: DateRange;
    setDate?: SelectRangeEventHandler | undefined;
    variant?: ButtonVariants;
};

export function RangeDateInput({ className, variant = 'outline', date, setDate }: RangeDateInputProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={variant}
                        className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span className="text-muted-foreground">Choisir une date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
                </PopoverContent>
            </Popover>
        </div>
    );
}
