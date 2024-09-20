import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LoadingList } from '../LoadingList';
import loaderStyles from '../../Loader/Loader.module.scss';

describe('LoadingList', () => {
    const loadMoreMock = vi.fn();

    const defaultProps = {
        hasMore: true,
        loading: false,
        children: Array.from({ length: 3 }, (_, i) => (
            <div key={i}>Item {i}</div>
        )),
        loadMore: loadMoreMock,
    };

    beforeEach(() => {
        // IntersectionObserver isn't available in test environment
        const mockIntersectionObserver = vi.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null,
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    it('renders children correctly', () => {
        render(<LoadingList {...defaultProps} />);
        expect(screen.getByText('Item 1')).toBeTruthy();
        expect(screen.getByText('Item 2')).toBeTruthy();
    });

    it('renders loader when hasMore is true', () => {
        const { container } = render(<LoadingList {...defaultProps} />);
        expect(container.querySelector(`.${loaderStyles.loader}`)).toBeTruthy();
    });

    it('does not render loader when hasMore is false', () => {
        const { container } = render(
            <LoadingList {...defaultProps} hasMore={false} />
        );
        expect(container.querySelector(`.${loaderStyles.loader}`)).toBeFalsy();
    });
});
