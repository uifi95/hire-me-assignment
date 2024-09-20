import { render, screen, fireEvent } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

describe('TimePicker', () => {
    it('renders the TimePicker component', () => {
        const { container } = render(
            <TimePicker name="test-time-picker" onChange={() => {}} />
        );
        const inputElement = container.querySelector(
            'input[name="test-time-picker"]'
        );
        expect(inputElement).toBeTruthy();
    });

    it('renders the label when provided', () => {
        render(
            <TimePicker
                name="test-time-picker"
                label="Select Time"
                onChange={() => {}}
            />
        );
        const labelElement = screen.getByText('Select Time');
        expect(labelElement).toBeTruthy();
    });

    it('calls onChange with the correct time', () => {
        const handleChange = vi.fn();
        const { container } = render(
            <TimePicker name="test-time-picker" onChange={handleChange} />
        );
        const inputElement = container.querySelector(
            'input[name="test-time-picker"]'
        ) as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: '12:30' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        const calledDate = handleChange.mock.calls[0][0];
        expect(calledDate.getHours()).toBe(12);
        expect(calledDate.getMinutes()).toBe(30);
    });

    it('disables the input when disabled prop is true', () => {
        const { container } = render(
            <TimePicker name="test-time-picker" disabled onChange={() => {}} />
        );
        const inputElement = container.querySelector(
            'input[name="test-time-picker"]'
        ) as HTMLInputElement;

        expect(inputElement).toHaveProperty('disabled');
    });

    it('sets the min and max attributes correctly', () => {
        const { container } = render(
            <TimePicker
                name="test-time-picker"
                min="09:00"
                max="18:00"
                onChange={() => {}}
            />
        );
        const inputElement = container.querySelector(
            'input[name="test-time-picker"]'
        ) as HTMLInputElement;

        expect(inputElement).toHaveProperty('min', '09:00');
        expect(inputElement).toHaveProperty('max', '18:00');
    });
});
