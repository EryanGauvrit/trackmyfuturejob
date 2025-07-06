import { Prisma } from '@/generated/prisma';

export interface IApplication
    extends Prisma.ApplicationGetPayload<{
        select: {
            id: true;
            title: true;
            company: true;
            status: true;
            createdAt: true;
            updatedAt: true;
            address: true;
            link: true;
            location: true;
            notes: true;
            type: true;
        };
    }> {
    _count: {
        interviews: number;
    };
}
