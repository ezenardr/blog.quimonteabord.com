import Link from 'next/link';
import './Navigation.scss';
import UserBox from '../userBox/UserBox';

export default function Navigation() {
    return (
        <nav className="navigation">
            <label className="logo">Q</label>
            <label htmlFor="toggle" className="checkBtn">
                &#9776;
            </label>
            <input type="checkbox" id="toggle" />
            <ul className="menu">
                <li>
                    <Link href="#">Accueil</Link>
                </li>
                <li>
                    <Link href="/">Blog</Link>
                </li>
                <li>
                    <Link href="#">Facebook</Link>
                </li>
                <li>
                    <UserBox />
                </li>
            </ul>
        </nav>
    );
}
