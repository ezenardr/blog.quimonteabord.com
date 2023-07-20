'use client';
import React from 'react';
import useSWR from 'swr';
import Styles from './blog.module.scss';
import LoaderWhite from '@/components/LoaderWhite';
import Link from 'next/link';
import Modal from '@/components/Modal';
import Card from '@/components/Card';

interface PostProps {
    id: string;
    title: string;
    text: string;
    updatedAt: Date;
    pictures: string;
    category: string;
    author: string;
}
export default function Articles() {
    const fetcher = (args: string) => fetch(args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        'http://localhost:3000/api/posts/getAllPosts',
        fetcher
    );
    if (error) {
        return <Modal title="Erreur">Failed to fetch data</Modal>;
    }
    if (isLoading) return <LoaderWhite />;
    if (data) {
        return (
            <>
                <ul className={Styles.articleList}>
                    {data &&
                        data?.data?.posts?.map(
                            ({
                                id,
                                pictures,
                                text,
                                title,
                                updatedAt,
                                category,
                                author,
                            }: PostProps) => {
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
            </>
        );
    }
}
