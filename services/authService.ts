'use server';

import { getSession } from '@/lib/auth-server';

export const isAuthenticated = async (throwError = false) => {
    const session = await getSession();

    if (!session?.user && throwError) {
        throw new Error('Accès refusé : vous devez être connecté pour accéder à cette page.');
    }

    return session?.user ?? null;
};
