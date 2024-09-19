import { useEffect } from 'react';
import './App.scss';
import { checkInChild, checkOutChild, getChildren } from './utils/api';
import {
    checkInChildAction,
    checkOutChildAction,
    setChildrenAction,
} from './store/child/actions';
import { LoadingList } from './components/LoadingList/LoadingList';
import { useLazyLoadChildren } from './hooks/useLazyLoadChildren';
import { ChildItem } from './components/ChildItem/ChildItem';

function App() {
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

    const onCheckInChild = async (childId: string) => {
        const pickupTime = new Date();
        pickupTime.setHours(16, 0, 0, 0);
        await checkInChild(childId, pickupTime);
        dispatch(checkInChildAction(childId, pickupTime));
    };

    const onCheckOutChild = async (childId: string) => {
        await checkOutChild(childId);
        dispatch(checkOutChildAction(childId));
    };

    return (
        <>
            <h1>Famly check-in management</h1>
            <LoadingList
                loading={loading}
                hasMore={displayChildren.length < children.length}
                loadMore={loadChildren}
                threshold={3}
            >
                {displayChildren.map((child) => (
                    <ChildItem
                        key={child.id}
                        id={child.id}
                        name={child.name}
                        checkedIn={child.checkedIn}
                        pickupTime={child.pickupTime}
                        onCheckIn={onCheckInChild}
                        onCheckOut={onCheckOutChild}
                    />
                ))}
            </LoadingList>
        </>
    );
}

export default App;
