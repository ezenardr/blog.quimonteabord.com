import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prismaClient } from './prismaClient';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import { compare } from 'bcrypt';

const prisma = prismaClient;
const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email@exemple.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Mot de passe',
                },
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                if (!user) {
                    throw new Error('Zéro utilisateur trouvé');
                }
                const checkPassword =
                    credentials && compare(credentials.password, user.password);
                if (!checkPassword || user.email !== credentials.email) {
                    throw new Error('Les entrées ne correspondent pas');
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    // pages: {
    //     signIn: '/auth/login',
    // },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
    },
};

export default authOptions;
