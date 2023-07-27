import Link from 'next/link';
import Navigation from '@/components/Navigation';
import LoaderWhite from '@/components/LoaderWhite';
import Card from '@/components/Card';
import { prismaClient } from '@/lib/prismaClient';
import { PostProps } from '../../types/post';
import Styles from './blog.module.scss';

export default function BlogPage() {
    return (
        <>
            <header className={Styles.header}>
                <Navigation />
                <div className={Styles.heroBox}>
                    <h3>writing Blog</h3>
                    <h1>
                        WE&apos;VE GOT <span>exciting insight</span> FOR YOU
                    </h1>
                </div>
            </header>
            <main className={Styles.main}>
                <Articles />
            </main>
        </>
    );
}
export async function Articles() {
    const prisma = prismaClient;
    const posts: Array<PostProps> = await prisma.post.findMany();
    await prisma.$disconnect();
    return (
        <ul className={Styles.articleList}>
            {!posts && <LoaderWhite />}
            {posts &&
                posts.map(
                    ({ id, pictures, title, updatedAt, category, author }) => {
                        const date = new Date(updatedAt);
                        const formattedDate = date?.toLocaleDateString(
                            'fr-FR',
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        );
                        return (
                            <li key={id}>
                                <Link href={`/article/${id}`}>
                                    <Card
                                        title={title}
                                        date={formattedDate}
                                        image={pictures}
                                        category={category}
                                        author={author}
                                    />
                                </Link>
                            </li>
                        );
                    }
                )}
        </ul>
    );
}
