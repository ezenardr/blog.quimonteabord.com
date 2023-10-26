'use client';
import Image from 'next/image';

export default function ImageComp({ img, title }: { img: any; title: string }) {
    return <Image src={img} alt={title} width={300} height={300} />;
}
