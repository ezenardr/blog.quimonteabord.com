import Navigation from '@/components/Navigation';
import Styles from './dashboardLayout.module.scss';
import Sidebar from '@/components/Sidebar';
export const metadata = {
    title: 'Admin panel | Qui monte à bord',
    description:
        'Admin dashboard of Qui monte à bord handle by Web Waze Solution',
};
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className={Styles.dashboardContainer}>
            <div className={Styles.dashboard}>
                <Navigation color="#d8f3dc" />
                <div className={Styles.flexContainer}>
                    <Sidebar />
                    {children}
                </div>
            </div>
        </section>
    );
}
