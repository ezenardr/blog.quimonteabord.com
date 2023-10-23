import Footer from '@/components/footer/Footer';
import '../styles/main.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from './AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Blog | Qui Monte à bord',
    description:
        'Célébrons le pouvoir des mots pour inspirer, émouvoir et transformer',
    metadataBase: new URL('https://blog.quimonteabord.com'),
    alternates: {
        canonical: 'https://blog.quimonteabord.com',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={[inter.className, 'dark'].join(' ')}>
                <AuthProvider>
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
