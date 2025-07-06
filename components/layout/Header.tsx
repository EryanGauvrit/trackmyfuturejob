'use client';

import logo from '@/assets/Logo.png';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsPWA } from '@/hooks/useIsPwa';
import { signOut, useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import ButtonBurger from '../buttons/ButtonBurger';
import ButtonSubmit from '../buttons/ButtonSubmit';
import { Button } from '../ui/button';
import Navbar from './Navbar';

const ButtonSwithTheme = dynamic(() => import('../buttons/ButtonSwithTheme').then((m) => m.default), {
    ssr: false,
});

const Header = () => {
    const isPWA = useIsPWA();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useIsMobile();
    const headerRef = useRef<HTMLHeadElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!isMenuOpen || !isMobile) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, isMobile]);

    useEffect(() => {
        if (isMobile) {
            setIsMenuOpen(false);
        }
    }, [pathname, isMobile]);

    return (
        <header
            ref={headerRef}
            className={cn(
                'w-full py-3 md:p-5 bg-card border-border border-b-2 flex flex-col md:flex-row items-center justify-between md:items-end gap-5',
                isPWA ? 'flex-row sticky top-0 left-0 z-40' : '',
            )}
        >
            <div className="flex justify-between md:justify-around items-center w-full md:w-auto px-5 md:pl-2 md:pr-5 xl:pr-10">
                <Link href="/" className="flex items-center gap-2 w-fit text-nowrap">
                    <Image
                        priority
                        src={logo}
                        alt="Logo TrackMyFutureJob"
                        width={isMobile ? 25 : 40}
                        height={isMobile ? 25 : 40}
                        className="rounded-full"
                    />
                    <h1 className="md:text-2xl font-bold">TrackMyFutureJob</h1>
                </Link>
                <div className={cn('flex flex-row-reverse items-center md:hidden', isPWA ? 'hidden' : '')}>
                    <ButtonBurger
                        className=" hover:bg-transparent bg-transparent"
                        size={'lg'}
                        onClick={() => {
                            setIsMenuOpen((b) => !b);
                        }}
                        isOpen={isMenuOpen}
                    />
                    <ButtonSwithTheme />
                </div>
            </div>
            {(isMenuOpen || !isMobile || isPWA) && (
                <>
                    {data && !isPWA && <Navbar />}
                    <div className={cn('flex items-center gap-1.5', isPWA ? 'pr-5' : '')}>
                        <ButtonSwithTheme className={cn('hidden md:block', isPWA ? 'block' : '')} size={isPWA ? 'xs_icon' : undefined} />
                        {data ? (
                            <ButtonSubmit
                                isLoading={isLoading}
                                variant={'destructive'}
                                size={isPWA ? 'xs_icon' : 'sm'}
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
                                {isPWA ? <LogOut /> : 'Se déconnecter'}
                            </ButtonSubmit>
                        ) : (
                            <div className={cn('flex items-center gap-2', isPWA ? 'hidden' : '')}>
                                <Button variant={'ghost'} asChild>
                                    <Link href="/auth/login">Se connecter</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/auth/signup">S'inscrire</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
