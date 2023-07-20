import React from 'react';
import Styles from './Footer.module.scss';

const getDate = new Date();
export default function Footer() {
    return (
        <footer className={Styles.footer}>
            &copy; {getDate.getFullYear()} Bien Le Bonjour. Tous droits
            réservés.
        </footer>
    );
}
