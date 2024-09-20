import { RefObject, useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
    hasMore: boolean;
    loading: boolean;
    loadMore: () => void;
    scrollAreaRef: RefObject<HTMLElement>;
    loaderRef: RefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
    hasMore,
    loading,
    loadMore,
    scrollAreaRef,
    loaderRef,
}: UseInfiniteScrollParams) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const rootMargin = '100px 0px 0px 0px';

    useEffect(() => {
        if (!loaderRef?.current || !scrollAreaRef?.current) {
            return;
        }

        const loader = loaderRef.current as Element;

        if (!observer.current) {
            observer.current = initIntersectionObserver(
                loadMore,
                scrollAreaRef,
                rootMargin
            );
        }

        if (hasMore && !loading) {
            observer.current.observe(loader);
        }

        return () => {
            observer.current?.unobserve(loader);
        };
    }, [hasMore, loading, loadMore, loaderRef, scrollAreaRef]);
};

const initIntersectionObserver = (
    loadMore: () => void,
    scrollAreaRef: RefObject<HTMLElement>,
    rootMargin: string | undefined
): IntersectionObserver => {
    return new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            });
        },
        {
            root: scrollAreaRef.current,
            rootMargin,
        }
    );
};
