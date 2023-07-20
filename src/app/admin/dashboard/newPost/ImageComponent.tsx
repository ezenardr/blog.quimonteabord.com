import Styles from './newPost.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { supabaseClient } from '@/lib/supabaseClient';

export default function ImageComponent({
    session,
    setImageURL,
    setLoading,
    setImageError,
}: {
    session: any;
    setImageURL: Function;
    loading: boolean;
    setLoading: Function;
    setImageError: Function;
}) {
    const userEmail = session?.user?.email;
    async function uploadImage(file: any, db: any, setLoading: Function) {
        try {
            const { data, error } = await db.storage
                .from('images')
                .upload(userEmail + '/' + uuidv4(), file);
            if (error) {
                // Handle error
                setImageError(true);
                return error;
            } else {
                // Handle success
                const res = await db.storage
                    .from('images')
                    .createSignedUrl(data.path, 157680000)
                    .then((res: any) => {
                        setImageURL(res.data?.signedUrl);
                        setLoading(false);
                    });
                return 'Image téléchargé avec succès';
            }
        } catch (error) {
            return error;
        }
    }
    async function pictureHandler(e: any) {
        setLoading(true);
        const supabase = await supabaseClient;
        const file = e.target.files[0];
        await uploadImage(file, supabase, setLoading);
    }

    return (
        <form>
            <input
                className={Styles.image}
                accept="image/jpg, image/png, image/webp"
                type="file"
                onChange={(e) => pictureHandler(e)}
                required
            />
        </form>
    );
}
