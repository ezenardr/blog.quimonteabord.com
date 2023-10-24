'use client';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { AiOutlineUser } from 'react-icons/ai';
import Style from './userBox.module.scss';
import Link from 'next/link';
export default function UserBox() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    function modalhandler() {
        setIsOpen((prev) => !prev);
    }
    return (
        <>
            {!session && (
                <div className={Style.userBox} onClick={modalhandler}>
                    <AiOutlineUser className={Style.userProfile} />
                    <div className={Style.userInfo}>
                        <p className={Style.userName}>Compte</p>
                    </div>
                    {isOpen && <LoginModal />}
                </div>
            )}
            {session && session?.user && (
                <div className={Style.userBox} onClick={modalhandler}>
                    <AiOutlineUser className={Style.userProfile} />
                    <div className={Style.userInfo}>
                        <p className={Style.userName}>{session?.user.name}</p>
                        <p className={Style.role}>{session?.user.email}</p>
                    </div>
                    {isOpen && <LoginModal />}
                </div>
            )}
        </>
    );
}

function LoginModal() {
    const { data: session } = useSession();
    return (
        <div className={Style.modal}>
            {session && session.user && (
                <Link href="http://localhost:3000/api/auth/signout">
                    Se déconnecter
                </Link>
            )}
            {!session && (
                <>
                    <p onClick={() => signIn()}>Se connecter</p>
                    <Link href="/?newUser=true">S&apos;inscrire</Link>
                </>
            )}
        </div>
    );
}
