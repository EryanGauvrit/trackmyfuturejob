import { createAuthClient } from 'better-auth/react';

type ErrorTypes = Partial<
    Record<
        keyof typeof $ERROR_CODES,
        {
            en: string;
            fr: string;
        }
    >
>;

const errorCodes = {
    USER_ALREADY_EXISTS: {
        fr: 'Cet utilisateur existe déjà',
        en: 'This user already exists',
    },
    ACCOUNT_NOT_FOUND: {
        fr: 'Aucun compte trouvé avec cet email',
        en: 'No account found with this email',
    },
    EMAIL_NOT_VERIFIED: {
        fr: 'Email non vérifié',
        en: 'Email not verified',
    },
    SOCIAL_ACCOUNT_ALREADY_LINKED: {
        fr: 'Ce compte est déjà lié à un autre utilisateur',
        en: 'This account is already linked to another user',
    },
    INVALID_EMAIL_OR_PASSWORD: {
        fr: 'Email ou mot de passe invalide',
        en: 'Invalid email or password',
    },
    PASSWORD_TOO_SHORT: {
        fr: 'Le mot de passe doit contenir au moins 8 caractères',
        en: 'Password must be at least 8 characters long',
    },
    PASSWORD_TOO_LONG: {
        fr: 'Le mot de passe doit contenir au maximum 128 caractères',
        en: 'Password must be at most 128 characters long',
    },
    INVALID_TOKEN: {
        fr: 'Token invalide',
        en: 'Invalid token',
    },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: 'fr' | 'en' = 'fr') => {
    if (code in errorCodes) {
        return errorCodes[code as keyof typeof errorCodes][lang];
    }
    console.error(`Error code ${code} not found in errorCodes`);
    return code;
};

export const { signIn, signUp, useSession, $ERROR_CODES, signOut } = createAuthClient();
