'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Style from './dashboardNavigation.module.scss';

export default function DashboardNavigation() {
    const pathname = usePathname();
    return (
        <nav className={Style.nav}>
            <Link className={Style.logo} href="https://quimonteabord.com">
                Qui monte à bord.
            </Link>
            <ul>
                <li
                    className={
                        pathname === '/admin/dashboard' ? Style.active : ''
                    }
                >
                    <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className={pathname === '/admin/posts' ? Style.active : ''}>
                    <Link href="/admin/posts">Posts</Link>
                </li>
                <li
                    className={
                        pathname === '/admin/categories' ? Style.active : ''
                    }
                >
                    <Link href="/admin/categories">Categories</Link>
                </li>
                <li className={pathname === '/admin/users' ? Style.active : ''}>
                    <Link href="/admin/users">Users</Link>
                </li>
                <li
                    className={
                        pathname === '/admin/settings' ? Style.active : ''
                    }
                >
                    <Link href="/admin/settings">Settings</Link>
                </li>
            </ul>
            <div></div>
        </nav>
    );
}
