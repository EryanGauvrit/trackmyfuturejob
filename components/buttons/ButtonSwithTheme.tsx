'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ButtonSizes, ButtonVariants } from '@/types/variants';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ButtonSwithTheme = ({ className, variant, size }: { className?: string; variant?: ButtonVariants; size?: ButtonSizes }) => {
    const { setTheme, theme, systemTheme } = useTheme();
    const handleChangeTheme = () => {
        setTheme(theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? 'light' : 'dark');
    };
    return (
        <Button
            onClick={handleChangeTheme}
            variant={variant ?? 'ghost'}
            tooltip={theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? 'Clair' : 'Sombre'}
            className={cn('w-fit', className)}
            size={size}
        >
            {theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? (
                <Sun className="m-auto" />
            ) : (
                <MoonStar className="m-auto" />
            )}
            <span className="sr-only">Changer le thème</span>
        </Button>
    );
};

export default ButtonSwithTheme;
