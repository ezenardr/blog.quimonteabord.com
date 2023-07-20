import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prismaClient';
const prisma = prismaClient;

export async function GET(
    req: NextRequest,
    { params }: { params: { user: string } }
) {
    const id = params.user;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return NextResponse.json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 'failed',
            message: error,
        });
    }
}
