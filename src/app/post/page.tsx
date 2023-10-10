import Navigation from '@/components/nav/Navigation';
import Style from './page.module.scss';
import Image from 'next/image';
import Test from '@/img/card-test.jpg';
export default function Page() {
    return (
        <>
            <Navigation />
            <main className={Style.main}>
                <h1>Lorem ipsum dolor</h1>
                <p className={Style.author}>
                    By Ixartz on April 24, 2022 - 5 min read
                </p>
                <Image src={Test} alt="Blog image" width={1050} height={540} />
                <p className={Style.article}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor reprehenderit possimus perspiciatis vero dolore! In
                    dicta explicabo voluptate fugit, deserunt quidem ut rem
                    dignissimos aperiam ex voluptates exercitationem quos
                    quaerat qui adipisci repellat perferendis beatae unde
                    dolorem. Ea, sunt sed repudiandae corrupti ut in non dolore
                    quasi officia aspernatur ab!
                </p>
            </main>
        </>
    );
}
