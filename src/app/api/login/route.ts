import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

type RequestBody = {
    email: string;
    password: string;
};
export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const user = await db
        .select()
        .from(schema.user)
        .where(eq(schema.user.email, body.email));
    if (user && (await bcrypt.compare(body.password, user[0].password))) {
        const { password, ...userWithoutPass } = user[0];
        return new Response(JSON.stringify(userWithoutPass));
    } else return new Response(JSON.stringify(null));
}
