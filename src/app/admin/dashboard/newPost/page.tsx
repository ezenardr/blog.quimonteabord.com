import Styles from './newPost.module.scss';
import Main from './Main';

export default function NewPost() {
    return (
        <main className={Styles.main}>
            {/* Because it's a client component and I don't want full page to be a client component */}
            <Main />
        </main>
    );
}
