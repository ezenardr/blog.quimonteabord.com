import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import Style from './userBox.module.scss';
export default function UserBox() {
    return (
        <div className={Style.userBox}>
            <AiOutlineUser className={Style.userProfile} />
            <div className={Style.userInfo}>
                <p className={Style.userName}>Ryan Adhitama</p>
                <p className={Style.role}>Web Developer</p>
            </div>
        </div>
    );
}
