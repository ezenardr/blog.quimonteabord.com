import Image from 'next/image';
import Loader from '@/components/Loader';
import { prismaClient } from '@/lib/prismaClient';
import Navigation from '@/components/Navigation';
import Styles from './Article.module.scss';
interface PostProps {
    id: string;
    text: string;
    pictures: string | null;
    createdAt?: Date;
    updatedAt: Date;
    author: string | null;
    category: string | null;
    title: string;
}

export default async function Article({ params }: { params: { id: string } }) {
    const id = params.id;
    const prisma = prismaClient;
    const post: PostProps | null = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });
    const date = post && new Date(post.updatedAt);
    const formattedDate = date?.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <main className={Styles.main}>
            <Navigation color="#e1e1e1" />
            {!post && <Loader />}
            {post && (
                <article>
                    <h1>{post.title}</h1>
                    <span>{formattedDate}</span>
                    <div className={Styles.imageBox}>
                        {post.pictures && (
                            <Image src={post.pictures} alt={post.title} fill />
                        )}
                    </div>
                    <p>{post.text}</p>
                </article>
            )}
        </main>
    );
}
