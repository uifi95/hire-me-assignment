import { useRef } from 'react';
import { Loader } from '../Loader/Loader';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import styles from './LoadingList.module.scss';

interface LoadingListProps {
    hasMore: boolean;
    loading?: boolean;
    children: React.ReactElement[];
    childClassName?: string;
    loadMore: () => void;
}

export const LoadingList = ({
    hasMore,
    loading = false,
    children,
    childClassName,
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
                ? children.map((child) => (
                      <li className={childClassName} key={child.key}>
                          {child}
                      </li>
                  ))
                : null}
            {hasMore && (
                <li>
                    <Loader ref={loaderRef} size="large" />
                </li>
            )}
        </ul>
    );
};
