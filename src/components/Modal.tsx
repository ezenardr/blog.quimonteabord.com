'use client';
import React from 'react';
import Styles from './Modal.module.scss';

export default function Modal({
    children,
    title = 'Alerte',
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className={Styles.cookieCard}>
            <span className={Styles.title}>⚠ {title}</span>
            <p className={Styles.description}>{children}</p>
            <div className={Styles.actions}>
                <div></div>
                <button
                    onClick={() => location.reload()}
                    className={Styles.accept}
                >
                    Relancer la page
                </button>
            </div>
        </div>
    );
}
