import { MetadataRoute } from 'next';

type ArticleProps = {
    updatedAt: Date | null;
    post_id: string;
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseurl = 'https://blog.quimonteabord.com';
    const posts = await fetch('http://localhost:3000/api/getPosts').then(
        async (res) => {
            return await res.json();
        }
    );
    console.log(posts);
    const postUrls = await posts.map((post: ArticleProps) => ({
        url: `${baseurl}/post/${post.post_id}`,
        lastModified: post.updatedAt,
        changeFrequency: 'hourly',
    }));
    return [
        {
            url: `${baseurl}`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
        },
        ...postUrls,
    ];
}
