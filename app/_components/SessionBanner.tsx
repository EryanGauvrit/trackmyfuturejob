import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth-server';
import { Info } from 'lucide-react';
import Link from 'next/link';

const SessionBanner = async () => {
    const session = await getSession();

    if (!session) return null;

    return (
        <Alert className="max-w-2xl m-auto my-2 flex flex-wrap items-center justify-center sm:justify-between gap-4">
            <AlertTitle className="text-xl font-bold flex items-center gap-2">
                <Info />
                Salut {session.user.name} ! 👋
            </AlertTitle>
            <Button asChild variant={'secondary'} size={'lg'}>
                <Link href={'/dashboard'}>Accéder au tableau de bord</Link>
            </Button>
        </Alert>
    );
};

export default SessionBanner;
