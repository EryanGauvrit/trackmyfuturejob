import desktopScreenshot from '@/assets/demo/desktop.webp';
import desktopLightScreenshot from '@/assets/demo/desktop_light.webp';
import logo from '@/assets/Logo.png';
import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import SessionBanner from './_components/SessionBanner';
import AsideDemo from './AsideDemo';

const Home = () => {
    return (
        <TemplateStandardPage>
            <Suspense>
                <SessionBanner />
            </Suspense>
            <section className="flex flex-col justify-center gap-4 w-full items-center xl:grid xl:grid-cols-2">
                <Card className="w-full h-fit">
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
                                <Link href={'/auth/login'}>👉 Commencer maintenant !</Link>
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
                <AsideDemo />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 place-items-center md:h-[350px]">
                <Image
                    src={desktopScreenshot}
                    alt="Application sur desktop en mode sombre"
                    width={1200}
                    height={600}
                    className="rounded-lg h-full object-cover object-left m-auto"
                    priority
                />
                <Image
                    src={desktopLightScreenshot}
                    alt="Application sur desktop en mode clair"
                    width={1200}
                    height={600}
                    className="rounded-lg h-full object-cover object-left m-auto"
                    priority
                />
            </div>
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
                                <Link href={'/auth/login'}>🔥Connectez-vous pour commencer !</Link>
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
