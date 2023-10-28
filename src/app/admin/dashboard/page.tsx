import { FiEdit } from 'react-icons/fi';
import { LiaBuffer } from 'react-icons/lia';
import { BiSolidUser } from 'react-icons/bi';
import Style from './page.module.scss';
import DashboardNavigation from '@/components/dashboardNavigation/DashboardNavigation';
import UserBox from '@/components/userBox/UserBox';
import TitleBox from '@/components/pageTitleBox/TitleBox';
import StatsCard from '@/components/statsCard/StatsCard';
import VisitorGraph from '@/components/graphs/VisitorGraph';
import { Metadata } from 'next';

export const metadata: Metadata = {
    robots: {
        index: false,
        nocache: true,
    },
};
export default function Page() {
    return (
        <main className={Style.main}>
            <DashboardNavigation />
            <div className={Style.panel}>
                <UserBox />
                <TitleBox />
                <div className={Style.statsBox}>
                    <StatsCard title="Post" amount={10}>
                        <FiEdit className={Style.icon} />
                    </StatsCard>
                    <StatsCard title="Categories" amount={3}>
                        <LiaBuffer className={Style.icon} />
                    </StatsCard>
                    <StatsCard title="Users" amount={2}>
                        <BiSolidUser className={Style.icon} />
                    </StatsCard>
                </div>
                <div className={Style.analytics}>
                    <div className={Style.graphBox}>
                        <div className={Style.topBar}>
                            <div className={Style.titleBox}>
                                <p className={Style.title}>Visitor Growth</p>
                                <p className={Style.description}>
                                    Overall Information
                                </p>
                            </div>
                            <div className={Style.method}>
                                <p className={Style.active}>Monthly</p>
                                {/* <p>Yearly</p> */}
                            </div>
                        </div>
                        <VisitorGraph />
                    </div>
                    <div className={Style.latestPost}>
                        <div className={Style.topBar}>Lastest Post</div>
                        <ul className={Style.articlesList}>
                            <li className={Style.article}>
                                <p className={Style.title}>
                                    The Power of Dream
                                </p>
                                <p className={Style.date}>28 June 2021</p>
                            </li>
                            <li className={Style.article}>
                                <p className={Style.title}>
                                    Emotional Headling
                                </p>
                                <p className={Style.date}>22 June 2021</p>
                            </li>
                            <li className={Style.article}>
                                <p className={Style.title}>Work vs School</p>
                                <p className={Style.date}>21 June 2021</p>
                            </li>
                            <li className={Style.article}>
                                <p className={Style.title}>
                                    The Power of Dream
                                </p>
                                <p className={Style.date}>28 June 2021</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
