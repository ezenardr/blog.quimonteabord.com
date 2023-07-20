import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prismaClient';
const prisma = prismaClient;

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });
        return NextResponse.json({
            data: {
                post,
            },
        });
    } catch (error) {
        return NextResponse.json({
            message: error,
        });
    }
}
