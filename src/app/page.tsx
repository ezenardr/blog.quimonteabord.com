import Card from '@/components/card/Card';
import Style from './page.module.scss';
import Navigation from '@/components/nav/Navigation';
import SignUp from '@/components/signup/SignUp';
import db from '@/db/dbConnect';
type Props = {
    searchParams: Record<string, string> | null | undefined;
};
export default function BLog({ searchParams }: Props) {
    return (
        <>
            <Header />
            <Articles />
            {searchParams?.newUser === 'true' && <SignUp />}
        </>
    );
}

function Header() {
    return (
        <header>
            <Navigation />
            <div className={Style.heroBox}>
                <h1>Blog</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi dolorum nulla nisi. Iusto quam eos dolore. Amet
                    incidunt earum excepturi, corporis soluta in, cum ab hic
                    inventore aspernatur, iusto qui!
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
