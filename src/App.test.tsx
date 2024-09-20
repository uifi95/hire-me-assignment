import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
    it('renders the App component', async () => {
        render(<App />);
        const title = await screen.findByText('Famly check-in management');
        expect(title).toBeTruthy();
    });
});
