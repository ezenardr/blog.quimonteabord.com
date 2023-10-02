'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import './Navigation.scss';

export default function Navigation() {
    const [blur, setBlur] = useState<Boolean>(false);
    useEffect(
        function () {
            if (blur) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'scroll';
            }
        },
        [blur]
    );
    return (
        <nav>
            <input type="checkbox" id="check" />
            <label
                htmlFor="check"
                className="checkbtn"
                onClick={() => setBlur((prev) => !prev)}
            >
                <AiOutlineMenu className="icon" />
            </label>
            <label className="logo">Q</label>
            <div className={blur ? 'blur' : ''}></div>
            <ul>
                <li>
                    <Link href="#">Home</Link>
                </li>
                <li>
                    <Link href="#">Blog</Link>
                </li>
                <li>
                    <Link href="#">Facebook</Link>
                </li>
            </ul>
        </nav>
    );
}
