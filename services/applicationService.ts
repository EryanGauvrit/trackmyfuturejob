'use server';

import prisma from '@/lib/prisma';
import { wrapResponse } from '@/lib/wrapResponse';
import { addApplicationSchema, updateApplicationSchema } from '@/lib/zod/applicationSchema';
import { IApplication } from '@/types/application';
import { isAuthenticated } from './authService';

export const getApplications = wrapResponse(async (): Promise<IApplication[]> => {
    const user = await isAuthenticated(true);

    return await prisma.application.findMany({
        where: {
            userId: user!.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            _count: {
                select: { interviews: true },
            },
            id: true,
            title: true,
            company: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            address: true,
            link: true,
            location: true,
            notes: true,
            type: true,
        },
    });
});

export const addApplication = wrapResponse(async (body: FormData) => {
    const user = await isAuthenticated(true);

    const dataBrut = Object.fromEntries(body);
    const { success, error, data } = addApplicationSchema.safeParse({ ...dataBrut, link: dataBrut.link ? dataBrut.link : undefined });

    if (!success) {
        throw error;
    }

    const application = await prisma.application.create({
        data: {
            userId: user!.id,
            title: data.title,
            company: data.company,
            status: data.status,
            address: data.address || null,
            link: data.link || null,
            location: data.location,
            notes: data.notes || null,
            type: data.type,
        },
    });

    return application;
});

export const updateApplication = wrapResponse(async (body: FormData) => {
    const user = await isAuthenticated(true);

    const dataBrut = Object.fromEntries(body);
    const { success, error, data } = updateApplicationSchema.safeParse(dataBrut);

    if (!success) {
        throw error;
    }

    const application = await prisma.application.findUnique({
        where: { id: data.id, userId: user!.id },
    });

    // Check if the application exists and belongs to the user
    if (!application) {
        throw new Error("Candidature non trouvée ou vous n'êtes pas autorisé à la modifier");
    }

    return await prisma.application.update({
        where: { id: data.id },
        data: {
            title: data.title,
            company: data.company,
            status: data.status,
            address: data.address,
            link: data.link,
            location: data.location,
            notes: data.notes,
            type: data.type,
        },
    });
});

export const deleteApplication = wrapResponse(async (id: string) => {
    const user = await isAuthenticated(true);

    const application = await prisma.application.findUnique({
        where: { id, userId: user!.id },
    });

    // Check if the application exists and belongs to the user
    if (!application) {
        throw new Error("Candidature non trouvée ou vous n'êtes pas autorisé à la supprimer");
    }

    await prisma.application.delete({
        where: { id },
    });

    return { message: 'Candidature supprimée avec succès' };
});
