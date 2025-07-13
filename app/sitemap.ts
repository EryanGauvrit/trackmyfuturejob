import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://trackmyfuturejob.com',
            lastModified: new Date(),
        },
        {
            url: 'https://trackmyfuturejob.com/auth/login',
            lastModified: new Date(),
        },
        {
            url: 'https://trackmyfuturejob.com/auth/signup',
            lastModified: new Date(),
        },
        {
            url: 'https://trackmyfuturejob.com/dashboard',
            lastModified: new Date(),
        },
    ];
}
