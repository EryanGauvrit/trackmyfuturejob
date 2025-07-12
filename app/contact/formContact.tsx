'use client';

import ButtonSubmit from '@/components/buttons/ButtonSubmit';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendContactEmail } from '@/services/emailService';
import { toast } from 'sonner';

const FormContact = () => {
    return (
        <form
            className="flex flex-col gap-4 max-w-2xl w-full"
            action={(formData) =>
                sendContactEmail(formData)
                    .then((res) => {
                        if (res.error) {
                            toast.error(res.error);
                        } else {
                            toast.success('Votre message a bien été envoyé');
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message);
                    })
            }
        >
            <div className="grid gap-2 grid-cols-2">
                <Input name="lastname" type="text" placeholder="Nom" />
                <Input name="firstname" type="text" placeholder="Prénom" />
            </div>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="subject" type="text" placeholder="Sujet" />
            <Textarea name="message" id="message" cols={30} rows={10} placeholder="Votre message ..."></Textarea>
            <ButtonSubmit type="submit">Envoyé</ButtonSubmit>
        </form>
    );
};

export default FormContact;
