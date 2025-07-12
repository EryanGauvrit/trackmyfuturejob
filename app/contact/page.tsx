import { Metadata } from 'next';
import FormContact from './formContact';

export const metadata: Metadata = {
    title: 'Nous contacter',
    description:
        'Si vous avez des questions, des suggestions ou si vous souhaitez simplement nous faire part de vos commentaires, n’hésitez pas à nous contacter via le formulaire ci-dessous.',
    keywords: ['contact', 'nous contacter'],
};

const page = () => {
    return (
        <main className="flex flex-col items-center gap-10 p-10 flex-1">
            <h1 className="text-4xl font-bold uppercase">Nous contacter</h1>
            <FormContact />
        </main>
    );
};

export default page;
