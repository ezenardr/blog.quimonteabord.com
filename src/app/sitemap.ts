type ArticleProps = {
    updatedAt: Date | null;
    post_id: string;
};
export default async function sitemap() {
    const baseurl = 'https://blog.quimonteabord.com';
    const posts = await fetch('http://localhost:3000/api/getPosts').then(
        (res) => res.json()
    );
    const postUrls = await posts.map((post: ArticleProps) => {
        return {
            url: `${baseurl}/post/${post.post_id}`,
            lastModified: post.updatedAt,
        };
    });
    return [
        {
            url: `${baseurl}`,
            lastModified: new Date(),
        },
        ...postUrls,
    ];
}
