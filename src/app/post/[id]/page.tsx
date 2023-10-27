import Navigation from '@/components/nav/Navigation';
import db from '@/db/dbConnect';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { Metadata, ResolvingMetadata } from 'next';
import ImageComp from '@/components/ImageComponent/ImageComp';
import Style from './page.module.scss';

type MetadataProps = {
    params: { id: string };
};
export async function generateMetadata(
    { params }: MetadataProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const article = await db
        .select()
        .from(schema.post)
        .where(eq(schema.post.post_id, params.id));
    if (!article) {
        return {
            title: 'Not-Found',
        };
    }
    return {
        title: `${article[0].title} - Qui Monte à Bord`,
        description: article[0].body.split(' ').slice(0, 7).join(' '),
    };
}

type TParams = {
    params: { id: string };
};
export default async function Page({ params }: TParams) {
    const article = await db
        .select()
        .from(schema.post)
        .where(eq(schema.post.post_id, params.id));
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
                        {`${article[0].author_name} - ${dateFormat}`}
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
