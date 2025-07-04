import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';

type AutocompleteProps = {
    placeholder?: string;
    value?: string;
    className?: string;
    classNameContent?: string;
    data: { label: string; value: any }[];
    onSelect: (value: number | string) => void;
};

const Autocomplete = ({ classNameContent, className, data, onSelect, placeholder = 'Select an option', value }: AutocompleteProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn('w-[200px] justify-between overflow-hidden', !value && 'text-muted-foreground', className)}
                >
                    {value ? data.find((item) => item.value === value)?.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-[200px] p-0', classNameContent)}>
                <Command>
                    {data.length > 5 && <CommandInput placeholder={placeholder} />}
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                value={'all'}
                                key={'all'}
                                onSelect={() => {
                                    onSelect('');
                                }}
                            >
                                All
                                <Check className={cn('ml-auto', !value ? 'opacity-100' : 'opacity-0')} />
                            </CommandItem>
                            {data.map(
                                (item) =>
                                    item.value && (
                                        <CommandItem
                                            value={item.value}
                                            key={item.value}
                                            onSelect={(currentValue) => {
                                                onSelect(currentValue);
                                            }}
                                        >
                                            {item.label}
                                            <Check className={cn('ml-auto', item.value === value ? 'opacity-100' : 'opacity-0')} />
                                        </CommandItem>
                                    ),
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Autocomplete;
