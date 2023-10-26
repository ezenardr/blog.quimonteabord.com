'use client';
import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';
import Style from './postModal.module.scss';
import { postSchema } from '@/lib/type';

export default function PostModal() {
    const { data: session } = useSession();
    const [imageData, setImageData] = useState<string | ArrayBuffer | null>();

    function toBase64(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageData(reader.result);
        };
        reader.onerror = (error) => {
            toast.error(
                "L'image n'as pas été télécharger. Si l'erreur persiste, contactez le support"
            );
        };
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files[0];
        toBase64(file);
    }
    function handleSubmit(e: any) {
        toast.loading('Patientez...');
        e.preventDefault();
        const [image, title, body, button] = e.target;
        const formData = {
            author_id: session?.user.id,
            title: title.value,
            body: body.value,
            image: imageData,
        };
        const parsedData = postSchema.safeParse(formData);
        if (parsedData.success) {
            fetch('http://localhost:3000/api/post', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'content-type': 'application/json' },
            }).then((res) => {
                if (res.ok) {
                    toast.success('Article posté');
                } else {
                    toast.error("L'article n'a pas été posté");
                }
            });
        }
    }
    return (
        <form onSubmit={handleSubmit} className={Style.postModal}>
            <Link href="/admin/posts?newPost=false" className={Style.close}>
                &times;
            </Link>
            <input
                type="file"
                accept="image/png image/jpg"
                onChange={handleChange}
                className={Style.image}
            />
            <input
                type="text"
                className={Style.title}
                placeholder="Titre de l'article"
            />
            <textarea className={Style.post} placeholder="Corp de l'article" />
            <button type="submit" className={Style.btn}>
                Envoyer
            </button>
        </form>
    );
}
