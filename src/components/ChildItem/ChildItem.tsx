import { useState } from 'react';
import { ChildGender, ChildName } from '../../types/api';
import { Button } from '../Button/Button';
import { TimePicker } from '../TimePicker/TimePicker';
import { nowTimeString } from '../../utils/time';
import styles from './ChildItem.module.scss';

interface ChildItemProps {
    id: string;
    name: ChildName;
    checkedIn: boolean;
    gender: ChildGender;
    pickupTime?: Date;
    onCheckIn: (childId: string, pickupTime?: Date) => void;
    onCheckOut: (childId: string) => void;
}

export const ChildItem = ({
    id,
    name,
    checkedIn,
    pickupTime,
    onCheckIn,
    onCheckOut,
}: ChildItemProps) => {
    const [newPickupTime, setNewPickupTime] = useState<Date | undefined>();
    const handleChange = (time: Date) => setNewPickupTime(time);
    const minPickupTime = nowTimeString();

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (checkedIn) {
            return onCheckOut(id);
        }

        onCheckIn(id, newPickupTime);
    };

    return (
        <>
            <div className={styles.info}>
                <h2 className={styles.name}>{name.fullName}</h2>
                <span>{checkedIn ? 'Checked in' : 'Checked out'}</span>
            </div>
            <form onSubmit={onFormSubmit} className={styles.actions}>
                {checkedIn ? (
                    <>
                        <span className={styles.pickupTime}>
                            {pickupTime ? (
                                <>
                                    Until{' '}
                                    <strong>
                                        {pickupTime
                                            .toLocaleTimeString()
                                            .slice(0, 5)}
                                    </strong>
                                </>
                            ) : (
                                <>
                                    <strong>{minPickupTime}</strong>
                                    {' - '}
                                    <strong>18:00</strong>
                                </>
                            )}
                        </span>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={() => onCheckOut(id)}
                        >
                            Check out
                        </Button>
                    </>
                ) : (
                    <>
                        <TimePicker
                            label="Pickup time"
                            name="pickupTime"
                            min={minPickupTime}
                            max={'23:59'}
                            onChange={handleChange}
                        />
                        <Button variant="primary" type="submit">
                            Check in
                        </Button>
                    </>
                )}
            </form>
        </>
    );
};
