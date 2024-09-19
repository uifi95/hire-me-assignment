import { ChildName } from '../../types/api';
import { Button } from '../Button/Button';
import { House } from '../Icons/House';
import { School } from '../Icons/School';

interface ChildItemProps {
    id: string;
    name: ChildName;
    checkedIn: boolean;
    pickupTime?: Date;
    onCheckIn: (childId: string) => void;
    onCheckOut: (childId: string) => void;
}

export const ChildItem = ({
    id,
    name,
    checkedIn,
    pickupTime,
    onCheckIn,
    onCheckOut,
}: ChildItemProps) => (
    <div key={id}>
        <p>{name.fullName}</p>
        <p>{checkedIn ? 'Checked in' : 'Checked out'}</p>
        {pickupTime && <p>Pickup time: {pickupTime.toLocaleTimeString()}</p>}
        <div className="buttons">
            {checkedIn ? (
                <Button onClick={() => onCheckOut(id)}>
                    <House size="small" color="white" />
                    <span>Check out {name.firstName}</span>
                </Button>
            ) : (
                <Button variant="primary" onClick={() => onCheckIn(id)}>
                    <School size="small" />
                    <span>Check in {name.firstName}</span>
                </Button>
            )}
        </div>
    </div>
);
