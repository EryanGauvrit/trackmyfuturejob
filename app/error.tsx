'use client'; // Error boundaries must be Client Components

import ButtonBack from '@/components/buttons/ButtonBack';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex-1 flex flex-col justify-center gap-4 px-2 py-10">
            <h1 className={cn('text-4xl text-center text-destructive')}>Erreur inconnue</h1>
            <p className="text-center">Une erreur inconnue s'est produite. Veuillez réessayer plus tard.</p>
            <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={() => reset()}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Réessayer
                </Button>
                <ButtonBack className="relative" variant="destructive" message="Retour" />
                <a className={cn(buttonVariants({ variant: 'ghost' }))} href={'/'}>
                    <Home className="mr-2 h-4 w-4" />
                    Accueil
                </a>
            </div>
        </main>
    );
}
