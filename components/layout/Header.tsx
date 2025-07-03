'use client';

import logo from '@/assets/Logo.png';
import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ButtonSubmit from '../ButtonSubmit';
import { Button } from '../ui/button';
import Navbar from './Navbar';

const Header = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data } = useSession();

    return (
        <header className="w-full p-5 bg-card border-border border-b-2 flex justify-between items-end gap-10">
            <Link href="/" className="flex items-center gap-2 w-fit text-nowrap">
                <Image priority src={logo} alt="Logo TrackMyFutureJob" width={40} height={40} className="rounded-full" />
                <h1 className="text-2xl font-bold">TrackMyFutureJob</h1>
            </Link>
            {data && <Navbar />}
            {data ? (
                <ButtonSubmit
                    isLoading={isLoading}
                    variant={'destructive'}
                    size={'sm'}
                    onClick={async () => {
                        await signOut({
                            fetchOptions: {
                                onRequest: () => {
                                    setIsLoading(true);
                                },
                                onResponse: () => {
                                    setIsLoading(false);
                                },
                                onError: () => {
                                    toast.error('Erreur lors de la déconnexion');
                                },
                                onSuccess: () => {
                                    toast.success('Vous êtes déconnecté');
                                    router.push('/auth/login');
                                },
                            },
                        });
                    }}
                >
                    Se déconnecter
                </ButtonSubmit>
            ) : (
                <div className="flex items-center gap-2">
                    <Button variant={'ghost'} asChild>
                        <Link href="/auth/login">Se connecter</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/auth/signup">S'inscrire</Link>
                    </Button>
                </div>
            )}
        </header>
    );
};

export default Header;
