const getEnv = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const Config = {
    STAGE: getEnv('STAGE'),
    BETTER_AUTH_URL: getEnv('BETTER_AUTH_URL'),
    BETTER_AUTH_SECRET: getEnv('BETTER_AUTH_SECRET'),
    DATABASE_URL: getEnv('DATABASE_URL'),

    GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),

    LINKEDIN_CLIENT_ID: getEnv('LINKEDIN_CLIENT_ID'),
    LINKEDIN_CLIENT_SECRET: getEnv('LINKEDIN_CLIENT_SECRET'),
};
