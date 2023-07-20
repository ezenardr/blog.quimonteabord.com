'use client';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import useSWR from 'swr';
import Styles from './Article.module.scss';
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';

export default function Article({ params }: { params: { id: string } }) {
    const id = params.id;
    const fetcher = (args: string) => fetch(args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `http://localhost:3000/api/posts/getPost/${id}`,
        fetcher
    );
    if (error) {
        return <Modal title="Erreur">Failed to fetch data</Modal>;
    }
    if (isLoading) return <Loader />;
    if (data) {
        const date = new Date(data.data.post.updatedAt);
        const formattedDate = date?.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return (
            <main className={Styles.main}>
                <Navigation color="#e1e1e1" />
                <article>
                    <h1>{data.data.post.title}</h1>
                    <p>{formattedDate}</p>
                    <Image
                        src={data.data.post.pictures}
                        alt={data.data.post.title}
                        width={300}
                        height={300}
                    />
                    <p>{data.data.post.text}</p>
                </article>
            </main>
        );
    }
}
