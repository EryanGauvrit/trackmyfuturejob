'use client';

import AlertDialogComp from '@/components/basics/AlertDialogComp';
import Loader from '@/components/Loader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUser } from '@/services/userService';
import { User } from '@prisma/client';
import { User as UserSession } from 'better-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type PersonnalInformationsProps = {
    user: User;
    userSession: UserSession;
};

const PersonnalInformations = ({ user, userSession }: PersonnalInformationsProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paramsPersonnalInformations, setParamsPersonnalInformations] = useState<FormData | null>(null);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setParamsPersonnalInformations(formData);
    };

    const handleUpdateUser = async () => {
        if (!paramsPersonnalInformations) return;
        setIsLoading(true);
        try {
            const res = await updateUser(paramsPersonnalInformations, userSession.id);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Vos informations personnelles ont été mises à jour');
                router.refresh();
            }
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
        }
    };

    return (
        <form className="max-w-7xl flex flex-wrap justify-center gap-x-40 my-8 m-auto" action={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="text-xl text-center">
                    <h2 id="personnal-informations" className="uppercase font-bold">
                        Informations personnelles
                    </h2>
                </div>
                <Card className="flex flex-col justify-center p-3 xs:p-10 gap-4 border-card bg-transparent border-2">
                    <div className="grid xs:grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="firstName">
                            Nom d'utilisateur
                        </Label>
                        <Input id="firstname" type="text" name="name" defaultValue={user.name ?? ''} placeholder="Nom" />
                    </div>
                    <div className="grid xs:grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="email">
                            Email
                        </Label>
                        <Input id="email" type="text" name="email" defaultValue={user.email} />
                    </div>
                    {/* <div className="grid xs:grid-cols-2 gap-3 place-items-center border border-destructive p-2 rounded-md">
                        <Label className="w-full" htmlFor="password">
                            Mot de passe
                        </Label>
                        <ConfirmDialog
                            title="Modifier votre mot de passe"
                            description="Un mail sera envoyé pour modifier votre mot de passe"
                            openLabel={'Modifier le mot de passe'}
                            messageValidation="Le mail a été envoyé"
                            variant="secondary"
                            fnAction={() => updatePasswordRequest(userSession.email)}
                            id="password"
                            className="w-full"
                        />
                    </div> */}
                    <AlertDialogComp
                        title="Modifier vos informations personnelles"
                        description="Voulez-vous vraiment modifier vos informations personnelles ?"
                        closeLabel="Annuler"
                        confirmLabel="Sauvegarder"
                        openLabel="Sauvegarder"
                        isSubmit
                        confirmAction={handleUpdateUser}
                        className="place-self-end"
                    />
                </Card>
            </div>
            {isLoading && <Loader />}
        </form>
    );
};

export default PersonnalInformations;
