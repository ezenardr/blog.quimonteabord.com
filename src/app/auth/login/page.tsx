'use client';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function submitHandler() {
        await signIn('credentials', {
            redirect: true,
            email,
            password,
            callbackUrl: '/',
        });
    }
    return (
        <header>
            <form onSubmit={submitHandler}>
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
        </header>
    );
}
