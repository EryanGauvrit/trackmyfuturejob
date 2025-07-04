import ButtonBack from '@/components/layout/buttons/ButtonBack';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center gap-5 flex-1 mt-10 container mx-auto">
            <h1 className="text-4xl font-bold text-destructive">404</h1>
            <h2 className="text-2xl font-bold text-center">Oups! La page que vous recherchez est introuvable.</h2>
            <p className="text-lg font-semibold text-primary mt-4 text-center">
                Vous avez peut-être mal tapé l'adresse ou la page a peut-être été déplacée.
            </p>
            <div className="flex gap-4 justify-center items-center flex-wrap">
                <ButtonBack variant="outline" className="relative" message="Retour" />
                <Link href="/" className="text-lg text-primary underline">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
