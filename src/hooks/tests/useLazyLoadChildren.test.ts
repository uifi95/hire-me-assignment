import { renderHook, act } from '@testing-library/react';
import { useLazyLoadChildren } from '../useLazyLoadChildren';
import * as store from '../../store/child/store';
import { CHILD_GENDERS } from '../../constants/child';

describe('useLazyLoadChildren', () => {
    const mockDispatch = vi.fn();
    const mockChildren = Array.from({ length: 20 }, (_, i) => ({
        id: i.toString(),
        gender: CHILD_GENDERS.MALE,
        startDate: new Date(),
        name: {
            firstName: `first${i}`,
            lastName: `last${i}`,
            fullName: `first${i} last${i}`,
        },
        checkedIn: false,
    }));

    beforeEach(() => {
        const mock = vi.spyOn(store, 'useChildrenStore');
        mock.mockReturnValue([mockChildren, mockDispatch]);
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useLazyLoadChildren());

        expect(result.current.store.children).toEqual(mockChildren);
        expect(result.current.store.dispatch).toBe(mockDispatch);
        expect(result.current.displayChildren).toEqual(
            mockChildren.slice(0, 10)
        );
        expect(result.current.loading).toBe(false);
    });

    it('should load more children when loadChildren is called', async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useLazyLoadChildren());

        act(() => {
            result.current.loadChildren();
        });

        expect(result.current.loading).toBe(true);

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.displayChildren).toEqual(mockChildren);
    });
});
