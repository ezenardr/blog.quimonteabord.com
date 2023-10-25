'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Style from './signup.module.scss';

const userSchema = z
    .object({
        name: z.string(),
        email: z.string().email({ message: 'Addresse Email Invalide' }),
        password: z
            .string()
            .min(8, { message: 'Veuillez insérer 8 caractères au minimum' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passes doivent être Identique',
        path: ['confirmPassword'],
    });

type TUserSchema = z.infer<typeof userSchema>;

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
    });

    const router = useRouter();
    async function submitHandler(data: TUserSchema) {
        toast.loading('Patientez...');
        const res = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
            },
        });
        if (!res.ok) {
            toast.error(
                `${res.statusText}. Si l'erreur persiste, contacter le support`
            );
        }
        if (res.ok) {
            toast.success('Compte créer. Connectez-vous !');
            signIn(undefined, { callbackUrl: 'http://localhost:3000/' });
        }
        reset();
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
                        onSubmit={handleSubmit(submitHandler)}
                    >
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Nom d'utilisateur"
                        />
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="email@example.com"
                        />
                        {errors.email && (
                            <p
                                className={Style.error}
                            >{`${errors.email.message}`}</p>
                        )}
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Mot de passe"
                        />
                        {errors.password && (
                            <p
                                className={Style.error}
                            >{`${errors.password.message}`}</p>
                        )}
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            placeholder="Confirmez Votre Mot de  Passe"
                        />
                        {errors.confirmPassword && (
                            <p
                                className={Style.error}
                            >{`${errors.confirmPassword?.message}`}</p>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            S&apos;inscrire
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
