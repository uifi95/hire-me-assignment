import { ForwardedRef, forwardRef } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
}

export const Loader = forwardRef(
    ({ size = 'medium' }: LoaderProps, ref: ForwardedRef<HTMLDivElement>) => (
        <div ref={ref} className={`${styles.loader} ${styles[size]}`} />
    )
);
