import Navigation from '@/components/Navigation';
import React from 'react';
import Styles from './blog.module.scss';
import Articles from './Articles';

export default function BlogPage() {
    return (
        <>
            <header className={Styles.header}>
                <Navigation />
                <div className={Styles.heroBox}>
                    <h3>writing Blog</h3>
                    <h1>
                        WE&apos;VE GOT <span>exciting insight</span> FOR YOU
                    </h1>
                </div>
            </header>
            <main className={Styles.main}>
                <Articles />
            </main>
        </>
    );
}
