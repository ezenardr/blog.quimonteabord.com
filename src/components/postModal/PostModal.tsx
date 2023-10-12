import Link from 'next/link';
import Style from './postModal.module.scss';

export default function PostModal() {
    return (
        <div className={Style.postModal}>
            <Link href="/admin/posts?newPost=false" className={Style.close}>
                &times;
            </Link>
            <input type="file" accept="image/png" className={Style.image} />
            <input
                type="text"
                className={Style.title}
                placeholder="Titre de l'article"
            />
            <textarea className={Style.post} placeholder="Corp de l'article" />
            <button className={Style.btn} disabled>
                Envoyer
            </button>
        </div>
    );
}
