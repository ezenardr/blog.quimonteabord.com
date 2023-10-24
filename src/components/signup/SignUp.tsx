'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Style from './signup.module.scss';

const userSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: 'Addresse Email Invalide' }),
    password: z
        .string()
        .min(8, { message: 'Veuillez insérer 8 caractères au minimum' }),
});

type FormData = {
    name?: string;
    email?: string;
    password?: string;
};
type Error = {
    error?: boolean;
    message?: string;
};

export default function SignUp() {
    const [formData, setFormData] = useState<FormData>({});
    const [emailError, setEmailError] = useState<Error>({ error: false });
    const [passError, setPassError] = useState<Error>({ error: false });

    const router = useRouter();

    async function submitHandler(e: any) {
        e.preventDefault();
        toast('Patientez pour la création de votre compte');
        const result = userSchema.safeParse(formData);
        if (!result.success) {
            const errors = result.error.format();
            setEmailError({
                error: true,
                message: errors.email?._errors.join(', '),
            });
            setPassError({
                error: true,
                message: errors.password?._errors.join(', '),
            });
        } else {
            try {
                const res = await fetch('http://localhost:3000/api/user', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
                if (res.ok) {
                    toast.success(
                        'Compte utilisateur crée avec succèss \n Connectez-vous !'
                    );
                    router.push('/');
                } else {
                    toast.error(
                        "Erreur de serveur. Si l'erreur persiste, contactez le support"
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className={Style.wrapper}>
            <div className={Style.container}>
                <div
                    className={Style.close}
                    onClick={(e) => router.push('/?newUser=false')}
                >
                    <AiOutlineCloseCircle />
                </div>
                <div className={Style.loginFormBox}>
                    <p className={Style.title}>S&apos;inscrire</p>
                    <p className={Style.description}>
                        Inscrivez-vous et rejoignez notre communauté pour
                        échanger et découvrir l&apos;art de l&apos;écriture.
                    </p>
                    <form
                        className={Style.login}
                        onSubmit={(e) => submitHandler(e)}
                    >
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Jane Doe"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                        {emailError.error && (
                            <p style={{ color: 'red', fontSize: '14px' }}>
                                {emailError?.message}
                            </p>
                        )}
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        {passError.error && (
                            <p style={{ color: 'red', fontSize: '14px' }}>
                                {passError?.message}
                            </p>
                        )}
                        <button>S&apos;inscrire</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
