'use client';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { MdNewspaper, MdOutlineCategory } from 'react-icons/md';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Articles from './Articles';
import Styles from './Dashboard.module.scss';

interface DataProps {
    data: {
        posts: Array<{
            id: string;
            title: string;
            text: string;
            updatedAt: Date;
            pictures: string;
        }>;
    };
}
export type dataProps = DataProps | null | undefined;

export default function Main() {
    const fetcher = (args: string) => fetch(args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        '/api/posts/getAllPosts',
        fetcher
    );
    const { data: session } = useSession();
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
                    <Articles data={data} loading={isLoading} error={error} />
                </div>
            </div>
            <div className={Styles.flex2}>
                <div className={[Styles.category, Styles.box].join(' ')}>
                    <MdOutlineCategory />
                    <p>
                        05 <br />
                        <span>Total categories</span>
                    </p>
                </div>
                <div className={[Styles.posts, Styles.box].join(' ')}>
                    <MdNewspaper />
                    <div>
                        {error && (
                            <Modal title="Erreur">Failed to fetch data</Modal>
                        )}
                        {isLoading && <Loader />}
                        <p>{data && data?.data?.posts.length}</p>
                        <span>Total Post</span>
                    </div>
                </div>
                <div className={[Styles.users, Styles.box].join(' ')}>
                    <AiOutlineUser />
                    <p>
                        2000 <br />
                        <span>Total users</span>
                    </p>
                </div>
            </div>
        </>
    );
}
