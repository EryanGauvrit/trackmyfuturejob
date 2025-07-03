import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import prisma from './prisma';
import { PrismaClient } from '@/generated/prisma';

jest.mock('./prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
