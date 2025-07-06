import { useEffect, useState } from 'react';

export function useIsPWA() {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const matchStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const iosStandalone = (navigator as any).standalone === true;

        setIsPWA(matchStandalone || iosStandalone);
    }, []);

    return isPWA;
}
