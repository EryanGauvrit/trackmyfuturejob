import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { Config } from './config';

const prisma = new PrismaClient();
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 4,
    },
    plugins: [nextCookies()],
    database: prismaAdapter(prisma, {
        provider: 'mysql', // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        google: {
            // autoSignIn: true,
            clientId: Config.GOOGLE_CLIENT_ID,
            clientSecret: Config.GOOGLE_CLIENT_SECRET,
            scope: ['profile', 'email'],
            redirectURI: `${Config.BETTER_AUTH_URL}/api/auth/callback/google`,
        },
    },
});
