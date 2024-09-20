import { ChangeEvent } from 'react';
import styles from './TimePicker.module.scss';

interface TimePickerProps {
    name: string;
    label?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    onChange: (time: Date) => void;
}

export const TimePicker = ({
    name,
    label,
    min,
    max,
    disabled = false,
    onChange,
}: TimePickerProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const time = new Date();
        const [hours, minutes] = event.target.value.split(':');
        time.setHours(Number(hours), Number(minutes), 0, 0);
        onChange(time);
    };

    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label} htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                className={styles.picker}
                name={name}
                min={min}
                max={max}
                disabled={disabled}
                type="time"
                onChange={handleChange}
            />
        </div>
    );
};
