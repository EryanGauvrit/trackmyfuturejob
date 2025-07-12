import { Config } from '@/config';
import { Resend } from 'resend';

export const resend = new Resend(Config.AUTH_RESEND_KEY);
