'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
// import { AiOutlineSetting } from 'react-icons/ai';
import Styles from './Sidebar.module.scss';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <nav className={Styles.navigation}>
            <div></div>
            <ul>
                <li>
                    <Link
                        className={
                            pathname === '/admin/dashboard' ? Styles.active : ''
                        }
                        href="/admin/dashboard"
                    >
                        <span>
                            <MdOutlineDashboard />
                        </span>
                        Tableau de Bord
                    </Link>
                </li>
                <li>
                    <Link
                        className={
                            pathname === '/admin/dashboard/newPost'
                                ? Styles.active
                                : ''
                        }
                        href="/admin/dashboard/newPost"
                    >
                        <span>
                            <BiNews />
                        </span>
                        Nouvel Article
                    </Link>
                </li>
            </ul>
            <button onClick={() => signOut()} className={Styles.signOut}>
                Deconnexion
            </button>
        </nav>
    );
}
