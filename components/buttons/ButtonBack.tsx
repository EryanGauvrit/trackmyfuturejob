'use client';

import { cn } from '@/lib/utils';
import { ButtonVariants } from '@/types/variants';
import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const ButtonBack = ({ className, message, variant }: { className?: string; message?: string; variant?: ButtonVariants }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Button
            className={cn('absolute top-0 left-0 w-fit', pathname === '/' && 'hidden', className)}
            variant={variant || 'ghost'}
            onClick={() => router.back()}
        >
            <ChevronLeft className="size-5" />
            <span className="sr-only">Retour</span>
            {message || null}
        </Button>
    );
};

export default ButtonBack;
