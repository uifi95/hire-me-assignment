import { useState } from 'react';
import { useChildrenStore } from '../store/child/store';

export const useLazyLoadChildren = () => {
    const [children, dispatch] = useChildrenStore();
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    const loadChildren = () => {
        setLoading(true);
        setTimeout(() => {
            setLimit((prevLimit) => prevLimit + 10);
            setLoading(false);
        }, 500);
    };

    return {
        store: { children, dispatch },
        displayChildren: children.slice(0, limit),
        loading,
        loadChildren,
    };
};
