import Image from 'next/image';
import Link from 'next/link';
import { RiFacebookCircleLine, RiTwitterXFill } from 'react-icons/ri';
import { FiExternalLink } from 'react-icons/fi';
import { BsInstagram } from 'react-icons/bs';
import Icon from '@/img/icon.png';
import Style from './footer.module.scss';

export default function Footer() {
    const date = new Date();
    const now = date.getFullYear();
    return (
        <footer className={Style.footer}>
            <nav>
                <Link href="/">
                    <Image
                        src={Icon}
                        alt="Logo of Qui Monte à Bord"
                        loading="eager"
                    />
                </Link>
                <ul className={Style.footerLinks}>
                    <li>
                        <Link className={Style.footerLink} href="/">
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={Style.footerLink}
                            href="https://blog.quimonteabord.com"
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link className={Style.footerLink} href="#about">
                            A Propos
                        </Link>
                    </li>
                </ul>
                <div className={Style.social}>
                    <Link
                        href="https://web.facebook.com/profile.php?id=100091865442401"
                        aria-label="facebook"
                    >
                        <RiFacebookCircleLine className={Style.icon} />
                    </Link>
                    <Link
                        href="https://www.instagram.com/mesarah16/?hl=fr"
                        aria-label="instagram"
                    >
                        <BsInstagram className={Style.icon} />
                    </Link>
                    <Link href="/" aria-label="twitter">
                        <RiTwitterXFill className={Style.icon} />
                    </Link>
                </div>
            </nav>
            <div className={Style.separator}></div>
            <p className={Style.copyright}>
                &copy; {now} Tout Droits Réservés |{' '}
                <Link href="https://quimonteabord.com">
                    www.quimondeabord.com
                </Link>
            </p>
            <p className={Style.dev}>
                Developpé par{' '}
                <Link href="https://ezenardr.dev">
                    ezenardr
                    <FiExternalLink />
                </Link>
            </p>
        </footer>
    );
}
