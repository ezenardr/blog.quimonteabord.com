import React from 'react';
import Styles from './Card.module.scss';
import Image from 'next/image';
interface PostProps {
    image: string;
    category?: string;
    title: string;
    author?: string;
    date: string;
}
export default function Card({
    image,
    category = 'Motivation',
    title,
    author = 'Author',
    date,
}: PostProps) {
    return (
        <div className={Styles.card}>
            <div className={Styles.imageBox}>
                <Image
                    className={Styles.cardImage}
                    src={image}
                    alt={title}
                    fill
                />
            </div>
            <div className={Styles.category}>{category} </div>
            <div className={Styles.heading}>
                {title}
                <div className={Styles.author}>
                    <span className={Styles.name}>{author},</span> {date}
                </div>
            </div>
        </div>
    );
}
