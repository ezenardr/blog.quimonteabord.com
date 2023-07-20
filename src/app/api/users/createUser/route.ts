import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prismaClient';
import { hash } from 'bcrypt';
const prisma = prismaClient;

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    const existing = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existing)
        return NextResponse.json({
            erreur: "L'utilisateur existe déjà",
        });
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: await hash(password, 12),
            },
        });
        if (newUser) {
            return NextResponse.json({
                message: 'Utilisateur créer avec succès',
            });
        }
    } catch (error) {
        return NextResponse.json({
            error,
        });
    }
}
