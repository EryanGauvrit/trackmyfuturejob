'use client';

import { useIsPWA } from '@/hooks/useIsPwa';
import { useSession } from '@/lib/auth-client';
import { House, LogIn, User, Zap } from 'lucide-react';
import Link from 'next/link';
import NavLink from '../NavLink';

const Footer = () => {
    const isPWA = useIsPWA();
    const { data } = useSession();
    return (
        <footer className={isPWA ? 'sticky bottom-0 left-0 z-40 bg-background border-t' : ''}>
            {isPWA ? (
                <nav className="w-full grid grid-cols-3">
                    <NavLink href={'/'} className="py-6 w-full rounded-none" activeClassName="text-primary" variant="ghost">
                        <span className="sr-only">Accueil</span>
                        <House />
                    </NavLink>
                    {data && data.user ? (
                        <>
                            <NavLink
                                href={'/dashboard'}
                                className="py-6 w-full rounded-none"
                                activeClassName="text-primary"
                                variant="ghost"
                            >
                                <span className="sr-only">Tableau de bord</span>
                                <Zap />
                            </NavLink>
                            <NavLink href={'/profile'} className="py-6 w-full rounded-none" activeClassName="text-primary" variant="ghost">
                                <span className="sr-only">Mon profil</span>
                                <User />
                            </NavLink>
                        </>
                    ) : (
                        <NavLink href="/auth/login" variant={'ghost'} className="py-6 w-full rounded-none col-span-2">
                            <span className="sr-only">Se connecter</span>
                            <LogIn />
                        </NavLink>
                    )}
                </nav>
            ) : (
                <div className="container mx-auto text-center py-4">
                    <p className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} TrackMyFutureJob. Tous droits réservés.
                        <Link href={'/legal/policy'} className="text-secondary hover:underline mx-2">
                            Politique de confidentialité
                        </Link>
                        -
                        <Link href={'/contact'} className="text-secondary hover:underline ml-2">
                            Nous contacter
                        </Link>
                    </p>
                </div>
            )}
        </footer>
    );
};

export default Footer;
