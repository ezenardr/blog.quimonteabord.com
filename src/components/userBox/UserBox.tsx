'use client';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineUser } from 'react-icons/ai';
import Style from './userBox.module.scss';
export default function UserBox() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    function modalhandler() {
        setIsOpen((prev) => !prev);
    }
    return (
        <>
            {!session && (
                <div className={Style.userBox} onClick={() => signIn()}>
                    <AiOutlineUser className={Style.userProfile} />
                    <div className={Style.userInfo}>
                        <p className={Style.userName}>Login</p>
                    </div>
                </div>
            )}
            {session && session?.user && (
                <div className={Style.userBox} onClick={modalhandler}>
                    <AiOutlineUser className={Style.userProfile} />
                    <div className={Style.userInfo}>
                        <p className={Style.userName}>{session?.user.name}</p>
                        <p className={Style.role}>{session?.user.email}</p>
                    </div>
                    {isOpen && (
                        <LoginModal text="Se déconnecter" action={signOut} />
                    )}
                </div>
            )}
        </>
    );
}
type Modalprops = {
    text: string;
    action: any;
};
function LoginModal({ text, action }: Modalprops) {
    return (
        <div className={Style.modal}>
            <p onClick={action}>{text}</p>
        </div>
    );
}
