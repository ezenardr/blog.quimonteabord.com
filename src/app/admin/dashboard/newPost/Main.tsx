'use client';
import React, { useState } from 'react';
import Styles from './newPost.module.scss';
import ImageComponent from './ImageComponent';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';
import Modal from '@/components/Modal';

export default function Main() {
    const { data: session } = useSession();
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [postError, setPostError] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);
    return (
        <div className={Styles.flex2}>
            <div className={Styles.containerImg}>
                <ImageComponent
                    session={session}
                    setImageURL={setImageURL}
                    loading={loading}
                    setLoading={setLoading}
                    setImageError={setImageError}
                />
                {loading && <Loader />}
                {postError && <Modal title="Error">Failed to Post data</Modal>}
                {imageError && (
                    <Modal title="Error">Failed to Post Image</Modal>
                )}
            </div>
            <PostForm
                session={session}
                imageURL={imageURL}
                loading={loading}
                setLoading={setLoading}
                setPostError={setPostError}
            />
        </div>
    );
}

function PostForm({
    session,
    imageURL,
    loading,
    setLoading,
    setPostError,
}: {
    session: any;
    imageURL: string;
    loading: boolean;
    setLoading: Function;
    setPostError: Function;
}) {
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [category, setCategory] = useState('');
    const userEmail = session?.user?.email;
    const userName = session?.user?.name;
    function postData(
        title: string,
        text: string,
        email: string,
        image: string,
        author: string,
        category: string
    ) {
        try {
            fetch('/api/posts/newPost', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    text,
                    email,
                    image,
                    author,
                    category,
                }),
            })
                .then((res) => {
                    setLoading(false);
                    location.assign('/admin/dashboard');
                    return res;
                })
                .catch((err) => setPostError(true));
        } catch (error) {
            return error;
        }
    }
    function submitHandler(e: any) {
        setLoading(true);
        e.preventDefault();
        postData(
            postTitle,
            postText,
            userEmail ?? '',
            imageURL,
            userName,
            category
        );
    }
    return (
        <form className={Styles.newPost} onSubmit={submitHandler}>
            <>
                <input
                    className={Styles.title}
                    type="text"
                    placeholder="Titre du post"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <input
                    className={Styles.title}
                    type="text"
                    placeholder="Categorie"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <textarea
                    className={Styles.body}
                    placeholder="Corps du post"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                />
                {!loading && <button>Post</button>}
            </>
        </form>
    );
}
