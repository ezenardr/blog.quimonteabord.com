import { z } from 'zod';

export const postSchema = z.object({
    title: z.string(),
    body: z.string(),
    image: z.string(),
    author_id: z.string(),
});
export type TPostSchema = z.infer<typeof postSchema>;

export const userSchema = z
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
export type TUserSchema = z.infer<typeof userSchema>;
