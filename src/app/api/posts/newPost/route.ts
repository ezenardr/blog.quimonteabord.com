import { prismaClient } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

const prisma = prismaClient;

export async function POST(req: NextRequest) {
    const data = await req.json();
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    try {
        const newPost = await prisma.post.create({
            data: {
                title: data.title,
                text: data.text,
                updatedAt: new Date(),
                pictures: data.image,
                userId: prismaUser?.id ?? '',
                author: data.author,
                category: data.category,
            },
        });
        return NextResponse.json({ res: newPost });
    } catch (error) {
        return NextResponse.json({
            status: 'failed',
            message: error,
        });
    }
}
