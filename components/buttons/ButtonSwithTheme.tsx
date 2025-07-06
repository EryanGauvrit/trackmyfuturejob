'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ButtonSwithTheme = ({ className }: { className?: string }) => {
    const { setTheme, theme, systemTheme } = useTheme();
    const handleChangeTheme = () => {
        setTheme(theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? 'light' : 'dark');
    };
    return (
        <Button
            onClick={handleChangeTheme}
            variant={'ghost'}
            tooltip={theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? 'Clair' : 'Sombre'}
            className={cn('w-fit', className)}
        >
            {theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? <Sun /> : <MoonStar />}
            <span className="sr-only">Changer le thème</span>
        </Button>
    );
};

export default ButtonSwithTheme;
