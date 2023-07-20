'use client';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { VscLiveShare } from 'react-icons/vsc';
import Loader from '@/components/Loader';
import Styles from './Dashboard.module.scss';
import Image from 'next/image';
import Modal from '@/components/Modal';

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

export default function Articles({
    data,
    loading,
    error,
}: {
    data: dataProps;
    loading: boolean;
    error: any;
}) {
    return (
        <div className={Styles.articles}>
            {loading && <Loader />}
            {error && <Modal title="Erreur">Failed to fetch data</Modal>}
            <ul>
                {data &&
                    data?.data?.posts.map(
                        ({ id, title, pictures, updatedAt }, i) => {
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
                                                {i < 10
                                                    ? `0${i + 1}`
                                                    : `${i + 1}`}
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
                        }
                    )}
            </ul>
        </div>
    );
}
