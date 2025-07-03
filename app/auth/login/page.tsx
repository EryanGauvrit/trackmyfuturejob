'use client';

import GoogleIcon from '@/assets/google_icon.png';
import ButtonSubmit from '@/components/ButtonSubmit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth-client';
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
                    <CardTitle className="text-center text-2xl font-bold">Connexion</CardTitle>
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
                                email: string;
                                password: string;
                            };
                            await signIn.email({
                                email: form.email,
                                password: form.password,
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
                            });
                        }}
                    >
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email" placeholder="Votre email" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
                            </div>
                            <ButtonSubmit isLoading={isLoading} type="submit">
                                Se connecter
                            </ButtonSubmit>
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-500">
                            Pas encore de compte ?{' '}
                            <Link href="/auth/signup" className="text-blue-500 hover:underline">
                                Créez-en un
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};

export default Page;
