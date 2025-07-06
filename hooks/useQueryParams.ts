'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useQueryParams = () => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const setQueryParams = useCallback(
        (newParams: Record<string, string | number | null>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(newParams).forEach(([key, value]) => {
                if (value === null) {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            });

            router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
        },

        [router, searchParams],
    );

    return setQueryParams;
};

export default useQueryParams;
