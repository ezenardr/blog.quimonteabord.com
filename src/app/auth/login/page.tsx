'use client';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    async function submitHandler(e: any) {
        e.preventDefault();
        await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/admin/dashboard',
        }).then((res) => router.push('/admin/dashboard'));
    }
    return (
        <form onSubmit={(e) => submitHandler(e)}>
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemple.com"
            />
            <label>Mot de passe</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />
            <button>Submit</button>
        </form>
    );
}
