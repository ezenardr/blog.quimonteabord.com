import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prismaClient';
const prisma = prismaClient;

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json({
            status: 'success',
            data: {
                posts,
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 'failed',
            message: error,
        });
    }
}
