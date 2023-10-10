import Style from './statsCard.module.scss';

export default function StatsCard({
    children,
    title = '',
    amount = 0,
}: {
    children: React.ReactNode;
    title: string;
    amount: number;
}) {
    return (
        <div className={Style.statsCard}>
            <div className={Style.cardInfo}>
                <p className={Style.title}>{title}</p>
                <p className={Style.amount}>{amount}</p>
            </div>
            {children}
        </div>
    );
}
