import { ForwardedRef, forwardRef } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: 'dark' | 'light';
}

export const Loader = forwardRef(
    (
        { size = 'medium', color = 'dark' }: LoaderProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => (
        <div
            ref={ref}
            className={`${styles.loader} ${styles[size]} ${styles[color]}`}
        />
    )
);
