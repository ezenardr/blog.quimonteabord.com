import Image from 'next/image';
import Link from 'next/link';
import { prismaClient } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { PostProps } from '../../../../types/post';
import { AiOutlineLike, AiOutlineComment, AiOutlineUser } from 'react-icons/ai';
import { VscLiveShare } from 'react-icons/vsc';
import { MdNewspaper, MdOutlineCategory } from 'react-icons/md';
import Styles from './Dashboard.module.scss';

export default function Dashboard() {
    return (
        <main className={Styles.main}>
            <Main />
        </main>
    );
}
export async function Main() {
    const session = await getServerSession(authOptions);
    const prisma = prismaClient;
    const posts: Array<PostProps> = await prisma.post.findMany();
    const user = session?.user;
    return (
        <>
            <div className={Styles.flex1}>
                <div className={Styles.welcomeBox}>
                    <p>Hello {user?.name}!</p>
                    <p>
                        N&apos;aie pas peur de partager ta voix authentique, car
                        chaque mot que tu écris est une pierre précieuse qui
                        enrichit notre communauté.
                    </p>
                    <Link href="/admin/dashboard/newPost">
                        Ecrire un nouvel article
                    </Link>
                </div>
                <div className={Styles.articleBox}>
                    <div className={Styles.topBar}>
                        <p>Mes Articles</p>
                    </div>
                    <Articles posts={posts} />
                </div>
            </div>
            <div className={Styles.flex2}>
                <div className={[Styles.category, Styles.box].join(' ')}>
                    <MdOutlineCategory />
                    <p>
                        N/A <br />
                        <span>Total categories</span>
                    </p>
                </div>
                <div className={[Styles.posts, Styles.box].join(' ')}>
                    <MdNewspaper />
                    <div>
                        <p>{posts.length}</p>
                        <span>Total Post</span>
                    </div>
                </div>
                <div className={[Styles.users, Styles.box].join(' ')}>
                    <AiOutlineUser />
                    <p>
                        N/A <br />
                        <span>Total users</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export function Articles({ posts }: { posts: Array<PostProps> }) {
    return (
        <div className={Styles.articles}>
            <ul>
                {posts &&
                    posts.map(({ id, title, pictures, updatedAt }, i) => {
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
                                <article>
                                    <div className={Styles.article}>
                                        <p>
                                            {i < 10 ? `0${i + 1}` : `${i + 1}`}
                                        </p>
                                        {pictures && (
                                            <Image
                                                src={pictures}
                                                alt={title}
                                                width={70}
                                                height={50}
                                            />
                                        )}
                                        <div>
                                            <p className={Styles.title}>
                                                {title}
                                            </p>
                                            <br />
                                            <span>{formattedDate}</span>
                                        </div>
                                    </div>
                                    <div className={Styles.review}>
                                        <div className={Styles.iconBox}>
                                            <AiOutlineLike
                                                className={Styles.icon}
                                            />
                                            <span>0</span>
                                        </div>
                                        <div className={Styles.iconBox}>
                                            <AiOutlineComment
                                                className={Styles.icon}
                                            />
                                            <span>0</span>
                                        </div>
                                        <div className={Styles.iconBox}>
                                            <VscLiveShare
                                                className={Styles.icon}
                                            />
                                            <span>0</span>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
