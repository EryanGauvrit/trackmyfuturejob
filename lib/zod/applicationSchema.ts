import z from 'zod';

export const addApplicationSchema = z.object({
    title: z.string().min(1, 'Le titre est requis'),
    company: z.string().min(1, "Le nom de l'entreprise est requis"),
    status: z.string().min(1, 'Le statut de la candidature est requis'),
    address: z.string().optional(),
    link: z.string().url('URL invalide').optional(),
    location: z.string(),
    notes: z.string().max(500, 'Maximum 500 caractères').optional(),
});
