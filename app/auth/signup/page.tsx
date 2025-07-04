'use client';

import GoogleIcon from '@/assets/google_icon.png';
import ButtonSubmit from '@/components/buttons/ButtonSubmit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, signUp } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <main className="container mx-auto mt-10">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Créer un compte</CardTitle>
                    <CardDescription>Connectez-vous pour accéder à votre compte et profiter de toutes les fonctionnalités.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center mb-4">
                        <ButtonSubmit
                            isLoading={isLoading}
                            type="button"
                            variant="outline"
                            onClick={() =>
                                signIn.social({
                                    provider: 'google',
                                    fetchOptions: {
                                        onRequest: () => {
                                            setIsLoading(true);
                                        },
                                        onResponse: () => {
                                            setIsLoading(false);
                                        },
                                        onError: (ctx) => {
                                            toast.error(ctx.error.message);
                                        },
                                        onSuccess: () => {
                                            toast.success('Connexion réussie !');
                                        },
                                    },
                                })
                            }
                        >
                            <Image src={GoogleIcon} alt="Google Icon" width={20} height={20} />
                            Google
                        </ButtonSubmit>
                    </div>
                    <form
                        action={async (formData) => {
                            const form = Object.fromEntries(formData.entries()) as {
                                name: string;
                                email: string;
                                password: string;
                            };
                            console.log(form);
                            await signUp.email({
                                email: form.email,
                                password: form.password,
                                name: form.name,
                                fetchOptions: {
                                    onRequest: () => {
                                        setIsLoading(true);
                                    },
                                    onResponse: () => {
                                        setIsLoading(false);
                                    },
                                    onError: (ctx) => {
                                        toast.error(ctx.error.message);
                                    },
                                    onSuccess: () => {
                                        toast.success('Inscription réussie !');
                                    },
                                },
                            });
                        }}
                    >
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nom d'utilisateur</Label>
                                <Input type="text" id="name" name="name" placeholder="Votre nom" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email" placeholder="Votre email" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
                            </div>
                            <ButtonSubmit isLoading={isLoading} type="submit">
                                S'inscrire
                            </ButtonSubmit>
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-500">
                            Déjà un compte ?{' '}
                            <Link href="/auth/login" className="text-blue-500 hover:underline">
                                Connectez-vous
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default Page;
