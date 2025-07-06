'use client';

import { useSession } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isPending } = useSession();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (!isPending && data && (pathName === '/auth/login' || pathName === '/auth/signup')) {
            router.push('/dashboard');
        }
    }, [data, pathName, router, isPending]);

    return <>{children}</>;
};

export default AuthProvider;
