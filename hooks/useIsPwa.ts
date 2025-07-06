import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

export function useIsPWA() {
    const [isPWA, setIsPWA] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const matchStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const iosStandalone = (navigator as any).standalone === true;

        setIsPWA(matchStandalone || iosStandalone);
    }, []);

    return isMobile;
}
