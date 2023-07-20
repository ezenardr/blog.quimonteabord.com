import Styles from './Dashboard.module.scss';
import Main from './Main';

export default function Dashboard() {
    return (
        <main className={Styles.main}>
            <Main />
        </main>
    );
}
