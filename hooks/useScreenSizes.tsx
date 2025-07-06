import { useEffect, useState } from 'react';

export const useScreenSizes = () => {
    const [width, setWidth] = useState(window?.innerWidth);
    const [height, setHeight] = useState(window?.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window?.innerWidth);
            setHeight(window?.innerHeight);
        };

        window?.addEventListener('resize', handleResize);

        // Initial size
        handleResize();

        return () => {
            window?.removeEventListener('resize', handleResize);
        };
    }, []);

    return { width, height };
};
