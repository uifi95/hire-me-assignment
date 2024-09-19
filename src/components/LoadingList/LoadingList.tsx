import { useRef } from 'react';
import { Loader } from '../Loader/Loader';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import styles from './LoadingList.module.scss';

interface LoadingListProps {
    hasMore: boolean;
    loading?: boolean;
    children: React.ReactElement[];
    threshold?: number;
    loadMore: () => void;
}

export const LoadingList = ({
    hasMore,
    loading = false,
    children,
    loadMore,
}: LoadingListProps) => {
    const scrollAreaRef = useRef(null);
    const loaderRef = useRef(null);

    useInfiniteScroll({
        hasMore,
        loading,
        loadMore,
        scrollAreaRef,
        loaderRef,
    });

    return (
        <ul ref={scrollAreaRef} className={styles.infiniteScroll}>
            {children
                ? children.map((child) => <li key={child.key}>{child}</li>)
                : null}
            {hasMore && <Loader ref={loaderRef} size="large" />}
        </ul>
    );
};
