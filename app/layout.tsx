import Header from '@/components/layout/Header';
import AuthProvider from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
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
        <html lang="fr" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1`} suppressHydrationWarning>
                <ThemeProvider attribute={'class'}>
                    <AuthProvider>
                        <Header />
                        {children}
                        <Toaster />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
