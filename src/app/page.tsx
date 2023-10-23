import Card from '@/components/card/Card';
import Style from './page.module.scss';
import Navigation from '@/components/nav/Navigation';
import 'dotenv/config';

export default function BLog() {
    return (
        <>
            <Header />
            <Articles />
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
    return (
        <main className={Style.articles}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </main>
    );
}
