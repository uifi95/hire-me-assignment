import { useEffect } from 'react';
import { checkInChild, checkOutChild, getChildren } from './utils/api';
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
import childStyles from './components/ChildItem/ChildItem.module.scss';

export const App = () => {
    const {
        store: { children, dispatch },
        displayChildren,
        loading,
        loadChildren,
    } = useLazyLoadChildren();

    useEffect(() => {
        const fetchChildren = async () => {
            const fetchedChildren = await getChildren();
            dispatch(setChildrenAction(fetchedChildren));
        };

        fetchChildren();
    }, [dispatch]);

    const onCheckInChild = async (childId: string, pickupTime: Date) => {
        if (!pickupTime) {
            return;
        }

        try {
            await checkInChild(childId, pickupTime);
            dispatch(checkInChildAction(childId, pickupTime));
        } catch (error) {
            console.error(error);
        }
    };

    const onCheckOutChild = async (childId: string) => {
        try {
            await checkOutChild(childId);
            dispatch(checkOutChildAction(childId));
        } catch (error) {
            console.error(error);
        }
    };

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
                    childClassName={childStyles.child}
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
