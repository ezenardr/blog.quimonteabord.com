import { Merriweather, Lora } from 'next/font/google';
import AuthProvider from './AuthProvider';
import Footer from '@/components/Footer';
import './globals.scss';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-secondary',
});
const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-primary',
});
const FONTS = [lora.variable, merriweather.variable].join(' ');

export const metadata = {
    title: 'Blog | Qui monte à bord',
    metadataBase: new URL('https://blog.quimonteabord.com/'),
    openGraph: {
        title: 'Blog | Qui monte à bord',
        description:
            "Écris ton histoire, partage tes passions et ensemble, construisons un univers de partage et d'inspiration. Le clavier t'attend, prêt à accueillir tes pensées les plus brillantes. Laisse ta plume s'envoler et éclaire le monde de ta créativité. ",
    },
};

export default function RootLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) {
    return (
        <html lang="en">
            <body className={FONTS}>
                <AuthProvider session={session}>
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
