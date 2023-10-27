import Style from './Card.module.scss';
import ImageComp from '../ImageComponent/ImageComp';
import Link from 'next/link';

type ArticleProps = {
    image: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    post_id?: string;
    title: string;
    body: string;
    author_id?: string;
    author_name?: string;
};
export default function Card({
    image,
    title,
    body,
    createdAt,
    post_id,
}: ArticleProps) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const dateFormat = createdAt?.toLocaleDateString('fr-FR', options);
    return (
        <li className={Style.card}>
            <Link href={`/post/${post_id}`}>
                <ImageComp img={image} title={title} />
                <div className={Style.textBox}>
                    <h2>{title}</h2>
                    <p className={Style.tag}>{dateFormat}</p>
                    <p>{body.split(' ').slice(0, 7).join(' ')}</p>
                </div>
            </Link>
        </li>
    );
}
