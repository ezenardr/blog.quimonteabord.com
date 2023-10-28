import Card from '@/components/card/Card';
import Style from './page.module.scss';
import SignUp from '@/components/signup/SignUp';
import db from '@/db/dbConnect';
import { Suspense } from 'react';
import Loading from './loading';
type Props = {
    searchParams: Record<string, string> | null | undefined;
};
export default function BLog({ searchParams }: Props) {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading />}>
                <Articles />
            </Suspense>
            {searchParams?.newUser === 'true' && <SignUp />}
        </>
    );
}

function Header() {
    return (
        <header>
            <div className={Style.heroBox}>
                <h1>Blog</h1>
                <p>
                    L&apos;écriture est le navire qui nous emporte vers des
                    mondes inconnus, et nous est votre billet pour cette
                    aventure extraordinaire. Que vous soyez un écrivain en
                    herbe, un amoureux de la littérature ou simplement un
                    rêveur, vous trouverez ici une place qui vous est réservée.
                </p>
            </div>
        </header>
    );
}
async function Articles() {
    const articles = await db.query.post.findMany();
    return (
        <main>
            <ul className={Style.articles}>
                {articles &&
                    articles.map(
                        ({ image, body, title, createdAt, post_id }) => {
                            return (
                                <Card
                                    key={post_id}
                                    image={image}
                                    title={title}
                                    body={body}
                                    createdAt={createdAt}
                                    post_id={post_id}
                                />
                            );
                        }
                    )}
            </ul>
        </main>
    );
}
