import { describe, it, expect } from 'vitest';
import { childrenReducer } from '../reducer';
import { ChildrenState, ChildrenReducerAction } from '../types';
import { CHILD_GENDERS } from '../../../constants/child';

describe('childrenReducer', () => {
    it('should set children', () => {
        const initialState: ChildrenState = { children: [] };
        const newChildren = [
            {
                id: 'one',
                gender: CHILD_GENDERS.MALE,
                startDate: new Date(),
                name: {
                    firstName: 'John',
                    lastName: 'Doe',
                    fullName: 'John Doe',
                },
                checkedIn: false,
            },
        ];
        const action: ChildrenReducerAction = {
            type: 'SET_CHILDREN',
            payload: newChildren,
        };
        const newState = childrenReducer(initialState, action);
        expect(newState).toEqual({
            children: newChildren,
        });
    });

    it('should check in a child', () => {
        const initialState: ChildrenState = {
            children: [
                {
                    id: 'one',
                    gender: CHILD_GENDERS.MALE,
                    startDate: new Date(),
                    name: {
                        firstName: 'John',
                        lastName: 'Doe',
                        fullName: 'John Doe',
                    },
                    checkedIn: false,
                },
            ],
        };

        const newPickupTime = new Date();
        const action: ChildrenReducerAction = {
            type: 'CHECK_IN_CHILD',
            payload: { id: 'one', pickupTime: newPickupTime },
        };
        const newState = childrenReducer(initialState, action);
        expect(newState).toEqual({
            children: [
                {
                    ...initialState.children[0],
                    checkedIn: true,
                    pickupTime: newPickupTime,
                },
            ],
        });
    });

    it('should check out a child', () => {
        const initialState: ChildrenState = {
            children: [
                {
                    id: 'one',
                    gender: CHILD_GENDERS.MALE,
                    pickupTime: new Date(),
                    startDate: new Date(),
                    name: {
                        firstName: 'John',
                        lastName: 'Doe',
                        fullName: 'John Doe',
                    },
                    checkedIn: false,
                },
            ],
        };
        const action: ChildrenReducerAction = {
            type: 'CHECK_OUT_CHILD',
            payload: { id: 'one' },
        };
        const newState = childrenReducer(initialState, action);
        expect(newState).toEqual({
            children: [
                {
                    ...initialState.children[0],
                    checkedIn: false,
                    pickupTime: undefined,
                },
            ],
        });
    });
});
