import { useCallback, useEffect } from 'react';
import { checkInChildAPI, checkOutChildAPI, getChildrenAPI } from './utils/api';
import {
    checkInChildAction,
    checkOutChildAction,
    setChildrenAction,
} from './store/child/actions';
import { LoadingList } from './components/LoadingList/LoadingList';
import { useLazyLoadChildren } from './hooks/useLazyLoadChildren';
import { ChildItem } from './components/ChildItem/ChildItem';
import { Logo } from './components/Logo/Logo';
import styles from './App.module.scss';
import childItemStyles from './components/ChildItem/ChildItem.module.scss';

export const App = () => {
    const {
        store: { children, dispatch },
        displayChildren,
        loading,
        loadChildren,
    } = useLazyLoadChildren();

    useEffect(() => {
        const fetchChildren = async () => {
            const fetchedChildren = await getChildrenAPI();
            dispatch(setChildrenAction(fetchedChildren));
        };

        fetchChildren();
    }, [dispatch]);

    const onCheckInChild = useCallback(
        async (childId: string, pickupTime: Date) => {
            if (!pickupTime) {
                return;
            }

            try {
                await checkInChildAPI(childId, pickupTime);
                dispatch(checkInChildAction(childId, pickupTime));
            } catch (error) {
                console.error(error);
            }
        },
        [dispatch]
    );

    const onCheckOutChild = useCallback(
        async (childId: string) => {
            try {
                await checkOutChildAPI(childId);
                dispatch(checkOutChildAction(childId));
            } catch (error) {
                console.error(error);
            }
        },
        [dispatch]
    );

    return (
        <>
            <section className={styles.header}>
                <Logo />
                <h1 className={styles.title}>Check-in management</h1>
            </section>

            <section className={styles.children}>
                <LoadingList
                    loading={loading}
                    hasMore={displayChildren.length < children.length}
                    loadMore={loadChildren}
                    childClassName={childItemStyles.child}
                >
                    {displayChildren.map((child) => (
                        <ChildItem
                            key={child.id}
                            id={child.id}
                            name={child.name}
                            gender={child.gender}
                            checkedIn={child.checkedIn}
                            pickupTime={child.pickupTime}
                            onCheckIn={onCheckInChild}
                            onCheckOut={onCheckOutChild}
                        />
                    ))}
                </LoadingList>
            </section>
        </>
    );
};
