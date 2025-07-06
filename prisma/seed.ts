import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const dbInitializer = async () => {
    // await prisma.application.createMany({
    //     data: [
    //         {
    //             company: 'Google',
    //             title: 'Software Engineer',
    //             status: 'Envoyée',
    //             location: 'Paris',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
    //             notes: 'Entretien prévu le 15 mars',
    //             link: 'https://careers.google.com/jobs/results/123456789-software-engineer/',
    //             createdAt: new Date('2023-01-15'),
    //             updatedAt: new Date('2023-01-15'),
    //         },
    //         {
    //             company: 'Meta',
    //             title: 'Data Scientist',
    //             status: 'En attente',
    //             location: 'Londres',
    //             type: 'Stage',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: '1 Hacker Way, Menlo Park, CA 94025, USA',
    //             notes: 'En attente de réponse',
    //             link: 'https://www.metacareers.com/jobs/123456789-data-scientist/',
    //             createdAt: new Date('2023-02-20'),
    //             updatedAt: new Date('2023-02-20'),
    //         },
    //         {
    //             company: 'Amazon',
    //             title: 'Product Manager',
    //             status: 'Acceptée',
    //             location: 'Berlin',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: 'Krausenstraße 38, 10115 Berlin, Germany',
    //             notes: 'Entretien final le 10 avril',
    //             link: 'https://www.amazon.jobs/en/jobs/123456789-product-manager/',
    //             createdAt: new Date('2023-03-05'),
    //             updatedAt: new Date('2023-03-05'),
    //         },
    //         {
    //             company: 'Microsoft',
    //             title: 'Cloud Solutions Architect',
    //             status: 'Rejetée',
    //             location: 'Dublin',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: 'One Microsoft Place, South County Business Park, Leopardstown, Dublin, Ireland',
    //             notes: 'Rejetée après l’entretien technique',
    //             link: 'https://careers.microsoft.com/us/en/job/123456789-cloud-solutions-architect/',
    //             createdAt: new Date('2023-04-10'),
    //             updatedAt: new Date('2023-04-10'),
    //         },
    //         {
    //             company: 'Crédit Agricole',
    //             title: 'Analyste Financier',
    //             status: 'Envoyée',
    //             location: 'Lyon',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: '12 Place Jules Ferry, 69006 Lyon, France',
    //             notes: 'Candidature envoyée le 1er mai',
    //             link: 'https://recrutement.credit-agricole.fr/offres/123456789-analyste-financier/',
    //             createdAt: new Date('2023-05-01'),
    //             updatedAt: new Date('2023-05-01'),
    //         },
    //         {
    //             company: 'Salomon',
    //             title: 'Ingénieur Produit',
    //             status: 'En attente',
    //             location: 'Annecy',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: '100 Avenue de Genève, 74370 Metz-Tessy, France',
    //             notes: 'En attente de réponse suite à l’entretien du 5 juin',
    //             link: 'https://www.salomon.com/fr-fr/jobs/123456789-ingenieur-produit/',
    //             createdAt: new Date('2023-06-05'),
    //             updatedAt: new Date('2023-06-05'),
    //         },
    //         {
    //             company: 'L’Oréal',
    //             title: 'Chef de Produit',
    //             status: 'Acceptée',
    //             location: 'Clichy',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: '41 Rue Martre, 92110 Clichy, France',
    //             notes: 'Offre acceptée le 20 juin',
    //             link: 'https://careers.loreal.com/fr_FR/jobs/123456789-chef-de-produit/',
    //             createdAt: new Date('2023-06-20'),
    //             updatedAt: new Date('2023-06-20'),
    //         },
    //         {
    //             company: 'Airbus',
    //             title: 'Ingénieur Aéronautique',
    //             status: 'Rejetée',
    //             location: 'Toulouse',
    //             type: 'CDI',
    //             userId: 'KN3YmIlojcMOwnvxFUi1ouVKnBZfHOf7',
    //             address: '1 Rond-Point Maurice Bellonte, 31707 Blagnac, France',
    //             notes: 'Rejetée après l’entretien du 15 juillet',
    //             link: 'https://www.airbus.com/careers/job-search.html#/search?query=123456789-ingenieur-aeronautique',
    //             createdAt: new Date('2023-07-15'),
    //             updatedAt: new Date('2023-07-15'),
    //         },
    //     ],
    // });
};

dbInitializer()
    .then(() => {
        console.log('Database initialized');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
