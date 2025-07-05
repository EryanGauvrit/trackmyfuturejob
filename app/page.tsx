import logo from '@/assets/Logo.png';
import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getSession } from '@/lib/auth-server';
import { Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Home = async () => {
    const session = await getSession();

    return (
        <TemplateStandardPage>
            {session && session.user && (
                <Alert className="max-w-2xl m-auto my-2 flex flex-wrap items-center justify-center sm:justify-between gap-4">
                    <AlertTitle className="text-xl font-bold flex items-center gap-2">
                        <Info />
                        Salut {session.user.name} ! 👋
                    </AlertTitle>
                    <Button asChild variant={'secondary'} size={'lg'}>
                        <Link href={'/dashboard'}>Accéder au tableau de bord</Link>
                    </Button>
                </Alert>
            )}
            <section className="flex flex-col-reverse md:flex-row justify-center gap-4 mb-8 w-full">
                <Card className="w-full">
                    <CardHeader>
                        <h2 className="text-2xl font-bold flex items-center flex-wrap">
                            Bienvenue sur
                            <span className="flex items-center">
                                <Image src={logo} alt="Logo TrackMyFutureJob" width={30} height={30} className="inline-block ml-2" />
                                TrackMyFutureJob !
                            </span>
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            TrackMyFutureJob est une application conçue pour vous aider à gérer votre recherche d'emploi de manière efficace
                            et organisée. Vous pouvez suivre vos candidatures, gérer vos contacts professionnels et bien plus encore.
                        </p>
                        <p className="text-lg mt-4">
                            Pour commencer, connectez-vous ou inscrivez-vous si vous n'avez pas encore de compte.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <CardAction>
                            <Button asChild size={'lg'}>
                                <Link href={'/auth/signin'}>👉 Commencer maintenant !</Link>
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
                <aside className="w-full bg-amber-500"></aside>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Le concept</h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            TrackMyFutureJob est conçu pour simplifier votre recherche d'emploi. Il vous permet de garder une trace de vos
                            candidatures et de vos contacts, le tout dans une interface intuitive et facile à utiliser.
                        </p>
                        <p className="text-lg mt-2">
                            Que vous soyez étudiant, en reconversion professionnelle ou simplement à la recherche d'un nouveau défi,
                            TrackMyFutureJob est là pour vous accompagner dans votre parcours professionnel.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <CardAction>
                            <Button asChild size={'lg'} variant={'secondary'}>
                                <Link href={'/auth/signup'}>💡Inscrivez-vous dès maintenant !</Link>
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Comment ça marche ?</h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            TrackMyFutureJob vous permet de créer un compte, de gérer vos candidatures et de les suivre facilement et
                            précisément.
                        </p>
                        <p className="text-lg mt-4">
                            Commencez par créer un compte, puis explorez les différentes fonctionnalités pour optimiser votre recherche
                            d'emploi.
                        </p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <CardAction>
                            <Button asChild size={'lg'}>
                                <Link href={'/auth/signin'}>🔥Connectez-vous pour commencer !</Link>
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">La simplicité avant tout</h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            TrackMyFutureJob est conçu pour être simple et efficace. Vous pouvez facilement ajouter vos candidatures, suivre
                            leur statut et gérer vos contacts professionnels.
                        </p>
                        <p className="text-lg mt-4">
                            Notre objectif est de vous offrir une expérience utilisateur fluide et agréable, afin que vous puissiez vous
                            concentrer sur ce qui compte vraiment : votre recherche d'emploi.
                        </p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <CardAction>
                            <Button asChild size={'lg'} variant={'secondary'}>
                                <Link href={'/auth/signup'}>🎯 Essayer dès à présent</Link>
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
            </section>
        </TemplateStandardPage>
    );
};

export default Home;
