import Navigation from '@/components/nav/Navigation';
import Style from './page.module.scss';
import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import ImageComp from '@/components/ImageComponent/ImageComp';

type TSearchParams = {
    searchParams: Record<string, string> | null | undefined;
};
export default async function Page({ searchParams }: TSearchParams) {
    const article =
        searchParams &&
        (await db
            .select()
            .from(schema.post)
            .where(eq(schema.post.post_id, searchParams.id)));
    const body = article && article[0].body.split('<br>');
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const dateFormat =
        article && article[0].createdAt?.toLocaleDateString('fr-FR', options);
    return (
        <>
            <Navigation />
            {article && (
                <main className={Style.main}>
                    <h1>{article[0].title}</h1>
                    <ImageComp
                        img={article[0].image}
                        title={article[0].title}
                    />
                    <p className={Style.author}>
                        {`${article[0].author_name} le ${dateFormat} - 5 min read`}
                    </p>
                    <div className={Style.article}>
                        {body?.map((str) => {
                            return (
                                <div key={Math.floor(Math.random() * 100)}>
                                    <p>{str}</p>
                                    <br></br>
                                </div>
                            );
                        })}
                    </div>
                </main>
            )}
        </>
    );
}
