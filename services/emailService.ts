'use server';

import { Config } from '@/config';
import ContactEmail from '@/emails/contactEmail';
import { resend } from '@/lib/resend';
import { wrapResponse } from '@/lib/wrapResponse';

const from = Config.EMAIL_FROM;
const APP_NAME = 'TrackMyFutureJob';
const to = Config.EMAIL_FROM;

export const sendContactEmail = wrapResponse(async (formData: FormData) => {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstname') as string;
    const lastName = formData.get('lastname') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    await resend.emails.send({
        from: `${APP_NAME} <${from}>`,
        to: [to],
        subject: `Nouveau message - ${subject}`,
        react: ContactEmail({ firstName, lastName, email, subject, message }),
    });
});
