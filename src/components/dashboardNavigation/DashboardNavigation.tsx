import Link from 'next/link';
import React from 'react';
import Style from './dashboardNavigation.module.scss';

export default function DashboardNavigation() {
    return (
        <nav className={Style.nav}>
            <Link className={Style.logo} href="https://quimonteabord.com">
                Qui monte à bord.
            </Link>
            <ul>
                <li className={Style.active}>
                    <Link href="/">Dashboard</Link>
                </li>
                <li>
                    <Link href="/">Post</Link>
                </li>
                <li>
                    <Link href="/">Categories</Link>
                </li>
                <li>
                    <Link href="/">Users</Link>
                </li>
                <li>
                    <Link href="/">Settings</Link>
                </li>
            </ul>
            <div></div>
        </nav>
    );
}
