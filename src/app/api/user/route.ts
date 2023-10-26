import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { type TUserSchema } from '@/lib/type';

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
