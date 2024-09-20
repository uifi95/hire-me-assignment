import { useState } from 'react';
import { fifteenMinutesLaterTimeString } from '../../../../utils/time';
import { Button } from '../../../Button/Button';
import { Loader } from '../../../Loader/Loader';
import { TimePicker } from '../../../TimePicker/TimePicker';
import styles from './ChildActions.module.scss';

interface ChildActionsProps {
    id: string;
    checkedIn: boolean;
    pickupTime?: Date;
    onCheckIn: (childId: string, pickupTime: Date) => void;
    onCheckOut: (childId: string) => void;
}

export const ChildActions = ({
    id,
    checkedIn,
    pickupTime,
    onCheckIn,
    onCheckOut,
}: ChildActionsProps) => {
    const [newPickupTime, setNewPickupTime] = useState<Date | undefined>();
    const [loading, setLoading] = useState(false);
    const minPickupTime = fifteenMinutesLaterTimeString();

    let timeMessage = (
        <>
            <strong>{minPickupTime}</strong>
            {' - '}
            <strong>18:00</strong>
        </>
    );

    if (pickupTime) {
        timeMessage = (
            <>
                Until{' '}
                <strong>{pickupTime?.toLocaleTimeString().slice(0, 5)}</strong>
            </>
        );
    }

    const handleTimerChange = (time: Date) => setNewPickupTime(time);

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (checkedIn) {
            await onCheckOut(id);
            setNewPickupTime(undefined);
            return setLoading(false);
        }
        if (newPickupTime) {
            await onCheckIn(id, newPickupTime);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={onFormSubmit} className={styles.actions}>
            {checkedIn ? (
                <span className={styles.pickupTime}>{timeMessage}</span>
            ) : (
                <TimePicker
                    label="Pickup time"
                    name="pickupTime"
                    min={minPickupTime}
                    max={'23:59'}
                    disabled={loading}
                    onChange={handleTimerChange}
                />
            )}
            <Button variant="primary" type="submit" disabled={loading}>
                {checkedIn ? 'Check out' : 'Check in'}
                {loading && <Loader size="small" color="light" />}
            </Button>
        </form>
    );
};
