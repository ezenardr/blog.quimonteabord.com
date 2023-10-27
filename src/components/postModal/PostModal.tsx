'use client';
import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Style from './postModal.module.scss';
import { postSchema } from '@/lib/type';

export default function PostModal() {
    const { data: session } = useSession();
    const router = useRouter();
    const [imageData, setImageData] = useState<string | ArrayBuffer | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true);
        toast.loading('Patientez...');
        e.preventDefault();
        const [image, title, body, button] = e.target;
        const formData = {
            author_id: session?.user.id,
            title: title.value,
            body: body.value,
            image: imageData,
            author_name: session?.user.name,
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
                    router.push('/admin/posts?newPost=false');
                } else {
                    toast.error("L'article n'a pas été posté");
                }
                setIsLoading(false);
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
                required
            />
            <input
                type="text"
                className={Style.title}
                placeholder="Titre de l'article"
                required
            />
            <textarea
                className={Style.post}
                placeholder="Corp de l'article"
                required
            />
            <button type="submit" disabled={isLoading} className={Style.btn}>
                Envoyer
            </button>
        </form>
    );
}
