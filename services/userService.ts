'use server';

import prisma from '@/lib/prisma';
import { wrapResponse } from '@/lib/wrapResponse';
import { updateUserSchema } from '@/lib/zod/userSchema';
import { User } from '@prisma/client';
import { BetterAuthError } from 'better-auth';
import { isAuthenticated } from './authService';

export const getConnectedUser = wrapResponse(async () => {
    const userAuth = await isAuthenticated();

    if (!userAuth || !userAuth.email) {
        throw new BetterAuthError("Tu n'es pas autorisé à effectuer cette action");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userAuth.email,
        },
    });

    if (!user) {
        throw new BetterAuthError("Tu n'as pas les droits pour effectuer cette action");
    }

    return user;
});

export const getUserByEmail = wrapResponse(async (email: string) => {
    const userAuth = await isAuthenticated();

    if (!userAuth || !userAuth.email) {
        throw new BetterAuthError("Tu n'es pas autorisé à effectuer cette action");
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new BetterAuthError("Tu n'as pas les droits pour effectuer cette action");
    }

    return user;
});

export const updateUser = wrapResponse(async (body: FormData, id: string) => {
    const userConnected = (await isAuthenticated(true)) as unknown as User;
    const dataBrut = Object.fromEntries(body);
    const { success, error, data } = updateUserSchema.safeParse(dataBrut);

    if (!success) {
        throw error;
    }

    if (userConnected.id !== id) {
        throw new BetterAuthError("Tu n'as pas les droits pour effectuer cette action");
    }

    const userExist = await prisma.user.findUnique({ where: { id } });

    if (!userExist) {
        throw new Error('Utilisateur non trouvé');
    }

    return await prisma.user.update({
        where: {
            id,
        },
        data: { ...data, name: data.name?.trim() },
    });
});

export const deleteUser = wrapResponse(async (id: string) => {
    const userAuth = await isAuthenticated();

    if (!userAuth || !userAuth.email) {
        throw new BetterAuthError("Tu n'es pas autorisé à effectuer cette action");
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userAuth.email,
        },
    });

    if (!user || user.id !== id) {
        throw new BetterAuthError("Tu n'as pas les droits pour effectuer cette action");
    }

    await prisma.user.delete({
        where: {
            id,
        },
    });
});
