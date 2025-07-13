import ConfirmDialog from '@/components/ConfirmDialog';
import { Card } from '@/components/ui/card';
import { User } from '@/generated/prisma';
import { getSession } from '@/lib/auth-server';
import { deleteUser, getConnectedUser } from '@/services/userService';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import PersonnalInformations from './PersonnalInformations';

const page = async () => {
    const user = (await getSession())?.user;
    if (!user) {
        return notFound();
    }

    const response = await getConnectedUser();

    if (response.error) {
        redirect('/auth/login');
    }

    const userData = response.data as User;

    return (
        <>
            <PersonnalInformations user={userData} userSession={user} />
            <Card className="my-4 p-6 max-w-md mx-auto bg-transparent border-destructive flex flex-col justify-center gap-2">
                <p>
                    <span className="font-bold">Attention :</span> Cette action est irréversible.
                </p>
                <ConfirmDialog
                    description="Voulez-vous vraiment supprimer votre compte ?"
                    fnAction={async () => {
                        'use server';
                        return await deleteUser(userData.id);
                    }}
                    id={userData.id}
                    messageValidation="Votre compte a bien été supprimé"
                    title="Supprimer votre compte"
                    openLabel={'Supprimer mon compte'}
                    size="default"
                    isAccountDelete
                />
            </Card>
            <p className="text-center text-sm text-muted-foreground">
                Une question, une suggestion ou un problème ? N'hésitez pas à{' '}
                <Link className="text-secondary hover:underline" href={'/contact'}>
                    nous contacter via le formulaire de contact
                </Link>
                .
            </p>
        </>
    );
};

export default page;
