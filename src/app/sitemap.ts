import { MetadataRoute } from 'next';
import db from '@/db/dbConnect';
import * as schema from '@/db/schema';

type ArticleProps = {
    image: string;
    createdAt: Date | null;
    updatedAt: any;
    post_id: string;
    title: string;
    body: string;
    author_name: string;
    author_id: string;
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseurl = 'https://blog.quimonteabord.com';
    const posts = await db.select().from(schema.post);

    const postUrls = posts.map((post: ArticleProps) => ({
        url: `${baseurl}/post/${post.post_id}`,
        lastModified: post.updatedAt,
    }));
    return [
        {
            url: `${baseurl}`,
            lastModified: new Date(),
        },
        ...postUrls,
    ];
}
