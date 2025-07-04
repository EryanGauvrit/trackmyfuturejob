'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button, ButtonProps, buttonVariants } from '../../ui/button';

interface ButtonBurgerProps extends ButtonProps {
    isOpen?: boolean;
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ButtonBurger = ({
    onClick,
    className,
    variant,
    size = 'default',
    tooltip,
    asChild = true,
    isOpen = true,
    ...props
}: ButtonBurgerProps) => {
    const [open, setOpen] = useState(isOpen);

    size = !size ? 'default' : size;

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    if (size === 'sm' || size === 'default') {
        return (
            <Button
                onClick={(e) => {
                    setOpen(!open);
                    if (onClick) {
                        onClick(e);
                    }
                }}
                variant={variant}
                size={size}
                className={clsx(`flex flex-col gap-[3px]`, className)}
                {...props}
            >
                <span
                    className={`h-[3px] w-5 bg-primary-foreground duration-300 ${open ? `transform rotate-45 translate-y-1.5` : ''}`}
                ></span>
                <span className={`h-[3px] w-5 bg-primary-foreground duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
                <span
                    className={`h-[3px] w-5 bg-primary-foreground duration-300 ${open ? `transform -rotate-45 -translate-y-1.5` : ''}`}
                ></span>
            </Button>
        );
    }
    return (
        <Button
            onClick={(e) => {
                setOpen(!open);
                if (onClick) {
                    onClick(e);
                }
            }}
            className={clsx(buttonVariants({ variant, size: 'default', className }), `flex flex-col gap-[7px]`)}
            {...props}
        >
            <span className={`h-[2px] w-[30px] bg-secondary duration-300 ${open ? `transform rotate-45 translate-y-[9px]` : ''}`}></span>
            <span className={`h-[2px] w-[30px] bg-secondary duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`h-[2px] w-[30px] bg-secondary duration-300 ${open ? `transform -rotate-45 -translate-y-[9px]` : ''}`}></span>
        </Button>
    );
};
ButtonBurger.displayName = 'ButtonBurger';
export default ButtonBurger;
