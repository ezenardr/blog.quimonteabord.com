import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';

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

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string | null;
    emailVerified: boolean | null;
    role: 'user' | 'admin';
    createdAt: Date | null;
    updatedAt: Date | null;
};
export async function POST(request: Request) {
    const body: TUserSchema = await request.json();
    const user = await db.insert(schema.user).values({
        id: uuidv4(),
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
    });

    const { password, ...result } = user as unknown as User;
    return Response.json(result);
}
