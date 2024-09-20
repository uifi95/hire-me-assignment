import { describe, it, expect, vi, Mock } from 'vitest';
import { getChildrenAPI, checkInChildAPI, checkOutChildAPI } from '../api';
import { ChildrenResponse } from '../../types/api';
import { mapChildRawToChild } from '../child';
import { CHILD_GENDERS } from '../../constants/child';

vi.mock('./child', () => ({
    mapChildRawToChild: vi.fn(),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API Utils', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('getChildrenAPI', () => {
        it('should fetch children and map them correctly', async () => {
            const mockChildrenResponse: ChildrenResponse = {
                children: [
                    {
                        childId: 'one',
                        name: {
                            firstName: 'John',
                            lastName: 'Doe',
                            fullName: 'John Doe',
                        },
                        gender: CHILD_GENDERS.FEMALE,
                        checkedIn: false,
                        startDate: '2023-01-01',
                    },
                ],
            };

            const mappedChildren =
                mockChildrenResponse.children.map(mapChildRawToChild);

            mockFetch.mockResolvedValueOnce({
                json: async () => mockChildrenResponse,
            });

            const result = await getChildrenAPI();

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/daycare/tablet/group'),
                undefined
            );

            expect(result).toEqual(mappedChildren);
        });
    });

    describe('checkInChildAPI', () => {
        it('should check in a child with the correct pickup time', async () => {
            const childId = '1';

            mockFetch.mockResolvedValueOnce({
                json: async () => ({}),
            });

            await checkInChildAPI(childId, new Date());

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v2/children/${childId}/checkins`),
                expect.objectContaining({
                    method: 'POST',
                })
            );
        });
    });

    describe('checkOutChildAPI', () => {
        it('should check out a child', async () => {
            const childId = '1';

            mockFetch.mockResolvedValueOnce({
                json: async () => ({}),
            });

            await checkOutChildAPI(childId);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v2/children/${childId}/checkout`),
                expect.objectContaining({
                    method: 'POST',
                })
            );
        });
    });
});
