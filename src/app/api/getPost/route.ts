import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const article =
        id &&
        (await db
            .select()
            .from(schema.post)
            .where(eq(schema.post.post_id, id)));

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const dateFormat =
        article && article[0].createdAt?.toLocaleDateString('fr-FR', options);
    if (!article)
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch Data',
        });
    return NextResponse.json({
        title: article[0].title,
        author: article[0].author_name,
        date: dateFormat,
    });
}
