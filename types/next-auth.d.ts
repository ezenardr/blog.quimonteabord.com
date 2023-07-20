// import {User} from './interfaces'
import { Role } from '@prisma/client';
import 'next-auth';
import 'next-auth/jwt';
declare module 'next-auth' {
    interface User {
        id: string;
        email?: string;
        name?: string | null | undefined;
        role?: Role;
        image?: string;
    }
    interface Session {
        user: User;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email?: string;
        name?: string | null | undefined;
        role?: Role;
        image?: string;
    }
}
