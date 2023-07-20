import React from 'react';
import Styles from './LoaderWhite.module.scss';

export default function LoaderWhite() {
    return (
        <div className={Styles.loader}>
            <div
                className={[
                    Styles.justifyContentCenter,
                    Styles.jimuPrimaryLoading,
                ].join(' ')}
            ></div>
        </div>
    );
}
