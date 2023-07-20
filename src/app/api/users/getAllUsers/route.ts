import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prismaClient';
const prisma = prismaClient;

export async function GET() {
    try {
        const Users = await prisma.user.findMany();
        return NextResponse.json({
            status: 'success',
            data: {
                Users,
            },
        });
    } catch (err) {
        return NextResponse.json({
            status: 'failed',
            message: err,
        });
    }
}
