import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/dbConnect';
import * as schema from '@/db/schema';

export async function GET(request: NextRequest) {
    const article = await db.select().from(schema.post);
    if (!article)
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch Data',
        });
    const newArticleObj = article.map((post) => {
        return {
            post_id: post.post_id,
            updatedAt: post.updatedAt,
        };
    });
    return NextResponse.json(newArticleObj);
}
