import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
export async function POST(request: NextRequest) {
    const body = await request.json();
    const newPost = await db.insert(schema.post).values({
        author_id: body.author_id,
        title: body.title,
        body: body.body,
        image: body.image,
        post_id: uuidv4(),
    });
    return NextResponse.json({ success: true, newPost });
}
