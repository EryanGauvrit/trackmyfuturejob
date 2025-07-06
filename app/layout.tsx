import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import InstallBanner from '@/components/layout/InstallBanner';
import { Config } from '@/config';
import AuthProvider from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'TrackMyFutureJob',
    description: 'TrackMyFutureJob',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning className="flex flex-col">
            <body
                className={`h-full min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased flex-1 relative`}
                suppressHydrationWarning
            >
                <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem disableTransitionOnChange themes={['light', 'dark']}>
                    <AuthProvider>
                        <Header />
                        <InstallBanner />
                        {children}
                        <Footer />
                        <Toaster />
                        {Config.STAGE === 'prod' && <Analytics />}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
