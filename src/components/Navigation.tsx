'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Styles from './Navigation.module.scss';

function Navigation({ color = '#1b4332' }) {
    const pathname = usePathname();
    return (
        <nav className={Styles.nav}>
            <Logo style={Styles.logo} color={color} />
            <Link
                style={{ color: color }}
                className={Styles.link}
                href={pathname === '/' ? 'https://quimonteabord.com' : '/'}
            >
                {pathname === '/' ? 'Acceuil' : 'Blog'}
            </Link>
        </nav>
    );
}
export default Navigation;
