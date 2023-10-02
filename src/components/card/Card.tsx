import Image from 'next/image';
import Style from './Card.module.scss';
import imgTest from '@/img/card-test.jpg';

export default function Card() {
    return (
        <div className={Style.card}>
            <Image src={imgTest} alt="test" />
            <div className={Style.textBox}>
                <h2>Lorem ipsum dolor sit</h2>
                <p className={Style.tag}>Date, 5 min read</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, aliquam!
                </p>
            </div>
        </div>
    );
}
