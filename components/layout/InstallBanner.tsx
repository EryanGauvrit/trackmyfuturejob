'use client';

import logo from '@/assets/Logo.png';
import { usePWAInstallPrompt } from '@/hooks/usePWAInstallPrompt';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useIsPWA } from '@/hooks/useIsPwa';

function isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export default function InstallBanner() {
    const promptEvent = usePWAInstallPrompt();
    const isPWA = useIsPWA();
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mobile = isMobile();

        if (promptEvent && mobile && !isPWA) {
            setShouldShow(true);
        }
    }, [promptEvent, isPWA]);

    const handleInstall = async () => {
        if (!promptEvent) return;

        promptEvent.prompt();

        const result = await promptEvent.userChoice;
        if (result.outcome === 'accepted') {
            console.log('PWA installée');
        } else {
            console.log('Installation refusée');
        }

        setShouldShow(false);
    };

    if (!shouldShow) return null;

    return (
        <Card className="fixed bottom-4 left-4 right-4 z-50 gap-2 py-3">
            <CardHeader className="flex items-center gap-2">
                <Image src={logo} alt="Logo TrackMyFutureJob" width={40} height={40} className="inline-block border rounded-xl p-1" />
                <CardTitle className="text-sm">Installez l'app sur votre écran d’accueil pour une meilleure expérience.</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <Button onClick={handleInstall} variant={'secondary'}>
                    Installer l'app
                </Button>
            </CardFooter>
        </Card>
    );
}
