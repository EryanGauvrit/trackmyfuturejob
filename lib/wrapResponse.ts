import { Config } from '@/config';
import { BetterAuthError } from 'better-auth';
import { ZodError } from 'zod';
import { Variant } from '@/types/variants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getErrorMessage } from './auth-client';

export type StandardResponse<T> = {
    data: T | null;
    error?: string;
    variant: Variant;
};

export const wrapResponse = <T extends (...args: any[]) => Promise<any>>(
    actionFn: T,
): ((...args: Parameters<T>) => Promise<StandardResponse<Awaited<ReturnType<T>>>>) => {
    return async (...args: Parameters<T>) => {
        try {
            Config.STAGE !== 'prod' && (await new Promise((resolve) => setTimeout(resolve, 300)));
            const res = await actionFn(...args);
            return {
                data: res,
                variant: 'default',
            };
        } catch (err: any) {
            console.error(err);
            if (err instanceof ZodError) {
                return {
                    data: null,
                    error: err.errors[0].message,
                    variant: 'destructive',
                };
            }
            if (err instanceof BetterAuthError) {
                return {
                    data: null,
                    error: getErrorMessage(err.message),
                    variant: 'destructive',
                };
            }
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    return {
                        data: null,
                        error: 'Item déjà existant : ' + err.message,
                        variant: 'destructive',
                    };
                }
                if (err.code === 'P2003') {
                    return {
                        data: null,
                        error: 'Des items sont liés à cet élément : ' + err.message,
                        variant: 'destructive',
                    };
                }
                return {
                    data: null,
                    error: err.message,
                    variant: 'destructive',
                };
            }
            if (err instanceof Error) {
                return {
                    data: null,
                    error: err.message,
                    variant: 'destructive',
                };
            }
            return {
                data: null,
                error: `${JSON.stringify(err)}`,
                variant: 'destructive',
            };
        }
    };
};
