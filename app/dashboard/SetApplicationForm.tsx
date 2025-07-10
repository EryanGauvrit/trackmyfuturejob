import DialogForm from '@/components/DialogForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addApplication } from '@/services/applicationService';

const SetApplicationForm = () => {
    return (
        <DialogForm
            actionFn={addApplication}
            title="Ajouter une candidature"
            description="Ajoutez une nouvelle candidature à votre suivi."
            textOpen="Ajouter une candidature"
            textSubmit="Ajouter"
            classNameTrigger="w-fit"
        >
            <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Label className="flex flex-col gap-2 items-start col-span-2">
                        Titre de la candidature*
                        <Input name="title" type="text" placeholder="Titre de la candidature" required />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start col-span-2">
                        Nom de l'entreprise*
                        <Input name="company" type="text" placeholder="Nom de l'entreprise" required />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                        Type de poste*
                        <Input name="type" type="text" placeholder="Alternance / CDI / CDD / Mission" required />
                    </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label className="flex flex-col gap-2 items-start">
                        Lieu d'exercice*
                        <Input name="location" type="text" placeholder="Sur site / Télétravail / autre" required />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                        Adresse de l'entreprise (optionnel)
                        <Input name="address" type="text" placeholder="Adresse de l'entreprise" />
                    </Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label className="flex flex-col gap-2 items-start">
                        Statut de la candidature*
                        <Input name="status" type="text" placeholder="Envoyée / Attente de réponse / Entretien en cours" required />
                    </Label>
                    <Label className="flex flex-col gap-2 items-start">
                        Lien vers la candidature (optionnel)
                        <Input name="link" type="url" placeholder="Lien vers la candidature (optionnel)" />
                    </Label>
                </div>
                <Label className="flex flex-col gap-2 items-start">
                    Notes (optionnel)
                    <Textarea name="notes" rows={5} placeholder="Maximum 500 caractères" />
                </Label>
            </div>
        </DialogForm>
    );
};

export default SetApplicationForm;
