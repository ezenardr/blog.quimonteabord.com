import DashboardNavigation from '@/components/dashboardNavigation/DashboardNavigation';
import Style from './post.module.scss';
import UserBox from '@/components/userBox/UserBox';
import PostModal from '@/components/postModal/PostModal';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    robots: {
        index: false,
        nocache: true,
    },
};
type Props = {
    searchParams: Record<string, string> | null | undefined;
};

export default function Page({ searchParams }: Props) {
    return (
        <main className={Style.main}>
            <DashboardNavigation />
            <div className={Style.panel}>
                <UserBox />
                <Link
                    href="/admin/posts?newPost=true"
                    className={Style.postBtn}
                >
                    New Post
                </Link>

                {searchParams?.newPost === 'true' && <PostModal />}
            </div>
        </main>
    );
}
