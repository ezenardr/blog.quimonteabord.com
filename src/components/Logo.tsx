import Link from 'next/link';
import Styles from './Logo.module.scss';
export default function Logo({
    color,
    style = '',
}: {
    color: string;
    style: any;
}) {
    return (
        <Link
            style={{ color: color }}
            href="https://quimonteabord.com"
            className={[Styles.logo, style].join(' ')}
        >
            Qui monte à bord
        </Link>
    );
}
